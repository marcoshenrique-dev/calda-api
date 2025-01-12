import * as z from "zod";

export const createRecipeRequest = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  cookId: z.string().min(1, "cookId is required"),
  level: z.enum(["Iniciante", "Intermediário", "Avançado"], {
    required_error: "Level is required",
    invalid_type_error: "Invalid level",
  }),
  preparationTime: z.string().min(1, "preparationTime is required"),
  steps: z.array(z.string()).min(1, "steps are required"),
  ingredients: z
    .array(
      z.object({
        name: z.string(),
        quantity: z.string(),
      })
    )
    .min(1, "ingredients are required"),
  photoUrl: z.string().optional(),
  categories: z
    .array(
      z.object({
        name: z.string(),
        slug: z.string(),
      })
    )
    .min(1, "categories are required"),
});

export type ICreateRecipeRequest = z.infer<typeof createRecipeRequest>;
