import Vue from "vue";
import Router from "vue-router";
import { playerRoutes } from "./routes/playerRoutes";
import { guideRoutes } from "./routes/guideRoutes";
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
      path: "/instructions",
      name: "Instructs",
      component: () => import("../components/common/Instructions.vue")
    },
    {
      path: "/register",
      name: "SignUp",
      component: () => import("../components/GuideFeatures/CreateAccount")
    },
    {
      path: "/redirect",
      name: "Authentication redirect",
      component: () => import("../components/AuthRedirect")
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
    const { isPlayer, isUser } = await authCheck();

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

export const authCheck = async () => {
  const resp = await fetch("/auth/check").then(res => res.json());
  localStorage.setItem("authenticated", JSON.stringify(resp.authenticated));
  credentialStore.authenticated = resp.authenticated;
  localStorage.setItem("isPlayer", JSON.stringify(resp.isPlayer));
  credentialStore.isPlayer = resp.isPlayer;
  localStorage.setItem("isUser", JSON.stringify(resp.isUser));
  credentialStore.isUser = resp.isUser;
  return resp;
};

export default router;
