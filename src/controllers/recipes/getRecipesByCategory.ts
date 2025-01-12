import type { IController, IRequest, IResponse } from "../../types";

import { TableName, dynamoClient } from "../../database";
import { errorHandler } from "../../errors/errorHandler";

import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getRecipesMapper } from "../../mappers";

export class GetRecipesByCategoryController implements IController {
  async handle({ params }: IRequest): Promise<IResponse> {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const categorySlug = params.categorySlug!;

    try {
      const command = new QueryCommand({
        TableName,
        KeyConditionExpression: "#PK = :PK and begins_with(#SK, :SK)",
        ExpressionAttributeNames: {
          "#PK": "PK",
          "#SK": "SK",
        },
        ExpressionAttributeValues: {
          ":PK": `CATEGORY#${categorySlug}`,
          ":SK": "CATEGORY_RECIPE#",
        },
      });

      const { Items, Count, LastEvaluatedKey } = await dynamoClient.send(
        command
      );

      return {
        statusCode: 200,
        body: {
          recipes: getRecipesMapper(Items || []),
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
