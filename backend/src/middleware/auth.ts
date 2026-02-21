import type { RequestHandler } from "express";
import { verifyAccessToken } from "../auth/jwt";

export type AuthUser = {
  id: string;
  role: "admin" | "manager" | "dispatcher" | "safety_officer";
};

export const requireAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.header("authorization") ?? req.header("Authorization");
  const token =
    authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : null;

  if (!token) {
    return next(Object.assign(new Error("Missing Authorization header"), { status: 401 }));
  }

  try {
    const payload = verifyAccessToken(token);
    (res.locals as { user?: AuthUser }).user = { id: payload.sub, role: payload.role };
    return next();
  } catch (err) {
    return next(Object.assign(new Error("Invalid or expired token"), { status: 401, cause: err }));
  }
};

