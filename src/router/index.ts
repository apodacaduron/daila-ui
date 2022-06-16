import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    },
    {
      name: 'SignIn',
      path: '/sign-in',
      component: () => import(/* webpackChunkName: "sign-in" */ '../views/SignIn.vue'),
    },
  ],
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) { 
//       if (!auth.loggedIn()) { 
//           next({ 
//               path: '/sign-in', 
//               query: { redirect: to.fullPath } 
//           }) 
//       } else { 
//           next() 
//       } 
//   } else {
//       next() // make sure to always call next()! 
//   } 
// })

export default router