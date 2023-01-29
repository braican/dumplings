<template>
  <div class="dumplings">
    <h2 class="section-header page-header">
      The Dumplings of Dumpling Week
    </h2>

    <p class="small-stats">
      You've been to {{ userRestaurantCount }} of {{ Object.keys(dumplings).length }} restaurants
    </p>

    <ul v-if="Object.keys(dumplings).length" class="dumpling-list">
      <li v-for="entry in dumplings" :key="entry.id">
        <DumplingListing :restaurant="entry" />
      </li>
    </ul>

    <div v-else>
      <p>No dumplings have been added to the database!</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import DumplingListing from '@/components/DumplingListing';

export default {
  name: 'Dumplings',
  components: { DumplingListing },
  computed: {
    ...mapState(['dumplings', 'dumplingsLoaded']),
    ...mapGetters(['userRestaurantCount']),
  },
  watch: {
    dumplingsLoaded: {
      handler(value) {
        if (value === true) {
          this.$store.dispatch('fetchDumplingRatings');
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.small-stats {
  font-weight: $fw--bold;
  color: $c--primary;
  margin-top: $spacing;
}

.dumpling-list {
  margin-top: $spacing;
}
</style>
