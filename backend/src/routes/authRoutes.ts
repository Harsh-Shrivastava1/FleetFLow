import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";
import { getMe, loginUser, registerUser } from "../services/userService";

export const authRoutes = Router();

authRoutes.post(
  "/register",
  asyncHandler(async (req, res) => {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const fullName = (body.fullName ?? body.full_name) as string;
    const role = body.role as "admin" | "manager" | "dispatcher" | "safety_officer";
    const email = body.email as string;
    const password = body.password as string;

    const result = await registerUser({ fullName, role, email, password });
    res.status(201).json(result);
  }),
);

authRoutes.post(
  "/login",
  asyncHandler(async (req, res) => {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const email = body.email as string;
    const password = body.password as string;
    const role = body.role as "admin" | "manager" | "dispatcher" | "safety_officer";

    const result = await loginUser({ email, password, role });
    res.json(result);
  }),
);

authRoutes.get(
  "/me",
  requireAuth,
  asyncHandler(async (_req, res) => {
    const authUser = (res.locals as { user?: { id: string } }).user;
    if (!authUser) throw Object.assign(new Error("Unauthorized"), { status: 401 });
    const user = await getMe(authUser.id);
    res.json({ user });
  }),
);

