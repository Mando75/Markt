import "reflect-metadata";
import "dotenv/config";
import { ApolloServer, defaultPlaygroundOptions } from "apollo-server-express";
import { makeSchema } from "./makeSchema";
import { CreateTypeORMConnection } from "./CreateTypeORMConnection";
import { Connection } from "typeorm";
import { GraphQLSchema } from "graphql";
import { Server } from "http";
import * as express from "express";
import * as session from "express-session";
import { routes } from "../routes";
import { redis } from "./redis";
import { applyMiddleware } from "graphql-middleware";
import { createShield } from "./createShield";
import * as RateLimit from "express-rate-limit";
import * as RateLimitStore from "rate-limit-redis";
import passport from "./passport";
import { AddressInfo } from "ws";
import * as cors from "cors";
import * as history from "connect-history-api-fallback";
import { setContext } from "./ContextSession/contextControl";
import { createSession } from "./ContextSession/sessionControl";
import { createSubscriptionServer } from "./createSubscriptionServer";

const testEnv = process.env.NODE_ENV === "test";

redis.on("error", () => {
  console.log("Error connecting");
  if (process.env.NODE_ENV != "production") redis.disconnect();
});

/**
 * Try to bootstrap a database and server connection. If successful,
 * returns the db and server connection instances in an object
 * @param port -> Http server will liston on this port
 */
export const bootstrapConnections = async (port: number) => {
  let db: Connection, app: Server;
  const server = express();
  const limiter = new RateLimit({
    store: new RateLimitStore({
      client: redis
    }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000 // limit each IP to 1000 requests per windowMs
  });
  server.enable("trust proxy");
  server.use(corsConfig());
  server.use(limiter);
  const sessionParser = session(createSession(session, redis));
  server.use(sessionParser);
  server.use(passport.initialize());
  server.use(routes);
  try {
    // Connect to Database
    db = await CreateTypeORMConnection();
    // await db.runMigrations();
    if (!testEnv) console.log(`Connected to db ${db.options.database}`);

    // Load GraphQL Schema files
    const schema: GraphQLSchema = applyMiddleware(
      await makeSchema(),
      createShield()
    );

    // Start Apollo Server
    const apolloServer = new ApolloServer({
      schema,
      formatError,
      formatResponse,
      context: setContext(redis),
      introspection: true,
      playground,
      debug: process.env.NODE_ENV !== "production",
      subscriptions: "/subscriptions"
    });

    apolloServer.applyMiddleware({ app: server, path: "/graphql" });
    server.use(history());
    server.use(express.static(__dirname + "../../../client/dist"));
    app = await createSubscriptionServer(server, port, schema, sessionParser);
    if (!testEnv) {
      console.log(
        `🚀  Server ready at http://localhost:${
          (app.address() as AddressInfo).port
        }/graphql \n🚀  Subscription Server ready at ws://localhost:${
          (app.address() as AddressInfo).port
        }/subscription\nHappy Coding!
        `
      );
    }

    return { app, db };
  } catch (e) {
    console.error("Could not bootstrap server connections. Exiting", e);
    return null;
  }
};

/**
 * Attempt to normalize port value
 * @param val
 */
export const normalizePort = (val: any) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) return val;

  if (port >= 0) return port;

  return false;
};

/**
 * Request response formatting
 * @param response
 */
const formatResponse = (response: Response) => {
  // TODO Logging
  return response;
};

/**
 * Formatting error response
 * @param error
 */
const formatError = (error: Error) => {
  if (testEnv) {
    return error;
  }
  console.log(error);
  return error;
};

/**
 * Cors configuration
 */
const corsConfig = () =>
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? (process.env.HOST as string)
        : [
            (process.env.HOST || process.env.TEST_HOST) as string,
            "http://localhost:8080"
          ]
  });

/**
 * Playground configuration
 */
const playground = {
  ...defaultPlaygroundOptions,
  settings: {
    ...defaultPlaygroundOptions.settings,
    "editor.cursorShape": "line",
    "request.credentials": "same-origin"
  }
};
