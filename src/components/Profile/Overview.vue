<template>
  <div class="overview">
    <h2 class="section-header">
      Dumpling Overview
    </h2>

    <div class="stats">
      <div class="stat">
        <p class="data">
          {{ checkinCount }}
        </p>
        <p class="label">
          Dumplings checked in
        </p>
      </div>
      <div class="stat">
        <p class="data">
          {{ averageRating }}
        </p>
        <p class="label">
          Average rating
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserOverview',
  computed: {
    ...mapGetters(['userCheckins']),
    checkinCount() {
      return this.userCheckins.length;
    },
    averageRating() {
      const ratingsTotal = this.userCheckins.reduce((prev, checkin) => prev + checkin.rating, 0);
      const fullAverage = ratingsTotal / this.checkinCount;
      return Math.round(fullAverage * 100) / 100;
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

  .stat {
    padding: $spacing--sm;
    flex: 1;
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

