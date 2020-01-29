import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';

import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Admin from './views/Admin';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/dashboard',
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAnon: true,
      },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(({ meta }) => meta.requiresAuth);
  const requiresAnon = to.matched.some(({ meta }) => meta.requiresAnon);
  const { currentUser } = firebase.auth();

  if (requiresAuth && !currentUser) {
    next('/');
  } else if (requiresAnon && currentUser) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
