<template>
  <div class="restaurant">
    <h6 class="section-header">
      {{ restaurant.name }}
    </h6>
    <p class="meta-info restaurant__address">
      {{ restaurant.address }}
    </p>

    <!-- <button @click="expandDumplings">
      About the dumpling
    </button> -->

    <ul v-show="expanded">
      <li v-for="dumpling in restaurant.dumplings" :key="dumpling.id">
        <p>{{ dumpling.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RestaurantListing',
  props: {
    restaurant: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      expanded: true,
    };
  },
  methods: {
    expandDumplings() {
      this.expanded = !this.expanded;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.restaurant {
  margin-bottom: $spacing;
}

.restaurant__address {
  margin-top: .5em;
  margin-bottom: $spacing--sm;
}

</style>
