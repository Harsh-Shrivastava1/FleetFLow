import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use((_req, _res, next) => next(Object.assign(new Error("Not found"), { status: 404 })));
app.use(errorHandler);
