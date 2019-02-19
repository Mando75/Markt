import Vue from "vue";
import './plugins/vuetify'
import App from "./App";
import router from "./router";
// import VeeValidate from 'vee-validate'
import Vuetify from "vuetify";
import VueApollo from "vue-apollo";
import { apolloClient } from "./apollo";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;
// Vue.use(VueTheMask)
// Vue.use(VeeValidate)
// Vue.use(Meta)
Vue.use(Vuetify);
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  apolloProvider,
  router,
  render: h => h(App)
});
