import { AppError } from "../errors/AppError";
import type { IResponse } from "../types";

export function errorHandler(err: any): IResponse {
  if (err instanceof AppError) {
    return {
      statusCode: err.statusCode,
      body: {
        message: err.message,
        code: err.errorCode,
        status: "error",
      },
    };
  } else {
    return {
      statusCode: 500,
      body: {
        status: "error",
        message: "Internal Server Error",
        code: "INTERNAL_SERVER_ERROR",
      },
    };
  }
}
