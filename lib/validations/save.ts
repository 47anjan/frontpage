import { z } from "zod";

export const saveCreateSchema = z.object({
  postSlug: z.string(),
});
