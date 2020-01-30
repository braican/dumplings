<template>
  <div class="user">
    <img :src="userProfile.photoURL" :alt="`Avatar for ${userProfile.displayName}`">
    <h2>{{ userProfile.displayName }}</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'User',
  computed: {
    ...mapState(['userProfile']),
  },
};
</script>


