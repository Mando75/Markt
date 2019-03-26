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
    primary: "#7FCA40",
    primary0: "#7FCA40" /* Used for text on top of one of the modern themes*/,
    primary1:
      "#BAE397" /* Used with darken-1 for buttons and backround highlights*/,
    primary2: "#8ABD5F" /*Used */,
    primary3: "#609732",
    primary4: "#3E7213",
    accent: "#224C00",

    modernColor0: "#222222" /* Main Secondary color */,
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
