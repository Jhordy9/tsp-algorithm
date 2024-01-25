import { describe, jest, beforeEach, it, expect } from '@jest/globals';
import { Customer, optimizePath } from './optimizeRoute';
import { getCustomersByQuantity } from '../utils/getCustomersByQuantity';

jest.mock('../utils/getCustomersByQuantity', () => ({
  getCustomersByQuantity: jest.fn(),
}));

const expectOtimizedRoutes: Customer[] = [
  {
    name: 'Company',
    email: 'company@example.com',
    phone: '00000000000',
    id: '00000000-0000-0000-0000-000000000000',
    xCoordinate: 0,
    yCoordinate: 0,
  },
  {
    xCoordinate: 1,
    yCoordinate: 2,
    id: 'c8fc883a-f9d3-4ad4-aafe-afcf387ca616',
    email: 'jhordy@example.com',
    phone: '47992222222',
    name: 'Jhordy',
  },
  {
    xCoordinate: 4,
    yCoordinate: 4,
    id: 'c1fc883a-f3d3-6ad4-aafe-afcf321ca616',
    email: 'jhordy6@example.com',
    phone: '47992222222',
    name: 'Jhordy2',
  },
  {
    xCoordinate: 2,
    yCoordinate: 12,
    id: 'c1fc883a-f3d3-6ad4-aafe-afcf327ca616',
    email: 'jhordy5@example.com',
    phone: '47992222222',
    name: 'Jhordy2',
  },
  {
    xCoordinate: 23,
    yCoordinate: 20,
    id: 'c8fc883a-f3d3-4ad4-aafe-afcf327ca616',
    email: 'jhordy3@example.com',
    phone: '47992222222',
    name: 'Jhordy2',
  },
  {
    xCoordinate: 8,
    yCoordinate: 1,
    id: 'c1fc883a-f3d3-4ad4-aafe-afcf327ca616',
    email: 'jhordy4@example.com',
    phone: '47992222222',
    name: 'Jhordy2',
  },
  {
    xCoordinate: 5,
    yCoordinate: 2,
    id: 'c8fc883a-f9d3-4ad4-aafe-afcf327ca616',
    email: 'jhordy2@example.com',
    phone: '47992222222',
    name: 'Jhordy2',
  },
  {
    name: 'Company',
    email: 'company@example.com',
    phone: '00000000000',
    id: '00000000-0000-0000-0000-000000000000',
    xCoordinate: 0,
    yCoordinate: 0,
  },
];

const mockCustomers: Customer[] = [
  {
    xCoordinate: 4,
    yCoordinate: 4,
    id: 'c1fc883a-f3d3-6ad4-aafe-afcf321ca616',
    email: 'jhordy6@example.com',
    phone: '47992222222',
    name: 'Jhordy2',
  },
  {
    xCoordinate: 2,
    yCoordinate: 12,
    id: 'c1fc883a-f3d3-6ad4-aafe-afcf327ca616',
    email: 'jhordy5@example.com',
    phone: '47992222222',
    name: 'Jhordy2',
  },
  {
    xCoordinate: 1,
    yCoordinate: 2,
    id: 'c8fc883a-f9d3-4ad4-aafe-afcf387ca616',
    email: 'jhordy@example.com',
    phone: '47992222222',
    name: 'Jhordy',
  },
  {
    xCoordinate: 23,
    yCoordinate: 20,
    id: 'c8fc883a-f3d3-4ad4-aafe-afcf327ca616',
    email: 'jhordy3@example.com',
    phone: '47992222222',
    name: 'Jhordy2',
  },

  {
    xCoordinate: 5,
    yCoordinate: 2,
    id: 'c8fc883a-f9d3-4ad4-aafe-afcf327ca616',
    email: 'jhordy2@example.com',
    phone: '47992222222',
    name: 'Jhordy2',
  },
  {
    xCoordinate: 8,
    yCoordinate: 1,
    id: 'c1fc883a-f3d3-4ad4-aafe-afcf327ca616',
    email: 'jhordy4@example.com',
    phone: '47992222222',
    name: 'Jhordy2',
  },
];

describe('TSP Algorithm', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    (getCustomersByQuantity as jest.Mock).mockReset();
  });

  describe('optimizePath', () => {
    it('should optimize the path for the customers', async () => {
      const quantity = 30;
      (getCustomersByQuantity as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(mockCustomers),
      );

      const optimizedPath = await optimizePath(quantity);

      expect(optimizedPath).toBeDefined();
      expect(optimizedPath).toEqual(expectOtimizedRoutes);
    });
  });
});
