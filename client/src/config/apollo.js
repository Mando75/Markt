import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const uri = "/graphql";
const httpLink = new HttpLink({
  uri,
  fetchOptions: {
    credentials: "include",
  },
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  connectToDevTools: true
});
