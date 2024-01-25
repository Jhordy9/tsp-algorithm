import { dbPool } from '../../database';
import {
  GetCustomersQuery,
  GetCustomersResponseSchema,
} from '../validators/user';

export const getCustomers = async (query: GetCustomersQuery) => {
  const getCustomers = `
  SELECT id, email, phone, name, x_coordinate, y_coordinate
  FROM "customer"
  WHERE 
    LOWER(name) LIKE $1 AND
    LOWER(email) LIKE $2 AND
    phone LIKE $3;
`;

  const customers = await dbPool.query(getCustomers, [
    query.name ? `%${query.name}%` : '%',
    query.email ? `%${query.email}%` : '%',
    query.phone ? `%${query.phone}%` : '%',
  ]);

  const parseResponse = GetCustomersResponseSchema.safeParse(customers.rows);

  if (!parseResponse.success) {
    throw new Error(
      JSON.stringify({
        message: 'Error getting customers',
        error: parseResponse.error,
      }),
    );
  }

  return customers.rows.map((customer) => ({
    ...customer,
    xCoordinate: customer.x_coordinate,
    yCoordinate: customer.y_coordinate,
  }));
};
