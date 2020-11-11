import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bilibili/auth/qrcode',
    name: 'BilibiliQRAuth',
    component: () => import(/* webpackChunkName: "bilibiliqrauth" */ '../views/Bilibili/QRAuth.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: './',
  routes
})

export default router
