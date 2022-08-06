import { createRouter, createWebHistory } from 'vue-router';

import { useAuthService } from '../features/authentication';
import PageNotFound from '../pages/404.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
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

router.beforeEach(async (to) => {
  const authService = useAuthService()
  const isAuthenticated = Boolean(await authService.currentUser())

  if (!isAuthenticated && to.meta.requiresAuth) return { name: 'SignIn', query: { redirect: to.fullPath } }
  if (isAuthenticated && to.meta.forVisitors) return { name: 'Home' }

  return
})

export default router
