import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
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