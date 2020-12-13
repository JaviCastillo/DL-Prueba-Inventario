import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresLogin: false }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresLogin: true }
  },
  {
    path: '/inventario',
    name: 'Inventario',
    component: () => import('../views/Inventario.vue'),
    meta: { requiresLogin: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = store.getters.getCurrentUser
  let authRequired = to.matched.some(record => record.meta.requiresLogin)
  if (authRequired && !user) {
      next("/")
  } else if (user && !authRequired) {
    next('home')
  } else {
      next()
  }
})


export default router
