import Vue from "vue";
import Router from "vue-router";
import Vuetify from "vuetify";

import Home from "../views/Home";

Vue.use(Router);
Vue.use(Vuetify);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "root",
      component: Home
    }
  ]
});
