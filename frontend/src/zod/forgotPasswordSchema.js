import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email().transform((val) => val.toLowerCase().trim()),
});
