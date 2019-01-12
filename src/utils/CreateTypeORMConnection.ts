import { createConnection, getConnectionOptions } from "typeorm";

/**
 * Create a custom Connection type to TypeORM
 * @constructor
 */
export const CreateTypeORMConnection = async () => {
  let configOptions: any = getDefaultOptions();
  if (process.env.DATABASE_URL && process.env.NODE_ENV === "production") {
    configOptions = getDefaultOptions();
  } else if (process.env.DATABASE_URL && process.env.NODE_ENV === "test") {
    configOptions = getTestOptions();
  } else {
    configOptions = await getConnectionOptions(process.env.NODE_ENV as string);
  }

  return createConnection({ ...configOptions, name: "default" });
};

const getDefaultOptions = () => ({
  type: "postgres",
  url: process.env.DATABASE_URL as string,
  synchronize: false,
  logging: true,
  entities: ["dist/entity/**/*.js"],
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscriber/**/*.js"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  }
});

const getTestOptions = () => ({
  ...getDefaultOptions(),
  url: process.env.DATABASE_URL as string,
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  }
});
