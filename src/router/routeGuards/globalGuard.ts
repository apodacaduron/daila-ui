import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuth } from "../../composables";

export const globalGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
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