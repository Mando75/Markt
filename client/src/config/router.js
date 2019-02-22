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
      path: "/create_account",
      name: "account",
      component: () => import("../components/Account")
    },
    {
      path: "/buy_sell",
      name: "transaction",
      component: () => import("../components/Transaction")
    }
  ]
});
