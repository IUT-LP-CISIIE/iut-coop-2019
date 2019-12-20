import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: () => import('../views/Connexion.vue')
  },
  {
    path: '/creer-un-compte',
    name: 'creer-un-compte',
    component: () => import('../views/CreerUnCompte.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
