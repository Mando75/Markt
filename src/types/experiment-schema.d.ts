declare module ExperimentSchema {
  interface Experiment {
    id?: string;
    guide: Promise<Core.Guide>;
    scenario: ScenarioSchema.Scenario;
    group: Promise<Core.Group>;
    joinCode: string;
    numPlayers: number;
    players: Promise<ExperimentPlayer[]>;
    sessions: Promise<ExperimentSession[]>;
    active: boolean;
    endDate: Date;
    createdDate: Date;
    updatedDate: Date;
  }

  interface ExperimentPlayer {
    id?: string;
    experiment: Promise<Experiment>;
    player: Promise<Core.Player>;
    roleType: Promise<ScenarioSchema.RoleType>;
    numTransactions: number;
    totalProfit: number;
    createdDate: Date;
    updatedDate: Date;
  }

  interface ExperimentSession {
    id?: string;
    experiment: Promise<Experiment>;
    scenarioSession: Promise<ScenarioSchema.ScenarioSession>;
    sessionNumber: number;
    active: boolean;
    endDate: Date | undefined;
    createdDate: Date;
    updatedDate: Date;
  }
}
