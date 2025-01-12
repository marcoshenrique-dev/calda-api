import type { IController } from "../types";
import { bodyParser, response } from "../utils";

import type { APIGatewayProxyEventV2 } from "aws-lambda";

export function routeHandler(
  request: APIGatewayProxyEventV2,
  controller: IController
) {
  return async () => {
    const { body, pathParameters, queryStringParameters, headers } = request;

    const { statusCode, body: responseBody } = await controller.handle({
      body: bodyParser(body),
      params: { ...pathParameters, ...queryStringParameters },
      headers: headers as Record<string, string>,
    });

    return response(statusCode, responseBody);
  };
}
