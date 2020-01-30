<template>
  <div class="feed">
    <h1>The feed of dumplings</h1>

    <ul v-if="checkins.length">
      <li v-for="checkin in checkins" :key="checkin.id">
        checkin here
      </li>
    </ul>

    <div v-else>
      <p>Nobody has eaten any dumplings.</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Feed',
  computed: {
    ...mapState(['checkins']),
  },
};
</script>
