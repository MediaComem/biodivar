import { createRouter, createWebHashHistory } from 'vue-router';

import { authStore } from '../store/auth-store';

import Home from '../views/Home.vue';
import Authentication from '../components/login/Authentication.vue';
import Register from '../components/login/Register.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    path: '/:pathMatch(.*)*',
    component: Home,
    meta: { isAuthenticate: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.isAuthenticate)) {
    if (authStore.getters.getAutheticate) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
