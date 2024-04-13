import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Davis from '../views/Davis.vue'
import Innovation from '../views/Innovation.vue'
import Trinity from '../views/Trinity.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/davis',
    name: 'Davis',
    component: Davis,
    props: true,
  },
  {
    path: '/trinity',
    name: 'Trinity',
    component: Trinity,
    props: true,
  },
  {
    path: '/innovation',
    name: 'Innovation',
    component: Innovation,
    props: true,
  },
  // catchall 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
