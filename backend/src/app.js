import express from "express";
import cors from "cors";
import { pinoHttp } from "pino-http"; // Import the HTTP logger
import logger from "./utils/logger.js"; // Import our custom logger
import { errorHandler } from "./middlewares/error.middleware.js"; // Import error handler

const app = express();

// 1. CORS Configuration
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// 2. Attach Logger Middleware (MUST be near the top)
// This logs every request: "GET /api/v1/users/register 200 OK"
app.use(
  pinoHttp({
    logger,
    customLogLevel: function (req, res, err) {
      if (res.statusCode >= 400 && res.statusCode < 500) return "warn";
      if (res.statusCode >= 500 || err) return "error";
      return "info";
    },
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// 3. Import Routes
import userRouter from "./routes/user.route.js";

// 4. Route Declaration
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/notes", noteRouter);

// 5. Global Error Handler (MUST be the LAST middleware)
app.use(errorHandler);

export { app };