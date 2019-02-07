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
    chartPoints:
      | Array<number>
      | Array<Array<number>>
      | Array<Array<Array<number>>>;
    expectations: string;
  }

  interface SessionOverviewRoleDescription {
    description: string;
    count: number;
  }

  interface ScenarioSession {
    id?: string;
    scenario?: Promise<Scenario>;
    scenarioSessionId: string;
    sessionNumber: number;
    instructions: Array<Instructions>;
    roundDiscussionPoints: Array<Instructions>;
    numberOfRounds: number;
  }

  interface RoleType {
    id?: string;
    scenario?: Promise<Scenario>;
    roleTypeId: string;
    name: string;
    sessionRoles: Promise<SessionRole[]>;
    createdDate?: Date;
    updatedDate?: Date;
  }

  interface SessionRole {
    id?: string;
    scenarioSession?: Promise<ScenarioSession>;
    roleType?: Promise<RoleType>;
    sessionNumber: number;
    name: string;
    value: number;
    allowSell: boolean;
    instructions: Array<Instructions>;
    profitEquation: string;
  }
}
