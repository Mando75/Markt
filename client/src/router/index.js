import Vue from 'vue'
import Router from "vue-router";
import Vuetify from "vuetify";
import VueApollo from "vue-apollo";
import { apolloClient } from "./apollo";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});
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
