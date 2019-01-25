import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Guide {
    id: ID!
    user: User!
    active: Boolean!
    createdDate: Date!
    updatedDate: Date!
  }

  extend type Query {
    guide(id: ID!): Guide
  }

  extend type Mutation {
    createGuideFromUser(userId: ID!): Guide
  }
`;
