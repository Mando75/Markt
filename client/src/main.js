import Vue from 'vue'
import App from './App'
import router from './router'
import VueTheMask from 'vue-the-mask'
import VeeValidate from 'vee-validate'
import Meta from 'vue-meta'

Vue.config.productionTip = false
Vue.use(VueTheMask)
Vue.use(VeeValidate)
Vue.use(Meta)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
