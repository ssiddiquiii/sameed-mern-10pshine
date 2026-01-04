import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pino from "pino-http"; // Requirement: Pino Logger

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(pino()); // Logs every request automatically

export { app };
