import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import VueApollo from "vue-apollo";
import router from "./config/router";
import { apolloClient } from "./config/apollo";

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  // iconfont: "mdi",
  theme: {
    primary0: "#4C9C0A" /* Main Primary color */,
    primary1: "#7FCA40",
    primary2: "#7cc569",
    primary3: "#3A8100",
    primary4: "#2B6000",

    secondary0: "#07656A" /* Main Secondary color (1) */,
    secondary1: "#2C8589",
    secondary2: "#127B80",
    secondary3: "#015457",
    secondary4: "#003E41",

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

new Vue({
  render: h => h(App),
  router,
  apolloProvider
}).$mount("#app");
