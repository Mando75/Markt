declare module ExperimentSchema {
  interface Experiment {
    id?: string;
    guide: Promise<Core.Guide>;
    scenario: ScenarioSchema.Scenario;
    group: Promise<Core.Group>;
    joinCode: string;
    numPlayers: number;
    active: boolean;
    endDate: Date;
    createdDate: Date;
    updatedDate: Date;
  }
}
