import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';

import {
  auth,
  usersCollection,
  checkinsCollection,
  restaurantsCollection,
  commentsCollection,
  dumplingsCollection,
  starsCollection,
  metaCollection,
} from '@/firebase';

import { mapSnapshotToCheckins } from '@/util';

export const checkinsPerPage = 10;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    dumplings: {},
    dumplingsLoaded: false,

    checkins: [],
    hiddenCheckins: [],
    userCheckins: [],
    checkinsLoaded: false,
    oldestCheckin: null,
    loadingMoreCheckins: false,
    checkinCount: 0,
    displayedCheckinCount: checkinsPerPage,

    loggingDumpling: false,

    commenting: false,
    commentMap: {},

    starsMap: {},

    currentRoute: null,
  },
  getters: {
    userCheckinsByRestaurant: state => rid =>
      state.userCheckins.filter(({ restaurantId }) => restaurantId === rid),
    userRestaurantCount: state =>
      [...new Set(state.userCheckins.map(checkin => checkin.restaurantId))].length,
    starsCount: state => Object.keys(state.starsMap).length,
    isStarred: state => restaurantId => state.starsMap[restaurantId],
    starredData: state => {
      const starredRestaurantIds = Object.keys(state.starsMap);
      const starred = Object.keys(state.dumplings)
        .filter(restaurantId => starredRestaurantIds.includes(restaurantId))
        .map(restaurantId => ({ ...state.dumplings[restaurantId], restaurantId }));
      return starred;
    },
    userHadStarsCount: state =>
      Object.keys(state.starsMap).filter(
        restaurantId =>
          state.userCheckins.filter(checkin => checkin.restaurantId === restaurantId).length > 0,
      ).length,
  },
  actions: {
    fetchUserProfile({ commit, state }) {
      usersCollection.doc(state.currentUser.uid).onSnapshot(res => {
        let userData = res.data();

        if (!res.exists) {
          const { displayName, photoURL, uid } = state.currentUser;
          userData = { displayName, photoURL };
          usersCollection.doc(uid).set(userData, { merge: true });
        }

        commit('setUserProfile', userData);
      });
    },
    fetchDumplings({ commit }) {
      const fetcher = new Promise(resolve => {
        if (Cookies.get('cached_dumplings')) {
          console.log('STATUS: Get dumplings from cache.'); // eslint-disable-line
          return resolve(JSON.parse(localStorage.getItem('cached_dumplings')));
        }

        console.log('STATUS: Load dumplings from db.'); // eslint-disable-line

        const dumplingMap = {};

        dumplingsCollection
          .where('year', '==', 2021)
          .get()
          .then(snap => {
            const restaurantPromises = [];
            snap.forEach(doc => {
              const { description, restaurant } = doc.data();
              const dumpData = { id: doc.id, description, restaurant };

              restaurantPromises.push(restaurantsCollection.doc(restaurant).get());

              if (dumplingMap[restaurant]) {
                dumplingMap[restaurant].dumplings.push(dumpData);
              } else {
                dumplingMap[restaurant] = { dumplings: [dumpData] };
              }
            });

            return restaurantPromises;
          })
          .then(promises => {
            Promise.all(promises).then(snaps => {
              snaps.forEach(doc => {
                dumplingMap[doc.id] = { ...dumplingMap[doc.id], ...doc.data() };
              });

              resolve(dumplingMap);
            });
          });
      });

      fetcher.then(dumplings => {
        commit('setDumplingsLoaded', true);
        commit('setDumplings', dumplings);
      });
    },

    fetchDumplingRatings({ commit, state }) {
      const newDumplingMap = { ...state.dumplings };

      dumplingsCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const { aggregateRating, checkinCount, restaurant } = doc.data();

          if (!newDumplingMap[restaurant] || !newDumplingMap[restaurant].dumplings) {
            return;
          }

          const newDumplings = [...newDumplingMap[restaurant].dumplings].map(dumpling => {
            if (dumpling.id === doc.id) {
              dumpling.checkinCount = checkinCount || 0;
              dumpling.avgRating =
                checkinCount === 0 || checkinCount === undefined
                  ? 0
                  : aggregateRating / checkinCount;
            }
            return dumpling;
          });

          newDumplingMap[restaurant].dumplings = newDumplings;
        });
      });

      commit('setDumplings', newDumplingMap);
    },

    fetchMoreCheckins({ commit, state }) {
      if (!state.oldestCheckin) {
        return;
      }

      commit('setLoadingMoreCheckins', true);

      checkinsCollection
        .orderBy('createdOn', 'desc')
        .limit(checkinsPerPage)
        .startAfter(state.oldestCheckin)
        .get()
        .then(querySnapshot => {
          const incomingCheckinCount = querySnapshot.docs.length;
          const nextCheckins = mapSnapshotToCheckins(querySnapshot);
          const newCheckins = state.checkins.concat(nextCheckins);
          const oldestCheckin = querySnapshot.docs[incomingCheckinCount - 1];
          commit(
            'setDisplayedCheckinCount',
            state.displayedCheckinCount + querySnapshot.docs.length,
          );
          commit('setLoadingMoreCheckins', false);
          commit('setCheckins', newCheckins);
          commit('setOldestCheckin', oldestCheckin);
        });
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
      commit('setCurrentRoute', null);
      document.body.classList.remove('fixed-scroll');
    },
    incrementDisplayedCheckinCount({ commit, state }) {
      commit('setDisplayedCheckinCount', state.displayedCheckinCount + 1);
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
      if (!state.checkinsLoaded) {
        state.checkinsLoaded = true;
      }
    },
    setUserCheckins(state, val) {
      state.userCheckins = val;
    },
    setCheckinCount(state, val) {
      state.checkinCount = val;
    },
    setDisplayedCheckinCount(state, val) {
      state.displayedCheckinCount = val;
    },
    setHiddenCheckins(state, val) {
      if (!val) {
        state.hiddenCheckins = [];
        return;
      }

      // Prevent adding dupes.
      if (!state.hiddenCheckins.some(x => x.id === val.id)) {
        state.hiddenCheckins.unshift(val);
      }
    },
    setOldestCheckin(state, val) {
      state.oldestCheckin = val;
    },
    setDumplings(state, val) {
      state.dumplings = val;
    },
    setDumplingsLoaded(state, val) {
      state.dumplingsLoaded = val;
    },
    setLoggingDumpling(state, val) {
      state.loggingDumpling = val;
    },
    setCommenting(state, val) {
      state.commenting = val;
    },
    setCommentMap(state, val) {
      state.commentMap = val;
    },
    setStars(state, val) {
      state.starsMap = val;
    },
    setCurrentRoute(state, val) {
      state.currentRoute = val;
    },
    setLoadingMoreCheckins(state, val) {
      state.loadingMoreCheckins = val;
    },
  },
});

auth.onAuthStateChanged(user => {
  if (!user) {
    return;
  }

  store.commit('setCurrentUser', user);
  store.dispatch('fetchUserProfile');

  metaCollection
    .doc('counters')
    .get()
    .then(querySnapshot => {
      if (!querySnapshot.exists) {
        return;
      }

      const { checkinCount } = querySnapshot.data();
      store.commit('setCheckinCount', checkinCount);
    });

  checkinsCollection
    .orderBy('createdOn', 'desc')
    .where('year', '==', 2021)
    .limit(checkinsPerPage)
    .get()
    .then(querySnapshot => {
      const hasDocs = querySnapshot.docs.length > 0;
      const initialCheckins = hasDocs ? mapSnapshotToCheckins(querySnapshot) : [];
      const latestCheckin = querySnapshot.docs[0];
      let watcherQueryRef = checkinsCollection.orderBy('createdOn', 'desc');

      store.commit('setCheckins', initialCheckins);

      if (hasDocs) {
        watcherQueryRef = watcherQueryRef.endBefore(latestCheckin);

        const oldestCheckin = querySnapshot.docs[querySnapshot.docs.length - 1];
        store.commit('setOldestCheckin', oldestCheckin);
      }

      watcherQueryRef.onSnapshot(newSnapshot => {
        const docChanges = newSnapshot.docChanges();

        if (newSnapshot.docs.length === 0 || docChanges[0].type !== 'added') {
          return;
        }

        const newDoc = docChanges[0].doc;

        // Check if the checkin is created by the current user.
        const createdByCurrentUser = user.uid === newDoc.data().uid;
        const newCheckin = { ...newDoc.data(), id: newDoc.id };
        if (createdByCurrentUser) {
          let newCheckins = store.state.checkins;
          if (store.state.hiddenCheckins.length) {
            newCheckins = store.state.hiddenCheckins.concat(newCheckins);
          }
          newCheckins.unshift(newCheckin);
          store.commit('setCheckins', newCheckins);
          store.commit('setHiddenCheckins');
        } else {
          store.commit('setHiddenCheckins', newCheckin);
        }
      });
    });

  checkinsCollection
    .orderBy('createdOn', 'desc')
    .where('uid', '==', user.uid)
    .onSnapshot(querySnapshot => {
      const userCheckins = mapSnapshotToCheckins(querySnapshot);
      store.commit('setUserCheckins', userCheckins);
    });

  commentsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
    const commentMap = {};

    querySnapshot.forEach(doc => {
      const { checkin, ...rest } = doc.data();
      const commentData = { ...rest, id: doc.id };

      if (commentMap[checkin]) {
        commentMap[checkin].push(commentData);
      } else {
        commentMap[checkin] = [commentData];
      }
    });

    store.commit('setCommentMap', commentMap);
  });

  starsCollection.where('uid', '==', user.uid).onSnapshot(querySnapshot => {
    const starsMap = {};
    querySnapshot.forEach(doc => {
      const { restaurant } = doc.data();
      starsMap[restaurant] = doc.id;
    });
    store.commit('setStars', starsMap);
  });
});

export default store;
