<template>
  <div class="overview">
    <h2 class="section-header">
      Dumpling Overview
    </h2>

    <div class="stats">
      <button class="stat" @click="$emit('updateView', 'activity')">
        <p class="data">
          {{ checkinCount }}
        </p>
        <p class="label">
          Dumplings eaten
        </p>
      </button>
      <div class="stat">
        <p class="data">
          {{ averageRating }}
        </p>
        <p class="label">
          Average rating
        </p>
      </div>
      <button class="stat" @click="$emit('updateView', 'starred')">
        <p class="data">
          {{ starsCount }}
        </p>
        <p class="label">
          Starred dumplings
        </p>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserOverview',
  computed: {
    ...mapGetters(['userCheckins', 'starsCount']),
    checkinCount() {
      return this.userCheckins.length;
    },
    averageRating() {
      const ratingsTotal = this.userCheckins.reduce((prev, checkin) => prev + checkin.rating, 0);
      const fullAverage = ratingsTotal / this.checkinCount;
      return (Math.round(fullAverage * 100) / 100).toFixed(1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.overview {
  margin-top: $spacing;
}

.stats {
  display: flex;
  text-align: center;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: $spacing--sm;

  .stat {
    padding: $spacing--sm;
    flex: 1;

    &:focus {
      outline: none;
    }
  }

  .label {
    font-size: $fz--sm;
    font-weight: $fw--bold;
  }

  .data {
    color: $c--primary;
    font-family: $ff--headline;
    font-size: $fz--xl;
  }
}
</style>

