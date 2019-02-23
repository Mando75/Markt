import { gql } from "apollo-server-express";
export const typeDefs = gql`
  type Experiment {
    id: ID!
    guide: Guide!
    scenario: Scenario!
    group: Group!
    joinCode: String!
    numPlayers: Int!
    players: [ExperimentPlayer]
    sessions: [ExperimentSession]
    active: Boolean!
    closed: Boolean!
    endDate: Date
    createdDate: Date
    updatedDate: Date
  }

  type ExperimentPlayer {
    id: ID!
    experiment: Experiment!
    player: Player!
    roleType: RoleType!
    numTransactions: Int!
    totalProfit: Float!
    createdDate: Date
    updatedDate: Date
  }

  type ExperimentSession {
    id: ID!
    experiment: Experiment!
    sessionNumber: Int!
    scenarioSession: ScenarioSession!
    active: Boolean!
    endDate: Date
    createdDate: Date
    updatedDate: Date
  }

  extend type Player {
    experimentPlayers: [ExperimentPlayer]
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
