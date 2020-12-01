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
    path: '/oauth/:id',
    name: 'OAuth',
    component: () => import(/* webpackChunkName: "oauth" */ '../views/OAuth.vue'),
    props: true
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
  },
  {
    path: '/bilibili/auth/success',
    name: 'AuthBilibiliSuccess',
    component: () => import(/* webpackChunkName: "bilibiliauthsuccess" */ '../views/Bilibili/QRLoggedIn.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
