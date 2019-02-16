declare namespace ExperimentSchema {
  interface Experiment {
    id?: string;
    guide: Core.Guide;
    scenario: ScenarioSchema.Scenario;
    group: Core.Group;
    joinCode: string;
    numPlayers: number;
    active: boolean;
    endDate: Date;
    createdDate: Date;
    updatedDate: Date;
  }
}
