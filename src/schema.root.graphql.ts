import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar Date

  enum AccountType {
    USER
    ADMIN
  }

  type User {
    id: ID!
    externalGuid: ID
    firstName: String
    lastName: String
    fullName: String
    email: String!
    accountType: AccountType!
    active: Boolean!
    accountLocked: Boolean!
    acceptedTos: Boolean!
    createDate: Date!
    updatedDate: Date!
    emailConfirmed: Boolean!
  }

  type Query {
    me: User
  }

  type GraphQLError {
    path: String!
    message: String!
  }

  type Mutation {
    _empty: Boolean
  }
`;
