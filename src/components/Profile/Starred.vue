<template>
  <div class="stars">
    <p class="starred-status">
      You've had <span>{{ userHadStarsCount }}</span> of your <span>{{ starsCount }}</span> starred dumplings
    </p>

    <ul v-if="starsCount" class="starred-list">
      <li v-for="starred in starredRestaurants" :key="starred.restaurantId">
        <DumplingListing :restaurant="starred" light />
      </li>
    </ul>

    <div v-else>
      <p class="messaging">
        You haven't starred any dumplings yet.
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DumplingListing from '@/components/DumplingListing';

export default {
  name: 'UserStars',
  components: { DumplingListing },
  computed: {
    ...mapGetters(['starredRestaurants', 'starsCount', 'userHadStarsCount']),
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.starred-status {
  margin-top: $spacing;
  font-weight: $fw--bold;

  span {
    color: $c--primary;
  }
}

.starred-list {
  margin-top: $spacing;
}

</style>

