import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// HTTP connexion to the API
const uri =
  process.env.NODE_ENV === "production"
    ? "https://markt-dev.herokuapp.com/graphql"
    : "http://localhost:4000/graphql";
// const uri = "https://markt-dev.herokuapp.com/graphql"
const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri,
  credentials: "same-origin"
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  connectToDevTools: true
});
