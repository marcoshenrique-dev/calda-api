import type { IController, IRequest, IResponse } from "../../types";

import { TableName, Types, dynamoClient } from "../../database";

import { bodyValidationAdapter } from "../../utils";

import { createCategoryRequest } from "../../requests/createCategory";
import { errorHandler } from "../../errors/errorHandler";

import { PutCommand } from "@aws-sdk/lib-dynamodb";

const validateBody = bodyValidationAdapter(createCategoryRequest);

export class CreateCategoryController implements IController {
  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const data = validateBody(body);

      const command = new PutCommand({
        TableName,
        Item: {
          PK: `CATEGORY#${data.slug}`,
          SK: `CATEGORY#${data.slug}`,
          GS1PK: "CATEGORIES",
          GS1SK: `CATEGORY#${data.slug}`,

          type: Types.category,
          ...data,
        },
      });

      const { Attributes } = await dynamoClient.send(command);

      return {
        statusCode: 200,
        body: {
          category: Attributes,
          message: "Categoria adicionada com sucesso",
        },
      };
    } catch (err) {
      return errorHandler(err);
    }
  }
}
