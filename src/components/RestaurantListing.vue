<template>
  <div class="restaurant">
    <header :class="['header', light && 'header--light']">
      <h6 class="section-header">
        {{ restaurant.name }}
      </h6>
      <p class="meta-info restaurant__address">
        {{ restaurant.address }}
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
      The dumpling

      <span v-if="restaurant.dumplings.length > 1">({{ restaurant.dumplings.length }} options)</span>

      <ExpandIcon :expanded="expanded" />
    </button>

    <ul v-show="expanded">
      <li
        v-for="dumpling in restaurant.dumplings"
        :key="dumpling.id"
        class="dumpling-description"
      >
        <p>{{ dumpling.description }}</p>
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
  name: 'RestaurantListing',
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
        starsCollection.add({ uid: this.currentUser.uid, restaurant: this.restaurant.id });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.restaurant {
  margin-top: $spacing;
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
}

.indicators {
  position: absolute;
  top: 0;
  right: 0;
  width: 72px;
  text-align: center;
}

.indicator--had svg {
  width: 24px;
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




.about-button {
  font-size: $fz--sm;
  padding-top: .5em;
  padding-bottom: .5em;

  &:focus {
    outline: none;
    color: $c--primary;
  }
}

.dumpling-description {
  margin-top: .5rem;
}

</style>
