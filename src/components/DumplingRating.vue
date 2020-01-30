<template>
  <div class="dumpling-rating">
    <h6 class="restaurant__name">
      {{ restaurantName }}
    </h6>
    <p>{{ dumpling.description }}</p>

    <p class="your-rating">
      <span class="label">Your rating:</span>&nbsp;&nbsp;<span class="rating">{{ rating }}</span>

      <span
        v-for="n in rating"
        :key="n"
        class="dumpling-icon"
      >
        <DumplingIcon />
      </span>
    </p>

    <input
      v-model.number="rating"
      type="range"
      min="1"
      max="5"
      value="0"
      class="rating-input"
    >
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DumplingIcon from '@/svg/dumplings';

export default {
  name: 'DumplingRating',
  components: { DumplingIcon },
  props: {
    dumpling: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rating: 1,
    };
  },
  computed: {
    ...mapState(['dumplings']),
    restaurantName() {
      const restaurantId = this.dumpling.restaurant;
      if (!this.dumplings[restaurantId]) {
        return '';
      }

      return this.dumplings[restaurantId].name;
    },
  },
  watch: {
    rating() {
      this.$emit('input', this.rating);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/abstracts';

.restaurant__name {
  font-family: $ff--headline;
  margin-bottom: .5em;
}

.rating-input {
  width: 98%;
}

.your-rating {
  margin-top: $spacing;
  margin-bottom: $spacing--sm;
  display: flex;
  align-items: center;

  .label {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: $fw--bold;
    color: $c--gray-9;
    font-size: $fz--xs;
  }

  .rating {
    font-size: $fz--lg;
    font-family: $ff--headline;
    color: $c--primary;
    flex: 1;
  }
}

.dumpling-icon {
  display: inline-block;
  width: 20px;
  margin-left: 4px;

  svg {
    display: block;
    width: 100%;
  }
}

</style>
