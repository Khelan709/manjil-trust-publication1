/** Operational error with an HTTP status; handled by middleware/errorHandler.js */
export default class AppError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}
