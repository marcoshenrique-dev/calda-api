import { makeGetRecipesByCategoryController } from "../../factories/recipes";
import { routeHandler } from "../routeHandler";

import type { APIGatewayProxyEventV2 } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEventV2) => {
  const execute = routeHandler(event, makeGetRecipesByCategoryController());
  return await execute();
};
