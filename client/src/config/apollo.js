import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const uri =
  process.env.NODE_ENV === "production"
    ? "https://markt-dev.herokuapp.com/graphql"
    : "http://localhost:4000/graphql";

const httpLink = new HttpLink({
  uri,
  credentials: "same-origin"
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  connectToDevTools: true
});
