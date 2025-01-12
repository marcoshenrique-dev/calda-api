import type { IRecipe } from "../types";

export function findRecipeMapper(data: Record<string, any>): IRecipe {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    cookId: data.cookId,
    level: data.level,
    preparationTime: data.preparationTime,
    steps: data.steps,
    ingredients: data.ingredients,
    photoUrl: data?.photoUrl || null,
  };
}
