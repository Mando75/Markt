import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Me {
    id: ID!
    email: String!
  }

  type Query {
    me: Me
  }

  type GraphQLError {
    path: String!
    message: String!
  }

  type Mutation {
    _empty: Boolean
  }
`;
