<template>
  <div class="restaurant">
    <h6 class="restaurant__name">
      {{ restaurant.name }}
    </h6>
    <p class="restaurant__address">
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
@import '../styles/abstracts';

.restaurant {
  margin-bottom: $spacing;
}

.restaurant__name {
  font-family: $ff--headline;
  font-size: $fz--lg;
  line-height: $lh--sm;
}
.restaurant__address {
  margin-top: .5em;
  margin-bottom: 1em;
  font-size: $fz--sm;
  color: $c--gray-9;
}

</style>
