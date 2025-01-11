import * as z from "zod";

export const createCookRequest = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  instagram: z.string().optional(),
  webiste: z.string().optional(),
  photoUrl: z.string().optional(),
});

export type ICreateCookRequest = z.infer<typeof createCookRequest>;
