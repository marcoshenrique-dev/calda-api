import type { IController, IRequest, IResponse } from "../../types";

import { TableName, Types, dynamoClient } from "../../database";

import { bodyValidationAdapter, getId } from "../../utils";

import { createRecipeRequest } from "../../requests/createRecipe";

import { errorHandler } from "../../errors/errorHandler";

import { BatchWriteCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const validateBody = bodyValidationAdapter(createRecipeRequest);

export class CreateRecipeController implements IController {
  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { categories, ...data } = validateBody(body);

      const id = getId();

      const addRecipeCommand = new PutCommand({
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

      const { Attributes: RecipeItem } = await dynamoClient.send(
        addRecipeCommand
      );

      const categoryRequests = categories.map((item) => ({
        PutRequest: {
          Item: {
            PK: `CATEGORY#${item.slug}`,
            SK: `CATEGORY_RECIPE#${id}`,
            GS1PK: `CATEGORY_RECIPE#${id}`,
            GS1SK: `CATEGORY#${item.slug}`,
            type: Types.categoryRecipe,
            categoryName: item.name,
            recipeId: id,
            name: data.name,
            level: data.level,
            preparationTime: data.preparationTime,
            photoUrl: data.photoUrl,
          },
        },
      }));

      const categoriesRelation = new BatchWriteCommand({
        RequestItems: {
          [TableName]: categoryRequests,
        },
      });

      await dynamoClient.send(categoriesRelation);

      return {
        statusCode: 200,
        body: {
          recipe: RecipeItem,
          message: "Receita adicionada com sucesso",
        },
      };
    } catch (err) {
      console.log(err);
      return errorHandler(err);
    }
  }
}
