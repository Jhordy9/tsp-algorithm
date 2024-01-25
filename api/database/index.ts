import { Client, Pool } from 'pg';
import { DATABASE_URL } from '../src/config';

export const dbPool = new Pool({
  connectionString: DATABASE_URL,
});

export const dbClient = new Client({
  connectionString: DATABASE_URL,
});
