import { z } from 'zod';

export const CreateCustomerBodySchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  name: z.string(),
  xCoordinate: z.number().min(0),
  yCoordinate: z.number().min(0),
});
export type CreateUserBody = z.infer<typeof CreateCustomerBodySchema>;

export const CustomerResponseSchema = z.object({
  id: z.string(),
  email: z
    .string()
    .email()
    .transform((value) => value?.toLowerCase()),
  phone: z.string(),
  name: z.string(),
  x_coordinate: z.number().min(0),
  y_coordinate: z.number().min(0),
});

////////////////////////////////////////

export const GetCustomersQuerySchema = z.object({
  search: z
    .string()
    .transform((value) => value?.toLowerCase())
    .optional(),
});
export type GetCustomersQuery = z.infer<typeof GetCustomersQuerySchema>;

export const GetCustomersResponseSchema = z.array(
  CustomerResponseSchema.optional(),
);
