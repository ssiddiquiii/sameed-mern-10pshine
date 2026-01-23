import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  // 1. Log the error details (server side only)
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
  });

  // 2. Determine status code (default to 500 if unknown)
  const statusCode = err.statusCode || 500;

  // 3. Send response to client (Hide stack trace in production)
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { errorHandler };
