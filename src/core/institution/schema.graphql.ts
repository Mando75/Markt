import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Institution {
    id: String!
    name: String!
    active: Boolean!
    createdDate: Date!
    updatedDate: Date!
  }

  extend type Query {
    institution(id: String!): Institution
  }

  extend type Mutation {
    createInstitution(name: String!): Institution
  }
`;
