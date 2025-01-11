import type { APIGatewayProxyEventV2 } from "aws-lambda";

import { TableName, dynamoClient } from "../../database";

import { bodyValidationAdapter } from "../../utils";
import { createCookRequest } from "../../requests/createCook";
import { errorHandler } from "../../errors/errorHandler";

import { PutCommand } from "@aws-sdk/lib-dynamodb";
import KSUID from "ksuid";

const validateBody = bodyValidationAdapter(createCookRequest);

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const body = validateBody({ body: event.body });

    const id = KSUID.randomSync().string;

    const command = new PutCommand({
      TableName,
      Item: {
        PK: `COOK#${id}`,
        SK: `COOK#${id}`,
        GS1: "COOKS",
        GS2: `COOK#${id}`,
        ...body,
      },
    });

    const { Attributes } = await dynamoClient.send(command);

    return {
      statusCode: 200,
      data: {
        cook: Attributes,
        message: "Cozinheiro adicionado com sucesso",
      },
    };
  } catch (err) {
    return errorHandler(err);
  }
}
