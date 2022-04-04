import { createRouter, createWebHashHistory } from 'vue-router';

import { store } from '../store/store';

import Biovers from '../views/Biovers.vue';
import Authentication from '../components/login/Authentication.vue';
import Register from '../components/login/Register.vue';
import ForgotPassword from '../components/login/ForgotPassword.vue';
import ChangePassword from '../components/login/ChangePassword.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Biovers,
    meta: { isAuthenticate: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Authentication,
    meta: { isAuthenticate: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { isAuthenticate: false },
  },
  {
    path: '/change/:token',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: { isAuthenticate: false },
  },
  {
    path: '/forgot',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: { isAuthenticate: false },
  },
  {
    path: '/:pathMatch(.*)*',
    component: Biovers,
    meta: { isAuthenticate: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.isAuthenticate)) {
    if (store.getters['auth/getAutheticate']) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
