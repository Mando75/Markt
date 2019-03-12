import { gql } from "apollo-server-express";
export const typeDefs = gql`
  type Experiment {
    id: ID!
    guide: Guide!
    scenario: Scenario!
    group: Group!
    joinCode: String!
    status: ExperimentStatus
    numPlayers: Int!
    players: [ExperimentPlayer]!
    sessions: [ExperimentSession]!
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
    transactions: [Transaction]!
    buyerTransactions: [Transaction]
    sellerTransactions: [Transaction]
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

  type Round {
    id: ID!
    session: ExperimentSession
    roundNumber: Int!
    active: Boolean
    averagePrice: Float
    transactions: [Transaction]!
    numTransactions: Int
    endDate: Date
    createdDate: Date
    updatedDate: Date
  }

  type Transaction {
    id: ID!
    round: Round!
    amount: Float!
    buyer: ExperimentPlayer
    seller: ExperimentPlayer
    buyerProfit: Float!
    sellerProfit: Float!
    createdDate: Date
    updatedDate: Date
  }

  input ExperimentStartType {
    scenarioId: ID!
    guideId: ID!
    groupId: ID!
  }

  input ExperimentJoinType {
    playerCode: ID!
    joinCode: ID!
  }

  enum ExperimentStatus {
    joining
    session_start
    in_round
    round_summary
    closed
  }

  extend type Query {
    experiment(id: ID!): Experiment
  }

  extend type Mutation {
    startNewExperiment(params: ExperimentStartType!): Experiment
    joinExperiment(params: ExperimentJoinType!): ExperimentPlayer
    startNextSession(experimentId: ID!): ExperimentSession
    startNextRound(experimentId: ID!): Round
  }
`;
