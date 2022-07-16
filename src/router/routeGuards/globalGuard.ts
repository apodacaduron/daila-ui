import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import { useAuth } from '../../features/authentication';

export const globalGuard = async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const authInstance = useAuth()
  const isAuthenticated = Boolean(await authInstance.getCurrentUser())

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: '/sign-in',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.forVisitors)) {
    if (isAuthenticated) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else {
    next()
  }
}