declare namespace ScenarioSchema {
  interface Scenario {
    scenarioCode: string;
    maxPlayerSize: number;
    sessionCount: number;
    overview: Array<SessionOverview>;
    description: string;
    instructions: Array<Instructions>;
    roleDistribution: Array<string>;
  }

  interface Instructions {
    step: number;
    header: string;
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
}
