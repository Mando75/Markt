import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Group {
    id: ID!
    name: String!
    active: Boolean!
    guide: Guide!
    createdDate: Date!
    updatedDate: Date!
  }
`;
