import Vue from 'vue';
import Vuex from 'vuex';

import { usersCollection } from '@/firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
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
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
  },
});
