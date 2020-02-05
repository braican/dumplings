<template>
  <div :class="['checkin', commenting === checkin.id && 'checkin--commenting', commenting && commenting !== checkin.id && 'checkin--dimmed', highlighted && 'checkin--highlighted']">
    <div class="meta">
      <div v-if="!light" class="avatar">
        <img :src="checkin.photo" :alt="`Avatar for ${checkin.userName}`">
      </div>

      <p v-if="!light" class="user-name">
        {{ checkin.userName }}
      </p>
      <p class="timestamp">
        {{ checkin.createdOn | formatDate }}
      </p>
    </div>

    <div class="restaurant">
      <button class="expand-button" @click="() => expanded = !expanded">
        <span class="restaurant__name">{{ checkin.restaurant }}</span>&nbsp;&nbsp;

        <ExpandIcon
          :expanded="expanded"
          collapsed-label="The dumpling"
          expanded-label="The dumpling"
        />
      </button>

      <p v-if="expanded" class="dumpling__description">
        <strong class="label label--top">Description</strong>
        {{ checkin.description }}
      </p>
    </div>

    <p class="note">
      {{ checkin.note }}
    </p>

    <Rating :rating="checkin.rating" />
    <Comments :checkin="checkin.id" :commenting="commenting === checkin.id" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Rating from './Rating';
import Comments from './Comments';
import ExpandIcon from '@/components/ExpandIcon';

export default {
  name: 'Checkin',
  components: { Rating, Comments, ExpandIcon },
  props: {
    checkin: {
      type: Object,
      required: true,
    },
    highlighted: {
      type: Boolean,
      default: false,
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
    ...mapState(['commenting']),
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.checkin {
  transition: background-color .6s ease-in-out, opacity .2s ease-in-out;
  background-color: $c--white;
  position: relative;
  padding: $spacing $spacing $spacing * 1.5;
  margin-left: -$spacing;
  margin-right: -$spacing;
  border-radius: 6px;

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: $spacing;
    right: $spacing;
    bottom: 0;
    height: 6px;
    background-color: $c--gray-e;
  }

  &--highlighted {
    background-color: $c--highlight;
  }

  &--dimmed {
    opacity: 0.2;
  }
}

.meta {
  display: flex;
  align-items: center;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 100%;
  overflow: hidden;

  img {
    width: 100%;
    display: block;
  }
}

.user-name {
  flex: 1;
  margin-right: $spacing--sm;
  margin-left: 8px;
}

.timestamp {
  color: $c--gray-9;
  font-size: $fz--xs;
}

.restaurant {
  margin-top: $spacing--sm;
  margin-bottom: $spacing--sm;
}

.restaurant__name {
  font-family: $ff--headline;
  display: inline-block;
  vertical-align: middle;
}

.expand-button {
  text-align: left;

  &:focus {
    outline: none;
  }
}

.dumpling__description {
  padding: $spacing--sm;
  background-color: $c--gray-f;
  margin-top: 8px;
  color: $c--gray-6;
  font-size: $fz--sm;
}

</style>

