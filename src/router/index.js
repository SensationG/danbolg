import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Regiest from '../views/Regiest.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/regiest',
    component: Regiest
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/login',
    component: () => import('../views/login.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'  
})

export default router
