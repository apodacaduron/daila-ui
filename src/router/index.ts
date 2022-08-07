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
      path: '/w',
      component: () => import(/* webpackChunkName: "workspaces" */ '../layouts/WorkspaceLayout.vue'),
      children: [
        {
          name: 'CreateWorkspace',
          path: 'create',
          component: () => import(/* webpackChunkName: "workspaces" */ '../pages/workspaces/Create.vue'),
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
              component: () => import(/* webpackChunkName: "workspaces" */ '../pages/workspaces/psychologist/Dashboard.vue'),
            },
            // {
            //   name: 'PsychologistAppointments',
            //   path: 'appointments',
            //   component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/psychologist/Appointments.vue'),
            // },
            // {
            //   name: 'PsychologistPatients',
            //   path: 'patients',
            //   component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/psychologist/Patients.vue'),
            // },
            // {
            //   name: 'PsychologistTeam',
            //   path: 'team',
            //   component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/psychologist/Team.vue'),
            // },
          ]
        },
        {
          path: ':workspaceId/personal-space',
          redirect: { name: 'PersonalSpaceDashboard' },
          component: () => import('../layouts/CRMLayout.vue'),
          meta: {
            category: 'personal-space',
          },
          children: [
            {
              name: 'PersonalSpaceDashboard',
              path: 'dashboard',
              component: () => import(/* webpackChunkName: "workspaces" */ '../pages/workspaces/personal-space/Dashboard.vue'),
            },
            // {
            //   name: 'PsychologistAppointments',
            //   path: 'appointments',
            //   component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/psychologist/Appointments.vue'),
            // },
            // {
            //   name: 'PsychologistPatients',
            //   path: 'patients',
            //   component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/psychologist/Patients.vue'),
            // },
            // {
            //   name: 'PsychologistTeam',
            //   path: 'team',
            //   component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/psychologist/Team.vue'),
            // },
          ]
        },
        // {
        //   path: ':workspaceId/admin',
        //   redirect: { name: 'AdminDashboard' },
        //   component: () => import('../layouts/CRMLayout.vue'),
        //   meta: {
        //     category: 'admin',
        //   },
        //   children: [
        //     {
        //       name: 'AdminDashboard',
        //       path: 'dashboard',
        //       component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/admin/Dashboard.vue'),
        //     },
        //     // {
        //     //   name: 'AdminSales',
        //     //   path: 'sales',
        //     //   component: () => import(/* webpackChunkName: "workspaces" */ '../views/workspaces/admin/Sales.vue'),
        //     // },
        //   ]
        // },
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

router.beforeEach(async (to) => {
  const authService = useAuthService()
  const isAuthenticated = Boolean(await authService.currentUser())

  if (!isAuthenticated && to.meta.requiresAuth) return { name: 'SignIn', query: { redirect: to.fullPath } }
  if (isAuthenticated && to.meta.forVisitors) return { name: 'Home' }

  return
})

export default router
