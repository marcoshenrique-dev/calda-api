import type { IController, IRequest, IResponse } from "../../types";

import { TableName, dynamoClient } from "../../database";
import { errorHandler } from "../../errors/errorHandler";

import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { findRecipeMapper } from "../../mappers";

export class FindRecipeController implements IController {
  async handle({ params }: IRequest): Promise<IResponse> {
    const { cookId, recipeId } = params;
    try {
      const command = new GetCommand({
        TableName,
        Key: {
          PK: `COOK#${cookId}`,
          SK: `RECIPE#${recipeId}`,
        },
      });

      const { Item } = await dynamoClient.send(command);

      return {
        statusCode: 200,
        body: {
          recipe: Item ? findRecipeMapper(Item) : null,
        },
      };
    } catch (err) {
      console.log(err);
      return errorHandler(err);
    }
  }
}
