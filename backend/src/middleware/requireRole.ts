import type { RequestHandler } from "express";

export function requireRole(
  roles: Array<"admin" | "manager" | "dispatcher" | "safety_officer">,
): RequestHandler {
  return (_req, res, next) => {
    const user = (res.locals as { user?: { role: "admin" | "manager" | "dispatcher" | "safety_officer" } }).user;
    if (!user) {
      return next(Object.assign(new Error("Unauthorized"), { status: 401 }));
    }
    if (!roles.includes(user.role)) {
      return next(Object.assign(new Error("Forbidden"), { status: 403 }));
    }
    return next();
  };
}

