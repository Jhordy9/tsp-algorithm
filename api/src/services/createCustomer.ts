import { dbPool } from '../../database';
import { CreateUserBody, CustomerResponseSchema } from '../validators/user';
import { v4 } from 'uuid';

export const createCustomer = async (body: CreateUserBody) => {
  const createCustomer = `
    INSERT INTO "customer" (id, email, phone, name, x_coordinate, y_coordinate, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, email, phone, name, x_coordinate, y_coordinate;
  `;

  const createdCustomer = await dbPool.query(createCustomer, [
    v4(),
    body.email,
    body.phone,
    body.name,
    body.xCoordinate,
    body.yCoordinate,
    new Date(),
  ]);

  const parseResponse = CustomerResponseSchema.safeParse(
    createdCustomer.rows[0],
  );

  if (!parseResponse.success) {
    throw new Error(
      JSON.stringify({
        message: 'Error creating customer',
        error: parseResponse.error,
      }),
    );
  }

  const { x_coordinate, y_coordinate, ...restCustomer } = parseResponse.data;

  return {
    ...restCustomer,
    xCoordinate: x_coordinate,
    yCoordinate: y_coordinate,
  };
};
