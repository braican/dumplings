<template>
  <div class="dumplings">
    <h2 class="section-header page-header">
      The Dumplings of Dumpling Week
    </h2>

    <ul v-if="Object.keys(dumplings).length" class="dumpling-list">
      <li v-for="(entry, restaurantId) in dumplings" :key="restaurantId">
        <DumplingListing :restaurant="{...entry, id: restaurantId}" />
      </li>
    </ul>

    <div v-else>
      <p>No dumplings have been added to the database!</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DumplingListing from '@/components/DumplingListing';

export default {
  name: 'Dumplings',
  components: { DumplingListing },
  computed: {
    ...mapState(['dumplings', 'dumplingsLoaded']),
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

.dumpling-list {
  margin-top: $spacing * 2;
}
</style>

