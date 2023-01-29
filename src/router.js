import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';
import { adminEmail } from './config';

import Home from './views/Home';
import Feed from './views/Feed';
import Dumplings from './views/Dumplings';
import User from './views/User';
import Map from './views/Map';
import Admin from './views/Admin';

import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
    {
      path: '*',
      redirect: '/',
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
      path: '/feed',
      name: 'Feed',
      component: Feed,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/dumplings',
      name: 'Dumplings',
      component: Dumplings,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/map',
      name: 'Map',
      component: Map,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAdmin: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(({ meta }) => meta.requiresAuth);
  const requiresAnon = to.matched.some(({ meta }) => meta.requiresAnon);
  const requiresAdmin = to.matched.some(({ meta }) => meta.requiresAdmin);
  const { currentUser } = firebase.auth();

  if (store.state.currentRoute) {
    next(store.state.currentRoute.path);
  } else if (requiresAdmin && (!currentUser || currentUser.email !== adminEmail)) {
    // if (requiresAdmin && (!currentUser || currentUser.email !== adminEmail)) {
    next('/feed');
  } else if (requiresAuth && !currentUser) {
    next('/');
  } else if (requiresAnon && currentUser) {
    next('/feed');
  } else {
    next();
  }
});

export default router;
