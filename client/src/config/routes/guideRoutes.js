export const guideRoutes = [
  {
    path: "/guide/home",
    name: "LandingPage",
    component: () => import("../../components/GuideFeatures/LandingPage")
  },
  {
    path: "/guide/scenarios",
    name: "scenarioSelect",
    component: () => import("../../components/GuideFeatures/ExperimentSelect")
  },
  {
    path: "/guide/experiment/:experimentId",
    name: "experimentControls",
    component: () => import("../../components/GuideFeatures/ExperimentHub")
  },
  {
    path: "/guide/instructions",
    name: "Instructions",
    component: () => import("../../components/common/Instructions")
  },
  {
    path: "/guide/players",
    name: "displayCode",
    component: () =>
      import("../../components/GuideFeatures/PlayerManagement/PlayerManagement")
  },
  {
    path: "/guide/start",
    name: "confirmBegin",
    component: () => import("../../components/GuideFeatures/BeginExperiment")
  }
];
