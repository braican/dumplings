<template>
  <div class="dashboard">
    <h1>This is only shown to logged in users</h1>
    <button @click="logout">
      Log out
    </button>
  </div>
</template>

<script>
import { auth } from '@/firebase';

export default {
  name: 'Dashboard',
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.replace('/');
      });
    },
  },
};
</script>
