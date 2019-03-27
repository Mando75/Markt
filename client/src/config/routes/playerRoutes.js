export const playerRoutes = [
  {
    path: "/player/play",
    name: "Play Experiment",
    component: () =>
      import("../../components/PlayerExperience/ExperimentRunner/ExperimentRunner")
  }
];
