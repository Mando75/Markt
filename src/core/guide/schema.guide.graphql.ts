import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Guide {
    id: ID!
    user: User!
    experiments: [Experiment]
    active: Boolean!
    createdDate: Date!
    updatedDate: Date!
  }

  extend type Query {
    guide(id: ID!): Guide
  }

  extend type User {
    guide: Guide
  }

  extend type Mutation {
    createGuideFromUser(userId: ID!): Guide
  }
`;
