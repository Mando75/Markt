import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import VueApollo from "vue-apollo";
import router from "./config/router";
import { apolloClient } from "./config/apollo";
Vue.config.productionTip = false;
Vue.use(Vuetify, {
  theme: {
    primary: "#7fb276",
    secondary: "#6494b5",
    accent: "#fffa62",
    error: "#b71c1c"
  }
});
Vue.use(VueApollo);
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  render: h => h(App),
  router,
  apolloProvider
}).$mount("#app");
