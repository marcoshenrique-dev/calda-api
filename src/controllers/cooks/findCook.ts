import type { IController, IRequest, IResponse } from "../../types";

import { TableName, dynamoClient } from "../../database";
import { errorHandler } from "../../errors/errorHandler";

import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { NotFoundError } from "../../errors";

export class FindCookController implements IController {
  async handle({ params }: IRequest): Promise<IResponse> {
    const cookId = params.cookId;

    try {
      const command = new QueryCommand({
        TableName,
        KeyConditionExpression: "#PK = :PK",
        ExpressionAttributeNames: {
          "#PK": "PK",
        },
        ExpressionAttributeValues: {
          ":PK": `COOK#${cookId}`,
        },
      });

      const { Items, Count, LastEvaluatedKey } = await dynamoClient.send(
        command
      );

      if (!Items) {
        throw new NotFoundError("Cozinheiro não encontrado");
      }

      const [cook, ...recipes] = Items;

      return {
        statusCode: 200,
        body: {
          cook,
          recipes,
          total: Count,
          key: LastEvaluatedKey,
        },
      };
    } catch (err) {
      console.log(err);
      return errorHandler(err);
    }
  }
}
