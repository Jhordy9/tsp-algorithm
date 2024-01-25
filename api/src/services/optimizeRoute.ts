import { calculateDistance } from '../utils/calculateDistance';
import { calculateTotalDistance } from '../utils/calculateTotalDistance';
import { getCustomersByQuantity } from '../utils/getCustomersByQuantity';

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  xCoordinate: number;
  yCoordinate: number;
};

// A* algorithm to find the closest unvisited customer to the current customer
export const findClosestCustomerAStar = (
  currentCustomer: Customer,
  unvisitedPoints: Customer[],
) => {
  let closestCustomer: Customer | undefined;
  let smallestCost = Infinity;

  for (const customer of unvisitedPoints) {
    const realCost = calculateDistance(currentCustomer, customer);

    // Update the closest customer if a shorter distance is found
    if (realCost < smallestCost) {
      smallestCost = realCost;
      closestCustomer = customer;
    }
  }

  return closestCustomer;
};

// Function to construct a route visiting customers in the order of their proximity
export const customersRoute = (customers: Customer[]) => {
  const route: Customer[] = [];
  const unvisitedPoints = [...customers];

  // Start the route at the company location
  const companyLocation: Customer = {
    name: 'Company',
    email: 'company@example.com',
    phone: '00000000000',
    id: '00000000-0000-0000-0000-000000000000',
    xCoordinate: 0,
    yCoordinate: 0,
  };
  route.push(companyLocation);

  let currentCustomer: Customer | undefined = companyLocation;

  // Continue visiting the closest unvisited customers until all are visited
  while (unvisitedPoints.length > 0) {
    const nextCustomer = findClosestCustomerAStar(
      currentCustomer,
      unvisitedPoints,
    );

    if (nextCustomer) {
      route.push(nextCustomer);
      // Remove the visited customer from the unvisited list
      unvisitedPoints.splice(unvisitedPoints.indexOf(nextCustomer), 1);
      currentCustomer = nextCustomer;
    }
  }

  // Complete the route by returning to the company location
  route.push(companyLocation);

  return route;
};

// Function to optimize the given quantity of customers using a 2-otp algorithm
export const optimizePath = async (quantity: number) => {
  const paths = await getCustomersByQuantity(quantity);

  // Maximum number of iterations to perform
  const maxIterations = 100;

  let bestPath = customersRoute(paths);
  let bestDistance = calculateTotalDistance(bestPath);

  // Iteratively explore different combinations of swapping segments to optimize the path
  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let pathChanged = false;

    // Loop through each segment of the current bestPath
    for (let i = 1; i < bestPath.length - 2; i++) {
      for (let j = i + 1; j < bestPath.length; j++) {
        // Skip adjacent segments as they don't change the path
        if (j - i === 1) {
          continue;
        }

        // Reverse a segment of the current best path
        const reversedSegment = bestPath.slice(i, j).reverse();

        // Create a new path by combining the reversed segment with the unchanged parts
        const tempPath = [
          ...bestPath.slice(0, i),
          ...reversedSegment,
          ...bestPath.slice(j),
        ];

        const newDistance = calculateTotalDistance(tempPath);

        // Update the best path if the new path has a shorter total distance
        if (newDistance < bestDistance) {
          bestPath = tempPath;
          bestDistance = newDistance;
          pathChanged = true;
        }
      }
    }

    if (!pathChanged) {
      break;
    }
  }

  // Return the optimized path with "Company" points at the beginning and end
  return bestPath.slice();
};
