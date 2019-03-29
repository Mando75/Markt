import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import currency from "v-currency-field";
import VueApollo from "vue-apollo";
import router from "./config/router";
import { apolloClient } from "./config/apollo";
import { credentialStore } from "./config/credentialStore";
import colors from "vuetify/es5/util/colors";

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(Vuetify, {
  theme: {
    primary: colors.lightGreen.darken2,
    secondary: colors.lightGreen.lighten2,
    accent: colors.grey.darken2,
    info: "#adadad",
    success: "#72a647",
    warning: "#444444",
    error: "#b71c1c",

    // monochrome0: "#7FCA40" /* lighter version of primary*/,
    // primary: "#BAE397" /* button color*/,
    // monochrome2: "#8ABD5F" /* same as primary */,
    // primary darken-4: "#609732",
    // primary: "#3E7213",

    mBlack: "#222222" /* Main primary color */,
    mSilver: "#adadad",
    mGrey: "#61706b",
    mGray: "#61706b",
    mDarkGrey: "#444444",
    mDarkGray: "#444444"
  }
});
Vue.use(currency);
Vue.use(VueApollo);
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});
Vue.prototype.$credentials = credentialStore;

Vue.filter("formatDate", function(value) {
  if (value) {
    const d = new Date(value);
    return (
      [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
      " " +
      [d.getHours(), d.getMinutes()].join(":")
    );
  }
});
new Vue({
  render: h => h(App),
  router,
  apolloProvider
}).$mount("#app");
