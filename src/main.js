import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import create from './assets/utils/create'
import createExtend from './assets/utils/createExtend'

Vue.prototype.$create = create
Vue.prototype.$Notice = createExtend
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
