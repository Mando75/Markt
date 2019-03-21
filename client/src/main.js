import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import VueApollo from "vue-apollo";
import router from "./config/router";
import { apolloClient } from "./config/apollo";
import { credentialStore } from "./config/credentialStore";

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  theme: {
    primary0: "#7FCA40" /* Main Primary color */,
    primary1: "#BAE397",
    primary2: "#8ABD5F",
    primary3: "#609732",
    primary4: "#3E7213",
    accent: "#224C00",

    modernColor0: "#222222" /* Main Secondary color (2) */,
    modernColor1: "#adadad",
    modernColor2: "#61706b",
    modernColor3: "#444444",

    error: "#b71c1c"
  }
});
Vue.use(VueApollo);
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});
Vue.prototype.$credentials = credentialStore;
new Vue({
  render: h => h(App),
  router,
  apolloProvider
}).$mount("#app");
