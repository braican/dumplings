<template>
  <button class="button button--big" @click="login">
    Log in
  </button>
</template>

<script>
import { auth, authProvider } from '@/firebase';

export default {
  name: 'LoginButton',
  methods: {
    login() {
      auth.signInWithPopup(authProvider)
        .then(() => this.$router.push('/feed'))
        .catch(err => console.error(err));
    },
  },
};
</script>