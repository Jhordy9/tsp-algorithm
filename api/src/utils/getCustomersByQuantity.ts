import { dbPool } from '../../database';
import { CustomersResponseSchema } from '../validators/algorithm';

export const getCustomersByQuantity = async (quantity = 30) => {
  const getCustomers = `
  SELECT id, email, phone, name, x_coordinate, y_coordinate
  FROM "customer" as c
  ORDER BY c.created_at DESC
  LIMIT $1;
`;

  const customers = await dbPool.query(getCustomers, [quantity]);

  const parseCustomers = CustomersResponseSchema.safeParse(customers.rows);

  if (!parseCustomers.success) {
    throw new Error(
      JSON.stringify({
        message: 'Error parsing get customers to optimize route',
        error: parseCustomers.error,
      }),
    );
  }

  return parseCustomers.data.map(
    ({ x_coordinate, y_coordinate, ...restCostumers }) => ({
      xCoordinate: x_coordinate,
      yCoordinate: y_coordinate,
      ...restCostumers,
    }),
  );
};
