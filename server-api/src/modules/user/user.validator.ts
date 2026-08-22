import { z } from 'zod';

export const updateProfileSchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().min(1).max(120).optional(),
  lastName: z.string().min(1).max(120).optional(),
  fullName: z.string().max(255).optional(),
  jobTitle: z.string().max(100).optional().nullable(),
  department: z.string().max(100).optional().nullable(),
  location: z.string().max(100).optional().nullable(),
  phoneNumber: z.string().max(50).optional().nullable(),
  extension: z.string().max(10).optional().nullable(),
  userImage: z.string().max(255).optional().nullable(),
}).refine((data) => {
  return !(data.email === undefined && data.firstName === undefined && data.lastName === undefined && data.fullName === undefined && data.jobTitle === undefined && data.department === undefined && data.location === undefined && data.phoneNumber === undefined && data.extension === undefined && data.userImage === undefined);
}, {
  message: 'At least one profile field is required',
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password and confirm password do not match',
  path: ['confirmPassword'],
});
