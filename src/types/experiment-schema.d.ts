declare namespace ExperimentSchema {
  interface Experiment {
    id?: string;
    guide: any;
    scenario: ScenarioSchema.Scenario;
    group: any;
    joinCode: string;
    numPlayers: number;
    active: boolean;
    endDate: Date;
    createdDate: Date;
    updatedDate: Date;
  }
}
