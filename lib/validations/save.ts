import { z } from "zod";

export const saveCreateSchema = z.object({
  postId: z.string(),
});
