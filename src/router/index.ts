import { createRouter, createWebHistory } from 'vue-router'
import { globalGuard } from './routeGuards'
import PageNotFound from '../views/404.vue'

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
    {
      name: 'PageNotFound',
      path: '/:pathMatch(.*)*',
      component: PageNotFound,
    },
  ],
})

router.beforeEach((to, from, next) => {
  globalGuard(to, from, next)
})

export default router