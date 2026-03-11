import * as z from "zod";

export const loginSchema = z.object({
  email: z.email().transform((val) => val.toLowerCase().trim()),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,15}$/,
      "Password must be 8 to 15 digits long, with atleast one lowercase, one uppercase, one number and one character. "
    ),
});
