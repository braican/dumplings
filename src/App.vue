<template>
  <div id="app">
    <AppHeader v-if="currentUser !== null" />

    <router-view />

    <AppNav v-if="currentUser !== null" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppHeader from '@/components/AppHeader';
import AppNav from '@/components/AppNav';

export default {
  name: 'App',
  components: { AppHeader, AppNav },
  computed: {
    ...mapState(['currentUser']),
  },
};
</script>

