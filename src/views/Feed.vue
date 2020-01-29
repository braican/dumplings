<template>
  <div class="feed">
    <h1>The feed of dumplings</h1>
    <button @click="logout">
      Log out
    </button>
  </div>
</template>

<script>
import { auth } from '@/firebase';

export default {
  name: 'Feed',
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.replace('/');
      });
    },
  },
};
</script>
