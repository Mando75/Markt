import { createConnection, getConnectionOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { splitRedisUrl } from "./redis";

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

  return createConnection({
    ...configOptions,
    name: "default",
    namingStrategy: new SnakeNamingStrategy()
  });
};

const getDefaultOptions = () => ({
  type: "postgres",
  url: process.env.DATABASE_URL as string,
  synchronize: false,
  logging: true,
  entities: ["dist/entity/**/*.js"],
  migrationsRun: true,
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscriber/**/*.js"],
  cache: {
    type: "ioredis",
    duration: 2000,
    options: { ...splitRedisUrl(process.env.REDIS_2_URL, 1), username: null }
  },
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  }
});

const getTestOptions = () => ({
  ...getDefaultOptions(),
  url: process.env.DATABASE_URL as string,
  logging: false,
  synchronize: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  }
});
