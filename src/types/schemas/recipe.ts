export type IRecipe = {
  id: string;
  name: string;
  description: string;
  cookId: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  preparationTime: string;
  steps: string[];
  ingredients: {
    name: string;
    quantity: string;
  }[];
  photoUrl: string;
};
