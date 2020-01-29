<template>
  <div class="dumplings">
    <h1>The list of dumplings</h1>
    <button @click="logout">
      Log out
    </button>
  </div>
</template>

<script>
import { auth } from '@/firebase';

export default {
  name: 'Dumplings',
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.replace('/');
      });
    },
  },
};
</script>
