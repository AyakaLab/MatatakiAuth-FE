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
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "bilibiliauth" */ '../views/Auth/Auth.vue')
  },
  {
    path: '/auth/bilibili',
    name: 'AuthBilibili',
    component: () => import(/* webpackChunkName: "bilibiliauth" */ '../views/Auth/Bilibili.vue')
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
