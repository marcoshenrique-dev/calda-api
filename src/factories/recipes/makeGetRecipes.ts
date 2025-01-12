import { GetRecipesController } from "../../controllers/recipes/getRecipes";

export function makeGetRecipesController() {
  return new GetRecipesController();
}
