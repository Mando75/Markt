import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type ScenarioInstructions {
    step: Int
    header: String
    bullets: [ScenarioInstructionBullet]
  }

  enum ScenarioInstructionBulletFormat {
    BOLD
    ITALIC
    NORMAL
    UNDERLINE
  }

  type ScenarioInstructionBullet {
    format: ScenarioInstructionBulletFormat
    text: String
  }

  type ScenarioSessionOverview {
    sessionNumber: Int
    roleDescription: [ScenarioOverviewRoleDescription]
    chartPoints: [Float]
    expectations: String
  }

  type ScenarioOverviewRoleDescription {
    description: String
    count: Int
  }

  type Scenario {
    id: ID!
    scenarioCode: String!
    maxPlayerSize: Int!
    sessionCount: Int!
    overview: [ScenarioSessionOverview]
    description: String
    instructions: ScenarioInstructions
    roleDistribution: [String]
    roleTypes: [RoleType]
    createdDate: Date!
    updatedDate: Date!
  }

  type RoleType {
    id: ID!
    scenario: Scenario!
    roleTypeId: ID!
    name: String
    createdDate: Date!
    updatedDate: Date!
  }

  extend type Query {
    scenario(id: ID!): Scenario
    roleType(id: ID!): RoleType
  }
`;
