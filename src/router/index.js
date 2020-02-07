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
    path: '/conversation/:id/:message',
    name: 'conversation-message',
    component: Home
  },
  {
    path: '/conversation/:id',
    name: 'conversation',
    component: Home
  },
  {
    path: '/membre/:id',
    name: 'membre',
    component: () => import('../views/Membre.vue')
  },
  {
    path: '/membres',
    name: 'membres',
    component: () => import('../views/Membres.vue')
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: () => import('../views/Connexion.vue')
  },
  {
    path: '/nouvelle-conversation',
    component: () => import('../views/ConversationNouvelle.vue')
  },
  {
    path: '/creer-un-compte',
    name: 'creer-un-compte',
    component: () => import('../views/CreerUnCompte.vue')
  }
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: "is-active",
})

export default router
