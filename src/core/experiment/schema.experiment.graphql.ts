import { gql } from "apollo-server-express";
export const typeDefs = gql`
  type Experiment {
    id: ID!
    guide: Guide!
    scenario: Scenario!
    group: Group!
    joinCode: String!
    numPlayers: Integer!
    active: Boolean!
    endDate: Date
    createdDate: Date
    updatedDate: Date
  }
`;
