import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "../components/Home";
import TestComp from "../components/Test";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "root",
      component: HelloWorld
    },
    {
      path: "/test",
      name: "test",
      component: TestComp
    }
  ]
});
