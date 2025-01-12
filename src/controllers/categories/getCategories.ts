import type { IController, IResponse } from "../../types";

import { TableName, dynamoClient } from "../../database";
import { errorHandler } from "../../errors/errorHandler";

import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getCategoriesMapper } from "../../mappers";

export class GetCategoriesController implements IController {
  async handle(): Promise<IResponse> {
    try {
      const command = new QueryCommand({
        TableName,
        IndexName: "GS1",
        KeyConditionExpression: "#GS1PK = :GS1PK",
        ExpressionAttributeNames: {
          "#GS1PK": "GS1PK",
        },
        ExpressionAttributeValues: {
          ":GS1PK": "CATEGORIES",
        },
      });

      const { Items, Count, LastEvaluatedKey } = await dynamoClient.send(
        command
      );

      return {
        statusCode: 200,
        body: {
          categories: getCategoriesMapper(Items || []),
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
