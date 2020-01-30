<template>
  <div class="feed">
    <h2 class="section-header page-header">
      All the dumpling action
    </h2>
    <div v-if="checkinsLoaded">
      <button
        v-if="hiddenCheckins.length"
        class="show-hidden-posts-button"
        @click="showHiddenCheckins"
      >
        Click to show {{ hiddenCheckins.length }} new checkin{{ hiddenCheckins.length > 1 ? 's' : '' }}
      </button>
      <ul v-if="checkins.length">
        <li v-for="checkin in checkins" :key="checkin.id">
          <Checkin :checkin="checkin" />
        </li>
      </ul>

      <div v-else>
        <p>Nobody has eaten any dumplings.</p>
      </div>
    </div>

    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Checkin from '@/components/Checkin';

export default {
  name: 'Feed',
  components: { Checkin },
  computed: {
    ...mapState(['checkins', 'checkinsLoaded', 'hiddenCheckins']),
  },
  methods: {
    showHiddenCheckins() {
      const newCheckinsArray = this.hiddenCheckins.concat(this.checkins);
      const newCheckinsCount = this.hiddenCheckins.length;
      console.log(newCheckinsCount);

      this.$store.commit('setHiddenCheckins', null);
      this.$store.commit('setCheckins', newCheckinsArray);
    },
  },
};
</script>
