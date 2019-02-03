import { RoleType } from "../entity/RoleType";

declare namespace ScenarioSchema {
  interface Scenario {
    id?: string;
    scenarioCode: string;
    maxPlayerSize: number;
    sessionCount: number;
    overview: Array<SessionOverview>;
    description: string;
    instructions: Array<Instructions>;
    roleDistribution: Array<string>;
  }

  interface Instructions {
    step?: number;
    header?: string;
    bullets: Array<InstructionBullet>;
  }

  interface InstructionBullet {
    format: BulletFormat;
    text: string;
  }

  const enum BulletFormat {
    BOLD = "BOLD",
    ITALIC = "ITALIC",
    NORMAL = "NORMAL",
    UNDERLINE = "UNDERLINE"
  }

  interface SessionOverview {
    sessionNumber: number;
    roleDescription: Array<SessionOverviewRoleDescription>;
    chartPoints: Array<number>;
    expectations: string;
  }

  interface SessionOverviewRoleDescription {
    description: string;
    count: number;
  }

  interface ScenarioSession {
    id?: string;
    scenario?: Scenario;
    scenarioSessionId: string;
    sessionNumber: number;
    instructions: Array<Instructions>;
    roundDiscussionPoints: Array<Instructions>;
    numberOfRounds: number;
  }

  interface SessionRole {
    id?: string;
    roleType?: RoleType;
    scenarioSession?: ScenarioSession;
    sessionNumber: number;
    name: string;
    value: number;
    allowSell: boolean;
    instructions: [Instructions];
    profitEquation: string;
  }
}
