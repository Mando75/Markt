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
    primary: "#7bb24c",
    secondary: "#8ABD5F",
    accent: "#224C00",
    info: "#adadad",
    success: "#72a647",
    warning: "#444444",
    error: "#b71c1c",

    monochrome0: "#7FCA40" /* lighter version of primary*/,
    monochrome1: "#BAE397" /* button color*/,
    monochrome2: "#8ABD5F" /* same as secondary */,
    monochrome3: "#609732",
    monochrome4: "#3E7213",

    modernColor0: "#222222" /* Main Secondary color */,
    modernColor1: "#adadad",
    modernColor2: "#61706b",
    modernColor3: "#444444"
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
