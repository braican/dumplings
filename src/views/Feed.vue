<template>
  <div class="feed">
    <h2 class="headline">The dumpling action</h2>
    <div v-if="checkinsLoaded">
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
    ...mapState(['checkins', 'checkinsLoaded']),
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/abstracts';

.headline {
  font-family: $ff--headline;
  position: relative;
  padding-bottom: $spacing--sm;
  margin-bottom: $spacing--sm;

  &:after {
    content: '';
    display: block;
    width: 33%;
    position: absolute;
    left: 0;
    bottom: 0;
    border-top: 2px solid $c--primary;
  }
}
</style>
