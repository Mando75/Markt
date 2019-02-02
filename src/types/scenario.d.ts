declare namespace Scenarios {
  interface Instructions {
    step: number;
    header: string;
    bullets: Array<InstructionBullet>;
  }

  interface InstructionBullet {
    format: Array<BulletFormat>;
    text: string;
  }

  enum BulletFormat {
    BOLD = "BOLD",
    ITALIC = "ITALIC",
    NORMAL = "NORMAL",
    UNDERLINE = "UNDERLINE"
  }

  interface SessionOverview {
    sessionNumber: number;
    roleDescription: Array<SessionOverviewRoleDescription>;
    chartPoints: [number];
    expectations: string;
  }

  interface SessionOverviewRoleDescription {
    description: string;
    count: number;
  }
}
