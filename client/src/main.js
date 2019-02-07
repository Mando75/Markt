import Vue from 'vue'
import App from './App'
import router from './router'
import VueTheMask from 'vue-the-mask'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'
import Meta from 'vue-meta'
import VueApollo from 'vue-apollo'
import{apolloClient} from "./apollo";

Vue.config.productionTip = false
Vue.use(VueTheMask)
Vue.use(VeeValidate)
Vue.use(Meta)
Vue.use(Vuetify)
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  render: h => h(App)
})


