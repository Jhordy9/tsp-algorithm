import { dbClient } from '..';

export const initialMigration = async () => {
  await dbClient.connect();

  try {
    const customersTable = `
    CREATE TABLE IF NOT EXISTS "customer" (
      "id" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" TIMESTAMP(3) NOT NULL,
      "x_coordinate" INTEGER NOT NULL,
      "y_coordinate" INTEGER NOT NULL,
      CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
    );
  
    CREATE UNIQUE INDEX "Customer_email_key" ON "customer"("email");
  `;

    await dbClient.query(customersTable);
    console.log('Created customers table');
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await dbClient.end();
  }
};
