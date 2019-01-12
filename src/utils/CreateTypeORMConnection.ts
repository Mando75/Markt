import { createConnection, getConnectionOptions } from "typeorm";

/**
 * Create a custom Connection type to TypeORM
 * @constructor
 */
export const CreateTypeORMConnection = async () => {
  // Pulls configuration locally
  const configOptions: any = await getConnectionOptions(process.env.NODE_ENV);

  if (process.env.DATABASE_URL) {
    // Check if we can pull the postgres url from Heroku
    configOptions.url = process.env.DATABASE_URL as string;
  }
  return createConnection({ ...configOptions, name: "default" });
};
