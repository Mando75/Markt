import { createConnection, getConnectionOptions } from "typeorm";

/**
 * Create a custom Connection type to TypeORM
 * @constructor
 */
export const CreateTypeORMConnection = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({ ...connectionOptions, name: "default" });
};
