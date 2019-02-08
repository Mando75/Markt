import { gql } from "apollo-server-express";

// TODO Convert instructions/bullet into interface
export const typeDefs = gql`
  type Instructions {
    step: Int
    header: String
    bullets: [InstructionBullet]
  }

  enum InstructionBulletFormat {
    BOLD
    ITALIC
    NORMAL
    UNDERLINE
  }

  type InstructionBullet {
    format: InstructionBulletFormat
    text: String
  }

  type ScenarioSessionOverview {
    sessionNumber: Int
    roleDescription: [ScenarioOverviewRoleDescription]
    chartPoints: [[[Float]]]
    expectations: String
  }

  type ScenarioOverviewRoleDescription {
    description: String
    count: Int
  }

  type Scenario {
    id: ID!
    name: String!
    scenarioCode: String!
    maxPlayerSize: Int!
    sessionCount: Int!
    overview: [ScenarioSessionOverview]
    description: String
    instructions: Instructions
    roleDistribution: [String]
    roleTypes: [RoleType]
    scenarioSessions: [ScenarioSession]
    createdDate: Date!
    updatedDate: Date!
  }

  type RoleType {
    id: ID!
    scenario: Scenario!
    roleTypeId: ID!
    name: String
    sessionRoles: [SessionRole]
    createdDate: Date!
    updatedDate: Date!
  }

  type ScenarioSession {
    id: ID!
    scenario: Scenario!
    scenarioSessionId: ID!
    sessionNumber: Int
    instructions: [Instructions]
    roundDiscussionPoints: [Instructions]
    numberOfRounds: Int
    sessionRoles: [SessionRole]
    createdDate: Date!
    updatedDate: Date!
  }

  type SessionRole {
    id: ID!
    roleType: RoleType!
    scenarioSession: ScenarioSession!
    sessionNumber: Int!
    name: String
    value: Float!
    allowSell: Boolean!
    instructions: [Instructions]
    profitEquation: String!
    createdDate: Date!
    updatedDate: Date!
  }

  extend type Query {
    scenario(id: ID!): Scenario
    roleType(id: ID!): RoleType
    scenarioSession(id: ID!): ScenarioSession
    sessionRole(id: ID!): SessionRole
  }
`;
