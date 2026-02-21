import bcrypt from "bcrypt";
import { signAccessToken } from "../auth/jwt";
import {
  createUser,
  findUserByEmail,
  findUserById,
  listUsers,
  restoreUser,
  softDeleteUser,
  updateUser,
  type UserRole,
  type UserRow,
  type UserWithPasswordRow,
} from "../repositories/userRepository";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  // Not perfect, but good enough for API validation.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isUserRole(role: unknown): role is UserRole {
  return role === "admin" || role === "manager" || role === "dispatcher" || role === "safety_officer";
}

function toUserRow(withPw: UserWithPasswordRow): UserRow {
  // Strip password_hash
  const { password_hash: _pw, ...user } = withPw;
  return user;
}

function uniqueViolation(err: unknown): boolean {
  const code = (err as { code?: unknown }).code;
  return code === "23505";
}

export type AuthResult = { user: UserRow; accessToken: string };

export async function registerUser(input: {
  fullName: string;
  role: UserRole;
  email: string;
  password: string;
}): Promise<AuthResult> {
  const fullName = input.fullName?.trim();
  const role = input.role;
  const email = normalizeEmail(input.email ?? "");
  const password = input.password ?? "";

  if (!fullName) throw Object.assign(new Error("fullName is required"), { status: 400 });
  if (!isUserRole(role)) throw Object.assign(new Error("role is invalid"), { status: 400 });
  if (!email) throw Object.assign(new Error("email is required"), { status: 400 });
  if (!isValidEmail(email)) throw Object.assign(new Error("email is invalid"), { status: 400 });
  if (password.length < 8) throw Object.assign(new Error("password must be at least 8 characters"), { status: 400 });

  const existing = await findUserByEmail(email);
  if (existing && !existing.is_deleted) {
    throw Object.assign(new Error("Email is already registered"), { status: 409 });
  }
  if (existing && existing.is_deleted) {
    throw Object.assign(new Error("Email is already registered"), { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  try {
    const user = await createUser({
      fullName,
      email,
      passwordHash,
      role,
    });
    const accessToken = signAccessToken({ sub: user.id, role: user.role });
    return { user, accessToken };
  } catch (err) {
    if (uniqueViolation(err)) {
      throw Object.assign(new Error("Email is already registered"), { status: 409, cause: err });
    }
    throw err;
  }
}

export async function loginUser(input: { email: string; password: string; role: UserRole }): Promise<AuthResult> {
  const email = normalizeEmail(input.email ?? "");
  const password = input.password ?? "";
  const role = input.role;

  if (!email) throw Object.assign(new Error("email is required"), { status: 400 });
  if (!password) throw Object.assign(new Error("password is required"), { status: 400 });
  if (!isUserRole(role)) throw Object.assign(new Error("role is invalid"), { status: 400 });

  const found = await findUserByEmail(email);
  if (!found || found.is_deleted) {
    throw Object.assign(new Error("Invalid email or password"), { status: 401 });
  }

  const ok = await bcrypt.compare(password, found.password_hash);
  if (!ok) throw Object.assign(new Error("Invalid email or password"), { status: 401 });
  if (found.role !== role) throw Object.assign(new Error("Invalid email or password"), { status: 401 });

  const user = toUserRow(found);
  const accessToken = signAccessToken({ sub: user.id, role: user.role });
  return { user, accessToken };
}

export async function getMe(userId: string): Promise<UserRow> {
  const user = await findUserById(userId);
  if (!user || user.is_deleted) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  return user;
}

export async function listUsersService(opts?: { includeDeleted?: boolean }): Promise<UserRow[]> {
  return listUsers(opts?.includeDeleted ?? false);
}

export async function createUserAsAdmin(input: {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}): Promise<UserRow> {
  const fullName = input.fullName?.trim();
  const email = normalizeEmail(input.email ?? "");
  const password = input.password ?? "";

  if (!fullName) throw Object.assign(new Error("fullName is required"), { status: 400 });
  if (!email) throw Object.assign(new Error("email is required"), { status: 400 });
  if (!isValidEmail(email)) throw Object.assign(new Error("email is invalid"), { status: 400 });
  if (password.length < 8) throw Object.assign(new Error("password must be at least 8 characters"), { status: 400 });
  if (!isUserRole(input.role)) throw Object.assign(new Error("role is invalid"), { status: 400 });

  const passwordHash = await bcrypt.hash(password, 12);
  try {
    return await createUser({ fullName, email, passwordHash, role: input.role });
  } catch (err) {
    if (uniqueViolation(err)) {
      throw Object.assign(new Error("Email is already registered"), { status: 409, cause: err });
    }
    throw err;
  }
}

export async function updateUserAsAdminService(
  id: string,
  patch: Partial<{ fullName: string; email: string; password: string; role: UserRole }>,
): Promise<UserRow> {
  const dbPatch: Partial<{
    full_name: string;
    email: string;
    password_hash: string;
    role: UserRole;
  }> = {};

  if (typeof patch.fullName === "string") dbPatch.full_name = patch.fullName.trim();
  if (typeof patch.email === "string") {
    const email = normalizeEmail(patch.email);
    if (!isValidEmail(email)) throw Object.assign(new Error("email is invalid"), { status: 400 });
    dbPatch.email = email;
  }
  if (typeof patch.password === "string") {
    if (patch.password.length < 8) {
      throw Object.assign(new Error("password must be at least 8 characters"), { status: 400 });
    }
    dbPatch.password_hash = await bcrypt.hash(patch.password, 12);
  }
  if (patch.role != null) {
    if (!isUserRole(patch.role)) throw Object.assign(new Error("role is invalid"), { status: 400 });
    dbPatch.role = patch.role;
  }

  try {
    const updated = await updateUser(id, dbPatch);
    if (!updated) throw Object.assign(new Error("User not found"), { status: 404 });
    return updated;
  } catch (err) {
    if (uniqueViolation(err)) {
      throw Object.assign(new Error("Email is already registered"), { status: 409, cause: err });
    }
    throw err;
  }
}

export async function updateUserAsSelfService(
  id: string,
  patch: Partial<{ fullName: string; email: string; password: string }>,
): Promise<UserRow> {
  const dbPatch: Partial<{ full_name: string; email: string; password_hash: string }> = {};

  if (typeof patch.fullName === "string") dbPatch.full_name = patch.fullName.trim();
  if (typeof patch.email === "string") {
    const email = normalizeEmail(patch.email);
    if (!isValidEmail(email)) throw Object.assign(new Error("email is invalid"), { status: 400 });
    dbPatch.email = email;
  }
  if (typeof patch.password === "string") {
    if (patch.password.length < 8) {
      throw Object.assign(new Error("password must be at least 8 characters"), { status: 400 });
    }
    dbPatch.password_hash = await bcrypt.hash(patch.password, 12);
  }

  try {
    const updated = await updateUser(id, dbPatch);
    if (!updated) throw Object.assign(new Error("User not found"), { status: 404 });
    return updated;
  } catch (err) {
    if (uniqueViolation(err)) {
      throw Object.assign(new Error("Email is already registered"), { status: 409, cause: err });
    }
    throw err;
  }
}

export async function deleteUserService(id: string): Promise<UserRow> {
  const deleted = await softDeleteUser(id);
  if (!deleted) throw Object.assign(new Error("User not found"), { status: 404 });
  return deleted;
}

export async function restoreUserService(id: string): Promise<UserRow> {
  const restored = await restoreUser(id);
  if (!restored) throw Object.assign(new Error("User not found"), { status: 404 });
  return restored;
}

