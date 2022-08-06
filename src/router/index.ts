import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from '../pages/404.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../pages/Home.vue'),
    },
    {
      name: 'SignIn',
      path: '/sign-in',
      component: () => import(/* webpackChunkName: "auth" */ '../pages/SignIn.vue'),
      meta: {
        forVisitors: true,
      }
    },
    {
      name: 'SignUp',
      path: '/sign-up',
      component: () => import(/* webpackChunkName: "auth" */ '../pages/SignUp.vue'),
      meta: {
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

export default router
