import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Institution {
    id: ID!
    name: String!
    active: Boolean!
    createdDate: Date!
    updatedDate: Date!
    users(id: ID): [User!]
  }

  extend type User {
    institution: Institution
  }

  extend type Query {
    institution(id: String!): Institution
  }

  extend type Mutation {
    createInstitution(name: String!): Institution
  }
`;
