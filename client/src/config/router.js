import Vue from "vue";
import Router from "vue-router";
import { playerRoutes } from "./routes/playerRoutes";

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
      path: "/join",
      name: "join",
      component: () => import("../components/PlayerExperience/JoinExperiment")
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
      component: () =>
        import("../components/PlayerExperience/ExperimentRunner/Transaction")
    }
  ].concat(playerRoutes)
});

// router.beforeEach(async (to, from, next) => {
//   const playerPath = () => to.path.includes("/player");
//   const userPath = () => to.path.includes("/guide");
//   const restrictedPath = playerPath() || userPath();
//
//   Check for authenticated route
// if (restrictedPath) {
//   Run a check against the server to verify authentication
// const { authenticated, isPlayer, isUser } = await authCheck();
// localStorage.setItem("authenticated", JSON.stringify(authenticated));
// localStorage.setItem("isPlayer", JSON.stringify(isPlayer));
// localStorage.setItem("isUser", JSON.stringify(isUser));
//
// they are authenticated, proceed
// if ((playerPath() && isPlayer) || (userPath() && isUser)) {
//   next();
// } else {
//   they are not authenticated, redirect based on role
// const redirect = isUser ? "/login?sessionExpired=1" : "/join";
// next(redirect);
// }
// } else {
//   Safe route, continue
// return next();
// }
// });
//
// const authCheck = async () =>
//   await fetch("/auth/check").then(res => res.json());
//
export default router;
//
