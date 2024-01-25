import { Customer } from '../services/optimizeRoute';

// Function to calculate the Euclidean distance between two customers
export const calculateDistance = (customerA: Customer, customerB: Customer) => {
  const deltaX = customerA.xCoordinate - customerB.xCoordinate;
  const deltaY = customerA.yCoordinate - customerB.yCoordinate;
  return Math.sqrt(deltaX ** 2 + deltaY ** 2);
};
