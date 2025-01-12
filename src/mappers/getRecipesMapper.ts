import type { IRecipe } from "../types";

export function getRecipesMapper(data: Record<string, any>[]): IRecipe[] {
  const recipes = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      cookId: item.cookId,
      level: item.level,
      preparationTime: item.preparationTime,
      steps: item.steps,
      ingredients: item.ingredients,
      photoUrl: item?.photoUrl || null,
    };
  });
  return recipes;
}
