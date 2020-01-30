<template>
  <div
    id="app"
    :class="[loggingDumpling && 'logging-dumpling', 'app-frame']"
  >
    <AppHeader v-if="isAuth" />

    <main :class="['main', isAuth && 'main--logged-in']">
      <router-view />
    </main>

    <AppNav v-if="isAuth" />

    <LogDumpling v-if="isAuth && loggingDumpling" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppHeader from '@/components/AppHeader';
import AppNav from '@/components/AppNav';
import LogDumpling from '@/components/LogDumpling';

export default {
  name: 'App',
  components: { AppHeader, AppNav, LogDumpling },
  computed: {
    ...mapState(['currentUser', 'loggingDumpling']),
    isAuth() {
      return this.currentUser !== null;
    },
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
