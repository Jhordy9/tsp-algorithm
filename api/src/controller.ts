import { Router } from 'express';
import { createCustomer } from './services/createCustomer';
import {
  CreateCustomerBodySchema,
  GetCustomersQuerySchema,
} from './validators/user';
import { StatusCodes } from 'http-status-codes';
import { getCustomers } from './services/getCustomers';
import { optimizePath } from './services/optimizeRoute';
import { CustomersOptimizeRouteQuerySchema } from './validators/algorithm';

export const CustomerController = Router();

CustomerController.post('/', async (req, res) => {
  try {
    const parseBody = CreateCustomerBodySchema.safeParse(req.body);

    if (!parseBody.success) {
      return res.status(StatusCodes.BAD_REQUEST).json(parseBody.error);
    }

    const customer = await createCustomer(parseBody.data);

    res.status(StatusCodes.CREATED).json(customer);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
});

CustomerController.get('/', async (req, res) => {
  try {
    const parseQuery = GetCustomersQuerySchema.safeParse(req.query);

    if (!parseQuery.success) {
      return res.status(StatusCodes.BAD_REQUEST).json(parseQuery.error);
    }

    const customers = await getCustomers(parseQuery.data);

    return res.status(StatusCodes.OK).json(customers);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
});

/////////////////////////////

export const OptimizeRouteController = Router();

OptimizeRouteController.get('/', async (req, res) => {
  try {
    const parseQuery = CustomersOptimizeRouteQuerySchema.safeParse(req.query);

    if (!parseQuery.success) {
      return res.status(StatusCodes.BAD_REQUEST).json(parseQuery.error);
    }

    const customers = await optimizePath(parseQuery.data?.quantity ?? 30);

    return res.status(StatusCodes.OK).json(customers);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
});
