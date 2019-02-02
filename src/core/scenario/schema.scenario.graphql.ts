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
    id: String!
    scenarioCode: String!
    maxPlayerSize: Int!
    sessionCount: Int!
    overview: [ScenarioSessionOverview]
    description: String
    instructions: ScenarioInstructions
    roleDistribution: [String]
    createdDate: Date!
    updatedDate: Date!
  }
`;
