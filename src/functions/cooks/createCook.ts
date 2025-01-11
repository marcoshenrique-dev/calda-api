import type { APIGatewayProxyEventV2 } from "aws-lambda";

import { TableName, dynamoClient } from "../../database";

import { bodyValidationAdapter } from "../../utils";
import { createCookRequest } from "../../requests/createCook";

const validateBody = bodyValidationAdapter(createCookRequest);

export function handler(event: APIGatewayProxyEventV2) {
  const body = validateBody({ body: event.body });

  return {
    data: body,
  };
}
