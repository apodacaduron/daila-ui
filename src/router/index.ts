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
      component: () => import(/* webpackChunkName: "auth" */ '../views/SignIn.vue'),
      meta: {
        requiresAuth: false,
        forVisitors: true,
      }
    },
    {
      name: 'SignUp',
      path: '/sign-up',
      component: () => import(/* webpackChunkName: "auth" */ '../views/SignUp.vue'),
      meta: {
        requiresAuth: false,
        forVisitors: true,
      }
    },
    {
      name: 'Workspaces',
      path: '/w',
      redirect: '/w/create',
      component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/Index.vue'),
      children: [
        {
          name: 'WorkspacesCreate',
          path: 'create',
          component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/Create.vue'),
        },
      ],
      meta: {
        requiresAuth: true,
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