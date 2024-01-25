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
    LOWER(name) LIKE $1 OR
    LOWER(email) LIKE $1 OR
    phone LIKE $1;
`;

  const customers = await dbPool.query(getCustomers, [
    query.search ? `%${query.search}%` : '%',
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

  return parseResponse.data.map(
    ({ x_coordinate, y_coordinate, ...restCustomer }) => ({
      ...restCustomer,
      xCoordinate: x_coordinate,
      yCoordinate: y_coordinate,
    }),
  );
};
