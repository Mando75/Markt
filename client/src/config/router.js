import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "root",
      component: () => import("../components/Welcome")
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../components/Login")
    },
    {
      path: "/guide/home",
      name: "LandingPage",
      component: () => import("../components/GuideFeatures/LandingPage")
    },
    {
      path: "/guide/scenarios",
      name: "scenarioSelect",
      component: () => import("../components/GuideFeatures/SessionCreation")
    },
    {
      path: "/player",
      name: "Player",
      component: () => import("../components/PlayerExperience/PlayerPage")
    },

    {
      path: "/join",
      name: "join",
      component: () => import("../components/PlayerExperience/JoinSession")
    },
    {
      path: "/guide/setup",
      name: "simulation_Setup",
      component: () => import("../components/GuideFeatures/SessionCreation")
    },
    {
      path: "/guide/joinCode",
      name: "displayCode",
      component: () => import("../components/GuideFeatures/JoinCode")
    },
    {
      path: "/play",
      name: "simulation_running",
      component: () =>
        import("../components/GuideFeatures/ExperimentInProgressPage")
    },
    {
      path: "/buy_sell",
      name: "transaction",
      component: () => import("../components/PlayerExperience/Transaction")
    }
  ]
});
