<template>
  <div id="app">
    <AppHeader v-if="currentUser !== null" />

    <main :class="['main', currentUser !== null && 'main--logged-in']">
      <router-view />
    </main>

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

<style lang="scss" scoped>
@import './styles/abstracts';

.main {
  display: block;

  &--logged-in {
    padding: $spacing;
  }
}
</style>
