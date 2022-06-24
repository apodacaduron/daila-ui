import { createRouter, createWebHistory } from 'vue-router'
import { globalGuard } from './routeGuards'
import PageNotFound from '../views/404.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/',
      component: () => import('../layouts/HomeLayout.vue'),
      meta: {
        requiresAuth: false
      },
      children: [
        {
          name: 'Home',
          path: '',
          component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        },
        {
          name: 'SignIn',
          path: '/sign-in',
          component: () => import(/* webpackChunkName: "auth" */ '../views/SignIn.vue'),
          meta: {
            forVisitors: true,
          }
        },
        {
          name: 'SignUp',
          path: '/sign-up',
          component: () => import(/* webpackChunkName: "auth" */ '../views/SignUp.vue'),
          meta: {
            forVisitors: true,
          }
        },
      ]
    },
    {
      path: '/w',
      redirect: '/w/create',
      component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/Index.vue'),
      children: [
        {
          name: 'CreateWorkspace',
          path: 'create',
          component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/Create.vue'),
        },
        {
          path: ':workspaceId',
          redirect: { name: 'Dashboard' },
          component: () => import('../layouts/CRMLayout.vue'),
          children: [
            {
              name: 'Dashboard',
              path: 'dashboard',
              component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/Dashboard.vue'),
            },
            {
              name: 'TeamMembers',
              path: 'team-members',
              component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/TeamMembers.vue'),
            },
          ]
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