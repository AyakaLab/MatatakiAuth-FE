import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueQrcode from '@chenfengyuan/vue-qrcode'

Vue.config.productionTip = false

Vue.component(VueQrcode.name, VueQrcode)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
