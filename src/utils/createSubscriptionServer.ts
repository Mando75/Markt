import { Express } from "express";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, GraphQLSchema, subscribe } from "graphql";
import { Session } from "../types/graphql-context";
import { ApolloErrors } from "../enums/ApolloErrors";

export const createSubscriptionServer = async (
  expressServer: Express,
  port: number,
  schema: GraphQLSchema,
  sessionParser: any
) => {
  const ws = createServer(expressServer);
  return await ws.listen(port, () => {
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
        onConnect: async (_: any, webSocket: any) => {
          const wsSession: Session = await new Promise(resolve => {
            // use same session parser as normal gql queries
            sessionParser(webSocket.upgradeReq, {}, () => {
              if (webSocket.upgradeReq.session) {
                resolve(webSocket.upgradeReq.session);
              }
              return false;
            });
          });
          // We have a good session. attach to context
          if (wsSession.userId || wsSession.playerId) {
            return { session: wsSession };
          }
          // throwing error rejects the connection
          throw new Error(ApolloErrors.UNAUTHORIZED);
        }
      },
      { server: ws, path: "/subscriptions" }
    );
  });
};
