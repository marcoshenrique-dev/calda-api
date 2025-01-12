import * as z from "zod";

export const createCategoryRequest = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
});

export type ICreateCategoryRequest = z.infer<typeof createCategoryRequest>;
