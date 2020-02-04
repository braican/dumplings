<template>
  <div class="user">
    <div class="header">
      <div v-if="checkinsLoaded" class="headshot">
        <img :src="userProfile.photoURL" :alt="`Avatar for ${userProfile.displayName}`">
      </div>
      <h2 class="section-header section-header--color">
        {{ userProfile.displayName }}
      </h2>
    </div>

    <button class="logout meta-info" @click="logout">
      Log out
    </button>

    <div v-if="checkinsLoaded">
      <Overview class="section" @updateView="newView => view = newView" />

      <ul class="profile-nav section">
        <li>
          <button :class="['profile-nav-button', view === 'activity' && 'profile-nav-button--active']" @click="view = 'activity'">
            Activity
          </button>
        </li>
        <li>
          <button :class="['profile-nav-button', view === 'starred' && 'profile-nav-button--active']" @click="view = 'starred'">
            Starred
          </button>
        </li>
      </ul>

      <Activity v-if="view === 'activity'" />
      <Starred v-if="view === 'starred'" />
    </div>

    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { auth } from '@/firebase';
import Overview from '@/components/Profile/Overview';
import Activity from '@/components/Profile/Activity';
import Starred from '@/components/Profile/Starred';

export default {
  name: 'User',
  components: { Overview, Activity, Starred },
  data() {
    return {
      view: 'activity',
    };
  },
  computed: {
    ...mapState(['userProfile', 'checkinsLoaded']),
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

.section {
  margin-top: $spacing;
}

.profile-nav li {
  display: inline-block;

  + li {
    margin-left: $spacing--sm;
  }
}

.profile-nav-button {
  font-family: $ff--headline;
  opacity: .2;

  &:focus {
    outline: none;
    color: $c--primary;
  }

  &--active {
    opacity: 1;
    font-size: $fz--lg;
  }
}

</style>
