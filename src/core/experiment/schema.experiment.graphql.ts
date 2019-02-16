import { gql } from "apollo-server-express";
export const typeDefs = gql`
  type Experiment {
    id: ID!
    guide: Guide!
    scenario: Scenario!
    group: Group!
    joinCode: String!
    numPlayers: Int!
    active: Boolean!
    closed: Boolean!
    endDate: Date
    createdDate: Date
    updatedDate: Date
  }

  input ExperimentStartType {
    scenarioId: ID!
    guideId: ID!
    groupId: ID!
  }

  extend type Query {
    experiment(id: ID!): Experiment
  }

  extend type Mutation {
    startNewExperiment(params: ExperimentStartType!): Experiment
  }
`;
