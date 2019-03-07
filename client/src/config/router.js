import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "root",
      component: () => import("../components/Home")
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../components/Login")
    },
    {
      path: "/guide/scenarios",
      name: "LandingPage",
      component: () => import("../components/LandingPage")
    },
    {
      path: "/how",
      name: "Instructions",
      component: () => import("../components/Instructions")
    },
    {
      path: "/guide/dashboards",
      name: "myHome",
      component: () => import("../components/DashboardsHome")
    },
    {
      path: "/player",
      name: "Player",
      component: () => import("../components/PlayerPage")
    },

    {
      path: "/guide/create_account",
      name: "account",
      component: () => import("../components/Account")
    },
    {
      path: "/join",
      name: "join",
      component: () => import("../components/JoinSession")
    },
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("../components/Welcome")
    },
    {
      path: "/guide/setup",
      name: "simulation_Setup",
      component: () => import("../components/SessionCreation")
    },
    {
      path: "/play",
      name: "simulation_running",
      component: () => import("../components/ExperimentInProgressPage")
    },
    {
      path: "/buy_sell",
      name: "transaction",
      component: () => import("../components/Transaction")
    }
  ]
});
