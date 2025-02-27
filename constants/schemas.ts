import { z } from 'zod';
import { ONLINE_PRESENCE_PLATFORMS } from '.';
export const RegisterSchema = z.object({
  name: z.string().trim().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long'),
  acceptTerms: z.literal(true, {
    invalid_type_error: 'You must accept terms and conditions.',
  }),
});

export const ResidencySchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .min(11, 'Phone Number must be at least 11 characters long'),
  address: z
    .string()
    .trim()
    .min(3, 'Address must be at least 3 characters long'),
  country: z.string().trim().min(1, 'Country must be selected'),
});

export const BankSchema = z.object({
  bankNo: z.string().trim().min(3, 'BVN must be at least 3 characters long'),
});

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long'),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .trim()
      .min(8, 'Confirm Password must be at least 8 characters long'),
  })
  .refine(
    (data) => data.password === data.confirmPassword, // Validation logic
    {
      message: 'Confirmation password does not match the password', // Error message
      path: ['confirmPassword'],
    }
  );

export const SettingsGeneralFormSchema = z.object({
  pictureUrl: z
    .string({
      required_error: 'Picture is required',
      invalid_type_error: 'Picture URL must be a string',
    })
    .url({ message: 'Invalid url' }),
  firstName: z.string().min(2, {
    message: 'First Name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last Name must be at least 2 characters.',
  }),
  location: z.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
  profession: z.string().min(2, {
    message: 'Profession must be at least 2 characters.',
  }),
  bio: z
    .string()
    .min(255, {
      message: 'Bio must be at least 255 characters.',
    })
    .max(500, {
      message: 'Bio must be at most 500 characters.',
    }),
  links: z
    .array(
      z.object({
        platform: z.enum(ONLINE_PRESENCE_PLATFORMS, {
          message: 'Invalid platform selected',
        }),
        url: z.string().url({ message: 'Invalid URL format' }),
      })
    )
    .optional(),
});
