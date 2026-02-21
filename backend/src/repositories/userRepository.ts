import { db } from "../db/database";

export type UserRole = "admin" | "manager" | "dispatcher" | "safety_officer";

export type UserRow = {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type UserWithPasswordRow = UserRow & { password_hash: string };

function mapUser(row: UserRow): UserRow {
  return row;
}

export async function createUser(input: {
  fullName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}): Promise<UserRow> {
  const res = await db.query<UserRow>(
    `
INSERT INTO users (full_name, email, password_hash, role)
VALUES ($1, $2, $3, $4)
RETURNING id, full_name, email, role, is_deleted, created_at, updated_at, deleted_at
    `.trim(),
    [input.fullName, input.email, input.passwordHash, input.role],
  );
  const row = res.rows[0];
  if (!row) throw new Error("Failed to create user");
  return mapUser(row);
}

export async function findUserByEmail(email: string): Promise<UserWithPasswordRow | null> {
  const res = await db.query<UserWithPasswordRow>(
    `
SELECT id, full_name, email, password_hash, role, is_deleted, created_at, updated_at, deleted_at
FROM users
WHERE email = $1
LIMIT 1
    `.trim(),
    [email],
  );
  return res.rows[0] ?? null;
}

export async function findUserById(id: string): Promise<UserRow | null> {
  const res = await db.query<UserRow>(
    `
SELECT id, full_name, email, role, is_deleted, created_at, updated_at, deleted_at
FROM users
WHERE id = $1
LIMIT 1
    `.trim(),
    [id],
  );
  return res.rows[0] ?? null;
}

export async function listUsers(includeDeleted = false): Promise<UserRow[]> {
  const res = await db.query<UserRow>(
    `
SELECT id, full_name, email, role, is_deleted, created_at, updated_at, deleted_at
FROM users
WHERE ($1::boolean = true) OR (is_deleted = false)
ORDER BY created_at DESC
    `.trim(),
    [includeDeleted],
  );
  return res.rows;
}

export async function updateUser(
  id: string,
  patch: Partial<{
    full_name: string;
    email: string;
    password_hash: string;
    role: UserRole;
  }>,
): Promise<UserRow | null> {
  const sets: string[] = [];
  const values: unknown[] = [];

  const add = (col: string, val: unknown) => {
    values.push(val);
    sets.push(`${col} = $${values.length}`);
  };

  if (typeof patch.full_name === "string") add("full_name", patch.full_name);
  if (typeof patch.email === "string") add("email", patch.email);
  if (typeof patch.password_hash === "string") add("password_hash", patch.password_hash);
  if (
    patch.role === "admin" ||
    patch.role === "manager" ||
    patch.role === "dispatcher" ||
    patch.role === "safety_officer"
  ) {
    add("role", patch.role);
  }

  if (sets.length === 0) return findUserById(id);

  values.push(id);
  const res = await db.query<UserRow>(
    `
UPDATE users
SET ${sets.join(", ")}
WHERE id = $${values.length}
RETURNING id, full_name, email, role, is_deleted, created_at, updated_at, deleted_at
    `.trim(),
    values,
  );
  return res.rows[0] ?? null;
}

export async function softDeleteUser(id: string): Promise<UserRow | null> {
  const res = await db.query<UserRow>(
    `
UPDATE users
SET is_deleted = true,
    deleted_at = now()
WHERE id = $1
RETURNING id, full_name, email, role, is_deleted, created_at, updated_at, deleted_at
    `.trim(),
    [id],
  );
  return res.rows[0] ?? null;
}

export async function restoreUser(id: string): Promise<UserRow | null> {
  const res = await db.query<UserRow>(
    `
UPDATE users
SET is_deleted = false,
    deleted_at = NULL
WHERE id = $1
RETURNING id, full_name, email, role, is_deleted, created_at, updated_at, deleted_at
    `.trim(),
    [id],
  );
  return res.rows[0] ?? null;
}

