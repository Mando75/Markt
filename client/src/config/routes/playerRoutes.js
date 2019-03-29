export const playerRoutes = [
  {
    path: "/player/play/:experimentPlayerId",
    name: "Play Experiment",
    component: () =>
      import("../../components/PlayerExperience/ExperimentRunner/ExperimentRunner")
  }
];
