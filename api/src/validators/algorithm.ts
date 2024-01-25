import { z } from 'zod';
import { CustomerResponseSchema } from './user';

export const CustomersResponseSchema = z.array(CustomerResponseSchema);
export const CustomersOptimizeRouteQuerySchema = z.object({
  quantity: z.number().min(1).optional(),
});
