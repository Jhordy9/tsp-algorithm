import { initialMigration } from './migrations';

const runMigrations = async () => {
  await initialMigration();
};

void runMigrations();
