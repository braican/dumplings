<template>
  <button class="button" @click="login">
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
        .then(({ user }) => {
          this.$store.commit('setCurrentUser', user);
          this.$store.dispatch('fetchUserProfile');
          this.$router.push('/dashboard');
        })
        .catch(err => console.error(err));
    },
  },
};
</script>