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

    <button class="logout meta-info" @click="logout">
      Log out
    </button>

    <Overview />

    <Activity />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { auth } from '@/firebase';
import Overview from '@/components/Profile/Overview';
import Activity from '@/components/Profile/Activity';

export default {
  name: 'User',
  components: { Overview, Activity },
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
@import '@/styles/_abstracts.scss';

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

.logout {
  position: absolute;
  top: $spacing--sm;
  right: $spacing--sm;
}
</style>
