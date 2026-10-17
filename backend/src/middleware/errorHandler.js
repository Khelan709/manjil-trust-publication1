import multer from 'multer';
import env from '../config/env.js';
import AppError from '../utils/AppError.js';

export const notFound = (req, res) => res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  let status = err.status || 500;
  let message = err.message || 'Internal server error';

  if (err instanceof multer.MulterError) {
    status = 400;
    message = err.code === 'LIMIT_FILE_SIZE' ? 'Attachment exceeds the 15MB limit.' : 'Attachment upload failed.';
  } else if (err.code === 11000) {
    status = 409;
    message = 'This record already exists.';
  } else if (err.name === 'ValidationError') {
    status = 400;
  }

  // Expected (operational) errors such as 503-while-DB-is-down are not worth a stack trace.
  if (status >= 500 && !(err instanceof AppError)) console.error('[error]', err);
  res.status(status).json({
    message: status >= 500 && env.nodeEnv === 'production' ? 'Internal server error' : message,
    ...(err.details ? { errors: err.details } : {}),
  });
};
