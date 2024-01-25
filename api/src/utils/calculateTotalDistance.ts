import { Customer } from '../services/optimizeRoute';
import { calculateDistance } from './calculateDistance';

// Function to calculate the total distance of a route visiting a sequence of customers
export const calculateTotalDistance = (customers: Customer[]) => {
  let totalDistance = 0;
  for (let i = 0; i < customers.length - 1; i++) {
    totalDistance += calculateDistance(customers[i], customers[i + 1]);
  }
  return totalDistance;
};
