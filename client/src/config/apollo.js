import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const uri = "/graphql";
const httpLink = new HttpLink({
  uri,
  fetchOptions: {
    credentials: "include"
  }
});

const wsUri = "/subscriptions";
const wsLink = new WebSocketLink({ uri: wsUri, options: { reconnect: true } });

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link,
  cache,
  connectToDevTools: true
});
