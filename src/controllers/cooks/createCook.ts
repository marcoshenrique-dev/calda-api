import type { IController, IRequest, IResponse } from "../../types";

import { TableName, dynamoClient } from "../../database";

import { bodyValidationAdapter, getId } from "../../utils";
import { createCookRequest } from "../../requests/createCook";
import { errorHandler } from "../../errors/errorHandler";

import { PutCommand } from "@aws-sdk/lib-dynamodb";

const validateBody = bodyValidationAdapter(createCookRequest);

export class CreateCookController implements IController {
  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const data = validateBody(body);

      const id = getId();

      const command = new PutCommand({
        TableName,
        Item: {
          PK: `COOK#${id}`,
          SK: `COOK#${id}`,
          GS1PK: "COOKS",
          GS1SK: `COOK#${id}`,
          id,
          ...data,
        },
      });

      const { Attributes } = await dynamoClient.send(command);

      return {
        statusCode: 200,
        body: {
          cook: Attributes,
          message: "Cozinheiro adicionado com sucesso",
        },
      };
    } catch (err) {
      return errorHandler(err);
    }
  }
}
