import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './filters';
import { auth } from './firebase';
import { mapsApiKey } from './config';

import './styles/globals.scss';

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: mapsApiKey,
  },
});

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      created() {
        store.dispatch('fetchDumplings');
      },
      render: h => h(App),
    }).$mount('#app');
  }
});
