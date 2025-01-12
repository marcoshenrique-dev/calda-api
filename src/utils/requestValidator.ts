import { type ZodSchema, ZodError } from "zod";

import { ValidationError, SystemError } from "../errors";

export function bodyValidationAdapter<T>(
  schema: ZodSchema<T>
): (request: { body?: string }) => T {
  return (body: Record<string, any>) => {
    try {
      const validatedBody = schema.parse(body);

      return validatedBody;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        throw new ValidationError(
          "Alguma das informações enviadas não corresponde as regras estabelecidas"
        );
      }

      throw new SystemError("Erro desconhecido");
    }
  };
}

export function paramsValidationAdapter<T>(
  schema: ZodSchema<T>
): (request: { params?: Record<string, any> }) => T {
  return (request: { params?: Record<string, any> }) => {
    const { params } = request;

    try {
      if (!params) {
        throw new ValidationError("Parâmetros não fornecidos");
      }

      const validatedParams = schema.parse(params);

      return validatedParams;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(
          "Alguma das informações enviadas não corresponde às regras estabelecidas"
        );
      }

      throw new SystemError("Erro desconhecido");
    }
  };
}

export function queryValidationAdapter<T>(
  schema: ZodSchema<T>
): (request: { queryStringParameters?: Record<string, any> }) => T {
  return (request: { queryStringParameters?: Record<string, any> }) => {
    const { queryStringParameters } = request;

    try {
      const validatedQuery = schema.parse(queryStringParameters);

      return validatedQuery;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(
          "Alguma das informações enviadas não corresponde às regras estabelecidas"
        );
      }

      throw new SystemError("Erro desconhecido");
    }
  };
}
