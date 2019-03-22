import Vue from "vue";
import Router from "vue-router";
import { credentialStore } from "./credentialStore";

Vue.use(Router);

const router = new Router({
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
      path: "/register",
      name: "SignUp",
      component: () => import("../components/GuideFeatures/CreateAccount.vue")
    },
    {
      path: "/guide/home",
      name: "LandingPage",
      component: () => import("../components/GuideFeatures/LandingPage")
    },
    {
      path: "/guide/scenarios",
      name: "scenarioSelect",
      component: () => import("../components/GuideFeatures/ExperimentSelect")
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
      component: () => import("../components/GuideFeatures/ExperimentSelect")
    },
    {
      path: "/guide/instructions",
      name: "Instructions",
      component: () => import("../components/GuideFeatures/Instructions")
    },
    {
      path: "/guide/players",
      name: "displayCode",
      component: () =>
        import("../components/GuideFeatures/PlayerManagement/PlayerManagement")
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

router.beforeEach((to, from, next) => {
  if (to.path.includes("/player") || to.path.includes("/guide")) {
    fetch("/auth/check")
      .then(res => res.json())
      .then(res => {
        if (res.authenticated) {
          localStorage.setItem("authenticated", "true");
          next();
        } else {
          localStorage.setItem("authenticated", "false");
          next("/login?sessionExpired=1");
        }
      });
  } else {
    return next();
  }
});
export default router;
