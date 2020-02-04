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
      <div class="stat">
        <p class="data">
          {{ userRestaurantCount }}
        </p>
        <p class="label">
          Of {{ Object.keys(dumplings).length }} restaurants
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'UserOverview',
  computed: {
    ...mapGetters(['starsCount', 'userRestaurantCount']),
    ...mapState(['userProfile', 'userCheckins', 'dumplings']),
    checkinCount() {
      return this.userCheckins.length;
    },
    averageRating() {
      if (this.userCheckins.length === 0) {
        return 0;
      }

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
  width: 100%;
  text-align: left;
  margin-top: $spacing;

  .stat {
    display: flex;
    align-items: center;
    margin-top: .5rem;

    &:focus {
      outline: none;
    }
  }

  .label {
    font-size: $fz--sm;
    font-weight: $fw--bold;
    margin-left: $spacing--sm;
  }

  .data {
    color: $c--primary;
    font-family: $ff--headline;
    font-size: $fz--xl;
  }
}
</style>

