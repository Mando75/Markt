import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Group {
    id: ID!
    name: String!
    active: Boolean!
    guide: Guide!
    experiments: [Experiment]
    createdDate: Date!
    updatedDate: Date!
  }

  input groupCreationType {
    name: String!
    guideId: ID!
  }

  extend type Query {
    group(id: ID!): Group
  }

  extend type Mutation {
    createGroup(groupParams: groupCreationType!): Group
  }
`;
