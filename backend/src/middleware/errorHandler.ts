import type { ErrorRequestHandler } from "express";

type HttpishError = {
  status?: number;
  message?: string;
};

export const errorHandler: ErrorRequestHandler = (err: unknown, _req, res, _next) => {
  const e = err as HttpishError;
  const status = typeof e.status === "number" ? e.status : 500;
  const message =
    typeof e.message === "string" && e.message.length > 0
      ? e.message
      : "Internal Server Error";

  if (status >= 500) {
    console.error("❌ unhandled error", err);
  }

  res.status(status).json({ error: message });
};

