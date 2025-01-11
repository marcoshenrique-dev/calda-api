export enum ErrorCode {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  SYSTEM_ERROR = "SYSTEM_ERROR",
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  CONFLICT = "CONFLICT",
}
export class AppError extends Error {
  public statusCode: number;
  public errorCode: ErrorCode;

  constructor(message: any, statusCode: number, errorCode: ErrorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: any, errorCode = ErrorCode.VALIDATION_ERROR) {
    super(message, 400, errorCode);
  }
}

export class SystemError extends AppError {
  constructor(message: any, errorCode = ErrorCode.SYSTEM_ERROR) {
    super(message, 500, errorCode);
  }
}

export class NotFoundError extends AppError {
  constructor(message: any, errorCode = ErrorCode.NOT_FOUND) {
    super(message, 404, errorCode);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: any, errorCode = ErrorCode.UNAUTHORIZED) {
    super(message, 401, errorCode);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: any, errorCode = ErrorCode.FORBIDDEN) {
    super(message, 403, errorCode);
  }
}

export class ConflictError extends AppError {
  constructor(message: any, errorCode = ErrorCode.CONFLICT) {
    super(message, 409, errorCode);
  }
}
