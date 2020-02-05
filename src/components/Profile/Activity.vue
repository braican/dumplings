<template>
  <div class="activity">
    <ul v-if="userCheckins.length" class="user-checkins">
      <li v-for="checkin in userCheckins" :key="checkin.id">
        <Checkin :checkin="checkin" light />
      </li>
    </ul>

    <div v-else>
      <p class="messaging">
        You haven't eaten any dumplings yet.
        <span
          class="emoji"
          role="img"
          aria-label="sad face"
        >😢</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Checkin from '@/components/Checkin/Checkin';

export default {
  name: 'UserActivity',
  components: { Checkin },
  computed: {
    ...mapState(['userCheckins']),
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.user-checkins li:last-child > div:after {
  content: none;
}

.emoji {
  font-size: 32px;
}

.messaging {
  margin-top: $spacing;
}

</style>

