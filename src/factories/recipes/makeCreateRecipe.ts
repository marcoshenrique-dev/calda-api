import { CreateRecipeController } from "../../controllers/recipes/createRecipe";

export function makeCreateRecipeController() {
  return new CreateRecipeController();
}
