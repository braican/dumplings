<template>
  <div class="activity">
    <h2 class="section-header">
      Activity
    </h2>

    <ul v-if="userCheckins.length">
      <li v-for="checkin in userCheckins" :key="checkin.id">
        <Checkin :checkin="checkin" light />
      </li>
    </ul>

    <div v-else>
      <p>Nobody has eaten any dumplings.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Checkin from '@/components/Checkin/Checkin';

export default {
  name: 'UserActivity',
  components: { Checkin },
  computed: {
    ...mapGetters(['userCheckins']),
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.activity {
  margin-top: $spacing;
}
</style>

