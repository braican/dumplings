import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';

import { auth, usersCollection, checkinsCollection, restaurantsCollection, dumplingsCollection } from '@/firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    dumplings: {},

    checkins: [],
    checkinsLoaded: false,

    loggingDumpling: false,
  },
  actions: {
    fetchUserProfile({ commit, state }) {
      usersCollection.doc(state.currentUser.uid).get()
        .then(res => {
          let userData = res.data();

          if (!res.exists) {
            const { displayName, photoURL, uid } = state.currentUser;
            userData = { displayName, photoURL };
            usersCollection.doc(uid).set(userData, { merge: true });
          }

          commit('setUserProfile', userData);
        })
        .catch(err => console.error(err));
    },
    fetchDumplings({ commit }) {
      const fetcher = new Promise(resolve => {
        if (Cookies.get('cached_dumplings_timer')) {
          console.log('STATUS: Get dumplings from cache.'); // eslint-disable-line
          return resolve(JSON.parse(localStorage.getItem('cached_dumplings')));
        }

        console.log('STATUS: Load dumplings from db.'); // eslint-disable-line

        const restaurantsQuery = restaurantsCollection.orderBy('name').get();
        const dumplingsQuery = dumplingsCollection.get();
        const dumplingMap = {};

        Promise.all([restaurantsQuery, dumplingsQuery]).then(([restaurantsSnapshot, dumplingsSnapshot]) => {
          restaurantsSnapshot.forEach(doc => {
            dumplingMap[doc.id] = { ...doc.data(), dumplings: [] };
          });
          dumplingsSnapshot.forEach(doc => {
            const { restaurant, description } = doc.data();

            if (dumplingMap[restaurant]) {
              dumplingMap[restaurant].dumplings.push({ id: doc.id, description, restaurant });
            }
          });

          console.log('STATUS: Dumplings loaded from firebase.'); //eslint-disable-line
          localStorage.setItem('cached_dumplings', JSON.stringify(dumplingMap));
          Cookies.set('cached_dumplings_timer', 1, { expires: .5 });
          resolve(dumplingMap);
        });
      });

      fetcher.then(dumplings => commit('setDumplings', dumplings));
    },
    logout({ commit }) {
      commit('setCurrentUser', null);
      commit('setUserProfile', {});
      commit('setCheckins', []);
    },

    startLoggingDumpling({ commit }) {
      commit('setLoggingDumpling', true);
      document.body.classList.add('fixed-scroll');
    },
    closeLoggingDumpling({ commit }) {
      commit('setLoggingDumpling', false);
      document.body.classList.remove('fixed-scroll');
    },
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setCheckins(state, val) {
      state.checkins = val;
      state.checkinsLoaded = true;
    },
    setDumplings(state, val) {
      state.dumplings = val;
    },
    setLoggingDumpling(state, val) {
      state.loggingDumpling = val;
    },
  },
});


auth.onAuthStateChanged(user => {
  if (!user) {
    return;
  }

  store.commit('setCurrentUser', user);
  store.dispatch('fetchUserProfile');

  checkinsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
    const checkinsArray = [];
    querySnapshot.forEach(doc => {
      const checkin = { ...doc.data(), id: doc.id };
      checkinsArray.push(checkin);
    });

    store.commit('setCheckins', checkinsArray);
  });
});

export default store;