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
          path: ':workspaceId/psychologist',
          redirect: { name: 'PsychologistDashboard' },
          component: () => import('../layouts/CRMLayout.vue'),
          meta: {
            category: 'psychologist',
          },
          children: [
            {
              name: 'PsychologistDashboard',
              path: 'dashboard',
              component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/psychologist/Dashboard.vue'),
            },
            {
              name: 'PsychologistTeamMembers',
              path: 'team-members',
              component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/psychologist/TeamMembers.vue'),
            },
          ]
        },
        {
          path: ':workspaceId/admin',
          redirect: { name: 'AdminDashboard' },
          component: () => import('../layouts/CRMLayout.vue'),
          meta: {
            category: 'admin',
          },
          children: [
            {
              name: 'AdminDashboard',
              path: 'dashboard',
              component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/admin/Dashboard.vue'),
            },
            {
              name: 'AdminSales',
              path: 'sales',
              component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/admin/Sales.vue'),
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