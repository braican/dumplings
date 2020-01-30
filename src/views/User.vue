<template>
  <div class="user">
    <div class="header">
      <div class="headshot">
        <img :src="userProfile.photoURL" :alt="`Avatar for ${userProfile.displayName}`">
      </div>
      <h2 class="section-header section-header--color">
        {{ userProfile.displayName }}
      </h2>
    </div>

    <div class="utility">
      <ul>
        <li>
          <button @click="logout">
            Log out
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { auth } from '@/firebase';

export default {
  name: 'User',
  computed: {
    ...mapState(['userProfile']),
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$store.dispatch('logout');
        this.$router.replace('/');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/abstracts';

.header {
  display: flex;
  align-items: center;
}
.headshot {
  width: 80px;
  height: 80px;
  border-radius: 100%;
  overflow: hidden;
  margin-right: $spacing--sm;

  img {
    width: 100%;
    display: block;
  }
}

.utility {
  margin-top: $spacing--sm;
}
</style>
