<template>
  <div class="dumplings">
    <h2 class="section-header page-header">
      The Dumplings of Dumpling Week
    </h2>

    <ul v-if="Object.keys(dumplings).length">
      <li v-for="(entry, restaurantId) in dumplings" :key="restaurantId">
        <RestaurantListing :restaurant="entry" />
      </li>
    </ul>

    <div v-else>
      <p>No dumplings have been added to the database!</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import RestaurantListing from '@/components/RestaurantListing';

export default {
  name: 'Dumplings',
  components: { RestaurantListing },
  computed: {
    ...mapState(['dumplings']),
  },
};
</script>


