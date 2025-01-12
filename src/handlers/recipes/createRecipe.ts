import { makeCreateRecipeController } from "../../factories/recipes";
import { routeHandler } from "../routeHandler";

import type { APIGatewayProxyEventV2 } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEventV2) => {
  const execute = routeHandler(event, makeCreateRecipeController());
  return await execute();
};
