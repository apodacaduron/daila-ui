import { createRouter, createWebHistory } from 'vue-router'
import { authenticationGuard } from './routeGuards'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      name: 'SignIn',
      path: '/sign-in',
      component: () => import(/* webpackChunkName: "sign-in" */ '../views/SignIn.vue'),
      meta: {
        requiresAuth: false,
        forVisitors: true,
      }
    },
    {
      name: 'SignUp',
      path: '/sign-up',
      component: () => import(/* webpackChunkName: "sign-up" */ '../views/SignUp.vue'),
      meta: {
        requiresAuth: false,
        forVisitors: true,
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  authenticationGuard(to, from, next)
})

export default router