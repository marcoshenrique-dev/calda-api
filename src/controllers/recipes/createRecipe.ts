import type { IController, IRequest, IResponse } from "../../types";

import { TableName, Types, dynamoClient } from "../../database";

import { bodyValidationAdapter, getId } from "../../utils";

import { createRecipeRequest } from "../../requests/createRecipe";

import { errorHandler } from "../../errors/errorHandler";

import { PutCommand } from "@aws-sdk/lib-dynamodb";

const validateBody = bodyValidationAdapter(createRecipeRequest);

export class CreteRecipeController implements IController {
  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const data = validateBody(body);

      const id = getId();

      const command = new PutCommand({
        TableName,
        Item: {
          PK: `COOK#${data.cookId}`,
          SK: `RECIPE#${id}`,

          GS1PK: "RECIPES",
          GS1SK: `RECIPE#${id}`,

          GS2PK: `RECIPE#${id}`,
          GS2SK: `COOK#${data.cookId}`,

          type: Types.recipe,

          id,
          ...data,
        },
      });

      const { Attributes } = await dynamoClient.send(command);

      return {
        statusCode: 200,
        body: {
          cook: Attributes,
          message: "Receita adicionada com sucesso",
        },
      };
    } catch (err) {
      return errorHandler(err);
    }
  }
}
