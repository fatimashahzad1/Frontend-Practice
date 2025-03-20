import { z } from 'zod';
import { ONLINE_PRESENCE_PLATFORMS } from '.';
import dayjs from 'dayjs';
export const RegisterSchema = z.object({
  name: z.string().trim().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long')
    .max(32, 'Password cannot exceed 32 characters')
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,32}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
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
    .min(8, 'Password must be at least 8 characters long')
    .max(32, 'Password cannot exceed 32 characters')
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,32}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters long')
      .max(32, 'Password cannot exceed 32 characters')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,32}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: z
      .string()
      .trim()
      .min(8, 'Confirm Password must be at least 8 characters long')
      .max(32, 'Password cannot exceed 32 characters')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,32}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
  })
  .refine(
    (data) => data.password === data.confirmPassword, // Validation logic
    {
      message: 'Confirmation password does not match the password', // Error message
      path: ['confirmPassword'],
    }
  );

export const SettingsGeneralFormSchema = z.object({
  id: z.number({
    message: 'User ID is required',
  }),
  pictureUrl: z
    .string({
      required_error: 'Picture is required',
      invalid_type_error: 'Picture URL must be a string',
    })
    .url({ message: 'Invalid URL' }),
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
  links: z.array(
    z.object({
      platform: z.enum(ONLINE_PRESENCE_PLATFORMS, {
        message: 'Invalid platform selected',
      }),
      url: z.string().url({ message: 'Invalid URL format' }),
    })
  ),
});

export const PaymentMethodSchema = z.object({
  type: z.enum(['Visa', 'MasterCard'], {
    message: 'Invalid card type selected',
  }),
  cardholderName: z
    .string()
    .min(2, { message: 'Cardholder Name must be at least 2 characters.' }),
  cardNumber: z.string().regex(/^\d{16}$/, {
    message: 'Card Number must be exactly 16 digits.',
  }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: 'Expiry Date must be in MM/YY format.',
  }),
  cvv: z
    .string()
    .regex(/^\d{3}$/, { message: 'CVV must be exactly 3 digits.' }),
});

export const NotificationsSchema = z.object({
  weeklyNewsletter: z.boolean().default(false), // Switch value
  accountSummary: z.boolean().default(false), // Switch value
  websiteNotifications: z
    .array(z.string())
    .min(1, 'Select at least one preference'), // Checkbox group
});

export const AddPostEventSchema = z.object({
  content: z
    .string()
    .min(255, {
      message: 'Content must be at least 255 characters.',
    })
    .max(500, {
      message: 'Content must be at most 500 characters.',
    }),
  title: z
    .string()
    .min(10, { message: 'Title must be at least 10 characters.' })
    .max(50, { message: 'Title must be at most 50 characters.' })
    .optional(),
  type: z.number({
    message: 'Post type is required',
  }),
  postImage: z
    .string({
      required_error: 'Picture is required',
      invalid_type_error: 'Picture URL must be a string',
    })
    .nullable()
    .optional(),
  eventDate: z
    .string()
    .refine(
      (val) => {
        console.log('IN REFINE+++++++++');
        return !val || dayjs(val, 'MMM D, YYYY', true).isValid();
      },
      { message: 'Invalid date format. Use "Jul 24, 2024".' }
    )
    .optional()
    .nullable(),
  eventTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: 'Invalid time format (HH:mm expected)',
    })
    .optional()
    .nullable(),
});

export const WriteArticleSchema = z.object({
  title: z
    .string()
    .min(20, {
      message: 'Title must be at least 20 characters.',
    })
    .max(255, {
      message: 'Title must be at most 255 characters.',
    }),
  description: z
    .string()
    .min(500, {
      message: 'Description must be at least 500 characters.',
    })
    .max(1000, {
      message: 'Description must be at most 1000 characters.',
    }),
  estimatedTime: z.string().min(1, 'Estimated time is required'),
  articleImage: z.string().optional(),
});

export const AddEventSchema = z.object({
  title: z
    .string()
    .min(10, {
      message: 'Title must be at least 10 characters.',
    })
    .max(50, {
      message: 'Title must be at most 50 characters.',
    }),
  eventDate: z.string().refine(
    (val) => dayjs(val, 'MMM D, YYYY', true).isValid(), // Ensure it's valid
    { message: 'Invalid date format. Use "Jul 24, 2024".' }
  ),
  eventTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Invalid time format (HH:mm expected)',
  }),
});

export const AddOnlinePresenceSchema = z.object({
  platform: z.enum(ONLINE_PRESENCE_PLATFORMS, {
    message: 'Invalid platform selected',
  }),
  url: z.string().url({ message: 'Invalid URL format' }),
});

export const ChangeEmailFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});
