import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home";
import TestComp from "../components/Test";
import Login from "../components/Login";
import Account from "../components/Account";
import Transaction from "../components/Transaction";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "root",
      component: Home
    },
    {
      path: "/test",
      name: "test",
      component: TestComp
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/create_account",
      name: "account",
      component: Account
    },
    {
      path: "/buy_sell",
      name: "transaction",
      component: Transaction
    }
  ]
});
