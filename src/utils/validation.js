import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address (e.g., user@example.com)'),
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Please enter a valid email address (e.g., user@example.com)'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match - please check and try again',
  path: ['confirmPassword'],
})

export const propertySchema = z.object({
  title: z.string().min(3, 'Property title must be at least 3 characters').max(100, 'Property title must be less than 100 characters'),
  type: z.enum(['apartment', 'house', 'condo', 'studio', 'townhouse', 'loft'], {
    errorMap: () => ({ message: 'Please select a property type from the dropdown' }),
  }),
  location: z.string().min(5, 'Location must be at least 5 characters (e.g., 123 Main St, City)'),
  rent: z.number().positive('Rent must be a positive number').min(100, 'Monthly rent must be at least $100'),
  status: z.enum(['available', 'occupied'], {
    errorMap: () => ({ message: 'Please select the property availability status' }),
  }),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description must be less than 1000 characters'),
  bedrooms: z.number().min(1, 'Property must have at least 1 bedroom').max(10, 'Property cannot have more than 10 bedrooms'),
  bathrooms: z.number().min(1, 'Property must have at least 1 bathroom').max(10, 'Property cannot have more than 10 bathrooms'),
  image: z.string().url('Please provide a valid image URL (e.g., https://example.com/image.jpg)'),
})
