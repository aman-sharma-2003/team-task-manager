import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .regex(/^[A-Za-z\s]{2,}$/, "Name should have atleast 2 letters")
      .transform((val) => val.trim()),

    email: z
      .email("Invalid email")
      .transform((val) => val.toLowerCase().trim()),

    phone: z
      .string()
      .regex(/^(\+91)?\d{10}$/, "Enter valid 10 digit phone number"),

    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,15}$/,
        "Password must contain uppercase, lowercase, number and special character"
      ),

    confirmPassword: z.string(),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords are not matching",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("Invalid email"),

  password: z.string().min(1, "Password required"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email"),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be atleast 8 characters"),
});
