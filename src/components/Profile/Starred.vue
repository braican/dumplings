<template>
  <div class="stars">
    <p class="messaging">
      The list of dumplings that you're hoping to try during Dumpling Week:
    </p>
    <ul v-if="starredData.length" class="starred-list">
      <li v-for="starred in starredData" :key="starred.restaurantId">
        <RestaurantListing :restaurant="starred" light />
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
import RestaurantListing from '@/components/RestaurantListing';

export default {
  name: 'UserStars',
  components: { RestaurantListing },
  computed: {
    ...mapGetters(['starredData']),
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.messaging {
  margin-top: $spacing;
}

.starred-list {
  margin-top: $spacing;
}

</style>

