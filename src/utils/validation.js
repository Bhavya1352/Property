import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const propertySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  type: z.enum(['apartment', 'house', 'condo', 'studio', 'townhouse', 'loft'], {
    errorMap: () => ({ message: 'Please select a valid property type' }),
  }),
  location: z.string().min(5, 'Location must be at least 5 characters'),
  rent: z.number().positive('Rent must be a positive number').min(100, 'Rent must be at least $100'),
  status: z.enum(['available', 'occupied'], {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description must be less than 1000 characters'),
  bedrooms: z.number().min(1, 'At least 1 bedroom required').max(10, 'Maximum 10 bedrooms'),
  bathrooms: z.number().min(1, 'At least 1 bathroom required').max(10, 'Maximum 10 bathrooms'),
  image: z.string().url('Please provide a valid image URL'),
})
