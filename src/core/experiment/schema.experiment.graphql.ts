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
    activeSession: ExperimentSession
    activeRound: Round
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
    playerCode: ID!
    currentSessionRole: SessionRole!
    profitEquation: String
    totalProfit: Float!
    createdDate: Date
    updatedDate: Date
  }

  type ExperimentSession {
    id: ID!
    experiment: Experiment!
    sessionNumber: Int!
    scenarioSession: ScenarioSession!
    rounds: [Round]
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

  type RoundSummary {
    numTransactions: Int
    averagePrice: Float
    maxPrice: Float
    minPrice: Float
    transactions: [Transaction]
  }

  input ExperimentStartType {
    scenarioId: ID!
    guideId: ID!
    groupId: ID
  }

  input ExperimentJoinType {
    playerCode: ID!
    joinCode: ID!
  }

  input MakeTransactionType {
    experimentId: ID!
    buyerCode: ID!
    sellerCode: ID!
    amount: Float!
  }

  enum ExperimentStatus {
    joining
    session_start
    in_round
    round_summary
    closed
  }

  type Subscription {
    experimentStatusChanged(experimentId: ID!): Experiment
    playerJoinedExperiment(experimentId: ID!): Experiment
  }

  extend type Query {
    experiment(id: ID!): Experiment
  }

  extend type Mutation {
    startNewExperiment(params: ExperimentStartType!): Experiment
    joinExperiment(params: ExperimentJoinType!): ExperimentPlayer
    startNextSession(experimentId: ID!): ExperimentSession
    startNextRound(experimentId: ID!): Round
    makeTransaction(params: MakeTransactionType!): Transaction
    endCurrentRound(experimentId: ID!): RoundSummary
    endExperiment(experimentId: ID!): Experiment
  }
`;
