import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/requireRole";
import { findUserById, type UserRole } from "../repositories/userRepository";
import {
  createUserAsAdmin,
  deleteUserService,
  listUsersService,
  restoreUserService,
  updateUserAsAdminService,
  updateUserAsSelfService,
} from "../services/userService";
import { asyncHandler } from "../utils/asyncHandler";

export const userRoutes = Router();

userRoutes.use(requireAuth);

userRoutes.get(
  "/",
  requireRole(["admin", "manager"]),
  asyncHandler(async (req, res) => {
    const authUser = (res.locals as { user?: { role: UserRole } }).user;
    if (!authUser) throw Object.assign(new Error("Unauthorized"), { status: 401 });

    const q = req.query as Record<string, unknown>;
    const includeDeletedRaw = q.includeDeleted;
    const includeDeleted =
      includeDeletedRaw === "true" || includeDeletedRaw === "1" || includeDeletedRaw === true;

    const users = await listUsersService({
      includeDeleted: authUser.role === "admin" ? includeDeleted : false,
    });
    res.json({ users });
  }),
);

userRoutes.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const authUser = (res.locals as { user?: { id: string; role: UserRole } }).user;
    if (!authUser) throw Object.assign(new Error("Unauthorized"), { status: 401 });

    const id = req.params.id;
    if (typeof id !== "string" || id.length === 0) {
      throw Object.assign(new Error("Invalid user id"), { status: 400 });
    }
    const isSelf = authUser.id === id;
    const canReadAny = authUser.role === "admin" || authUser.role === "manager";

    if (!isSelf && !canReadAny) {
      throw Object.assign(new Error("Forbidden"), { status: 403 });
    }

    const user = await findUserById(id);
    if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
    if (user.is_deleted && !canReadAny) throw Object.assign(new Error("User not found"), { status: 404 });

    res.json({ user });
  }),
);

userRoutes.post(
  "/",
  requireRole(["admin"]),
  asyncHandler(async (req, res) => {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const fullName = (body.fullName ?? body.full_name) as string;
    const email = body.email as string;
    const password = body.password as string;
    const role = (body.role ?? "dispatcher") as UserRole;

    const user = await createUserAsAdmin({ fullName, email, password, role });
    res.status(201).json({ user });
  }),
);

userRoutes.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const authUser = (res.locals as { user?: { id: string; role: UserRole } }).user;
    if (!authUser) throw Object.assign(new Error("Unauthorized"), { status: 401 });

    const id = req.params.id;
    if (typeof id !== "string" || id.length === 0) {
      throw Object.assign(new Error("Invalid user id"), { status: 400 });
    }
    const body = (req.body ?? {}) as Record<string, unknown>;

    const fullName = (body.fullName ?? body.full_name) as string | undefined;
    const email = body.email as string | undefined;
    const password = body.password as string | undefined;
    const role = body.role as UserRole | undefined;

    const isSelf = authUser.id === id;
    const isAdmin = authUser.role === "admin";

    if (!isSelf && !isAdmin) {
      throw Object.assign(new Error("Forbidden"), { status: 403 });
    }

    const user = isAdmin
      ? await updateUserAsAdminService(id, { fullName, email, password, role })
      : await updateUserAsSelfService(id, { fullName, email, password });

    res.json({ user });
  }),
);

userRoutes.delete(
  "/:id",
  requireRole(["admin"]),
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (typeof id !== "string" || id.length === 0) {
      throw Object.assign(new Error("Invalid user id"), { status: 400 });
    }
    const user = await deleteUserService(id);
    res.json({ user });
  }),
);

userRoutes.post(
  "/:id/restore",
  requireRole(["admin"]),
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (typeof id !== "string" || id.length === 0) {
      throw Object.assign(new Error("Invalid user id"), { status: 400 });
    }
    const user = await restoreUserService(id);
    res.json({ user });
  }),
);

