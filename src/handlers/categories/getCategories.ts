import { makeGetCategoriesController } from "../../factories/categories";
import { routeHandler } from "../routeHandler";

import type { APIGatewayProxyEventV2 } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEventV2) => {
  const execute = routeHandler(event, makeGetCategoriesController());
  return await execute();
};
