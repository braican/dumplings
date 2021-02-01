<template>
  <div class="restaurant">
    <header :class="['header', light && 'header--light']">
      <h6 class="section-header">
        {{ restaurant.name }}
      </h6>
      <p class="meta-info restaurant__address">
        <ul v-if="restaurant.locations && restaurant.locations.length > 1">
          <li v-for="loc in restaurant.locations" :key="loc.address">
            {{ loc.address }}
          </li>
        </ul>

        <span v-else>{{ restaurant.address }}</span>
      </p>

      <div v-if="!light && checkins.length > 0" class="indicators indicator--had">
        <DumplingIcon theme="red_fill" />

        <p class="label">
          Had it
        </p>
      </div>

      <button
        v-else-if="!light"
        :class="['indicator--star', 'indicators', isStarred && 'indicator--star--starred']"
        type="button"
        @click="starRestaurant"
      >
        <StarIcon />
        <p v-if="isStarred" class="label">
          Want it
        </p>
      </button>
    </header>

    <button class="about-button" @click="expandDumplings">
      <p class="about-button-label">
        The dumpling
        <span v-if="restaurant.dumplings.length > 1">({{ restaurant.dumplings.length }} options)</span>
        <ExpandIcon :expanded="expanded" />
      </p>
      <p v-if="restaurant.dumplings.length === 1 && restaurant.dumplings[0].checkinCount !== undefined" class="dumpling-data">
        <span v-if="restaurant.dumplings[0].checkinCount > 0" class="avg-rating">{{ restaurant.dumplings[0].avgRating.toFixed(1) }} avg</span>
        <span v-if="restaurant.dumplings[0].checkinCount > 0">&nbsp;/&nbsp;</span>
        <span>{{ restaurant.dumplings[0].checkinCount }} checkin{{ restaurant.dumplings[0].checkinCount === 1 ? '' : 's' }}</span>
      </p>
      <p v-else>
        &nbsp;
      </p>
    </button>

    <ul v-show="expanded">
      <li
        v-for="dumpling in restaurant.dumplings"
        :key="dumpling.id"
        class="dumpling-description"
      >
        <p>{{ dumpling.description }}</p>
        <p v-if="restaurant.dumplings.length > 1 && dumpling.checkinCount !== undefined" class="dumpling-data">
          <span v-if="dumpling.checkinCount > 0" class="avg-rating">{{ dumpling.avgRating.toFixed(1) }} avg</span>
          <span v-if="dumpling.checkinCount > 0">&nbsp;/&nbsp;</span>
          <span>{{ dumpling.checkinCount }} checkin{{ dumpling.checkinCount === 1 ? '' : 's' }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { starsCollection } from '@/firebase';
import ExpandIcon from '@/components/ExpandIcon';
import StarIcon from '@/svg/iconStar';
import DumplingIcon from '@/svg/dumplings';

export default {
  name: 'DumplingListing',
  components: { ExpandIcon, StarIcon, DumplingIcon },
  props: {
    restaurant: {
      required: true,
      type: Object,
    },
    light: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    ...mapState(['currentUser']),
    isStarred() {
      return this.$store.getters.isStarred(this.restaurant.id);
    },
    checkins() {
      return this.$store.getters.userCheckinsByRestaurant(this.restaurant.id);
    },
  },
  methods: {
    expandDumplings() {
      this.expanded = !this.expanded;
    },
    starRestaurant() {
      if (this.isStarred) {
        starsCollection.doc(this.isStarred).delete();
      } else {
        starsCollection.add({ uid: this.currentUser.uid, restaurant: this.restaurant.id, year: 2021 });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.restaurant {
  padding-top: $spacing;
  padding-bottom: $spacing;
  border-bottom: 2px solid $c--gray-e;
}

.header {
  position: relative;
  padding-right: 88px;

  &--light {
    padding-right: 0;
  }
}

.restaurant__address {
  margin-top: .5em;

  li + li {
    margin-top: .5rem;
  }
}

.indicators {
  position: absolute;
  top: 0;
  right: 0;
  width: 72px;
  text-align: center;
}

.indicator--had svg {
  width: 20px;
}

.indicator--star {
  svg {
    width: 28px;
    fill: none;
    stroke-width: 1px;
    stroke: $c--gray-9;
  }

  &--starred svg {
    fill: $c--yellow;
    stroke: $c--yellow;
  }
}

.avg-rating {
  font-weight: $fw--bold;
  color: $c--primary;
}

.about-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: .5em;
  padding-bottom: .5em;
  text-align: left;

  &:focus {
    outline: none;

    .about-button-label {
      color: $c--primary;
    }
  }

  .dumpling-data {
    margin-left: .5em;
  }
}

.about-button-label {
  font-size: $fz--sm;
}

.dumpling-description {
  .dumpling-data {
    margin-top: .5em;
  }

  + .dumpling-description{
    position: relative;
    margin-top: $spacing--sm;
    padding-top: $spacing--sm;

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 20%;
      border-top: 2px solid $c--gray-e;
    }
  }
}

</style>
