import * as z from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .regex(/^[A-Za-z\s]{2,}$/, "Name should have atleast 2 letters")
      .transform((val) => val.trim()),
    email: z.email().transform((val) => val.toLowerCase().trim()),
    phone: z
      .string()
      .trim()
      .regex(/^(\+91)?\d{10}$/, "Enter valid 10 digit phone number"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,15}$/,
        "Password must be 8 to 15 digits long, with atleast one lowercase, one uppercase, one number and one character. "
      ),

    confirmPassword: z
      .string()
      .min(8, "Too Short, Password should be greater than 8 digits.")
      .max(15, "Too Long, Password should be less than 15 digits."),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords are not matching. Check and type again.",
    path: ["confirmPassword"],
  });
