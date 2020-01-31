<template>
  <div class="feed">
    <h2 class="section-header page-header">
      All the dumpling action
    </h2>
    <div v-if="checkinsLoaded">
      <button
        v-if="hiddenCheckins.length"
        class="button button--gray show-hidden-posts-button"
        @click="showHiddenCheckins"
      >
        Click to show {{ hiddenCheckins.length }} new checkin{{ hiddenCheckins.length > 1 ? 's' : '' }}
      </button>
      <ul v-if="checkins.length" class="feed">
        <li v-for="(checkin, index) in checkins" :key="checkin.id">
          <Checkin :checkin="checkin" :highlighted="index < highlightedCheckins" />
        </li>
      </ul>

      <div v-else>
        <p>Nobody has eaten any dumplings.</p>
      </div>
    </div>

    <div v-else class="loading">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Checkin from '@/components/Checkin/Checkin';

export default {
  name: 'Feed',
  components: { Checkin },
  data() {
    return {
      highlightedCheckins: 0,
    };
  },
  computed: {
    ...mapState(['checkins', 'checkinsLoaded', 'hiddenCheckins']),
  },
  methods: {
    showHiddenCheckins() {
      const newCheckinsArray = this.hiddenCheckins.concat(this.checkins);

      this.highlightedCheckins = this.hiddenCheckins.length;
      this.$store.commit('setHiddenCheckins', null);
      this.$store.commit('setCheckins', newCheckinsArray);

      setTimeout(() => {
        this.highlightedCheckins = 0;
      }, 30);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.feed > li:last-child > div:after {
  content: none;
}

.show-hidden-posts-button {
  width: 100%;
  text-align: center;
  margin-top: $spacing--sm;
}

.loading {
  margin-top: $spacing;
}

</style>
