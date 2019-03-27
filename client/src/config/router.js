import Vue from "vue";
import Router from "vue-router";
import { playerRoutes } from "./routes/playerRoutes";
import { guideRoutes } from "./routes/guideRoutes";

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
      path: "/join",
      name: "join",
      component: () => import("../components/PlayerExperience/JoinExperiment")
    }
  ]
    .concat(guideRoutes)
    .concat(playerRoutes)
});

router.beforeEach(async (to, from, next) => {
  const userPath = () => to.path.includes("/guide");
  const playerPath = () => to.path.includes("/player");
  const restrictedPath = playerPath() || userPath();

  // Check for authenticated route
  if (restrictedPath) {
    // Run a check against the server to verify authentication
    const { authenticated, isPlayer, isUser } = await authCheck();
    localStorage.setItem("authenticated", JSON.stringify(authenticated));
    localStorage.setItem("isPlayer", JSON.stringify(isPlayer));
    localStorage.setItem("isUser", JSON.stringify(isUser));

    // they are authenticated, proceed
    if ((playerPath() && isPlayer) || (userPath() && isUser)) {
      next();
    } else if (playerPath()) {
      // they are not authenticated, redirect based on role
      next("/join");
    } else {
      const redirect = "/login?sessionExpired=1";
      next(redirect);
    }
  } else {
    // Safe route, continue
    return next();
  }
});

const authCheck = async () =>
  await fetch("/auth/check").then(res => res.json());

export default router;
