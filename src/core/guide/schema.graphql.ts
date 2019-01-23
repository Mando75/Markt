import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Guide {
    id: String!
    user: User!
    active: Boolean!
    createdDate: Date!
    updatedDate: Date!
  }

  extend type Query {
    guide: Guide
  }

  extend type Mutation {
    createGuideFromUser: Guide
  }
`;
