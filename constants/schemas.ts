import { z } from "zod";
export const RegisterSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long"),
  acceptTerms: z.literal(true, {
    invalid_type_error: "You must accept terms and conditions.",
  }),
});

export const ResidencySchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .min(11, "Phone Number must be at least 11 characters long"),
  address: z
    .string()
    .trim()
    .min(3, "Address must be at least 3 characters long"),
  country: z.string().trim().min(1, "Country must be selected"),
});

export const BankSchema = z.object({
  bankNo: z.string().trim().min(3, "BVN must be at least 3 characters long"),
});

export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long"),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
