import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export type AccessTokenPayload = {
  sub: string;
  role: "admin" | "manager" | "dispatcher" | "safety_officer";
};

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpiresIn as SignOptions["expiresIn"],
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const decoded = jwt.verify(token, env.jwt.accessSecret);
  if (typeof decoded !== "object" || decoded == null) {
    throw Object.assign(new Error("Invalid token"), { status: 401 });
  }

  const sub = (decoded as { sub?: unknown }).sub;
  const role = (decoded as { role?: unknown }).role;
  if (typeof sub !== "string") {
    throw Object.assign(new Error("Invalid token subject"), { status: 401 });
  }
  if (role !== "admin" && role !== "manager" && role !== "dispatcher" && role !== "safety_officer") {
    throw Object.assign(new Error("Invalid token role"), { status: 401 });
  }

  return { sub, role };
}

