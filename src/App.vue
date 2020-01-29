<template>
  <div id="app">
    <AppHeader v-if="currentUser !== null" />
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppHeader from '@/components/AppHeader';

export default {
  name: 'App',
  components: { AppHeader },
  computed: {
    ...mapState(['currentUser']),
  },
};
</script>

