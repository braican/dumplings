<template>
  <div :class="['checkin', commenting && 'checkin--commenting']">
    <div class="meta">
      <div class="avatar">
        <img :src="checkin.photo" :alt="`Avatar for ${checkin.userName}`">
      </div>

      <p class="user-name">
        {{ checkin.userName }}
      </p>
      <p class="timestamp">
        {{ checkin.createdOn | formatDate }}
      </p>
    </div>

    <div class="restaurant">
      <button class="expand-button" @click="() => expanded = !expanded">
        <span class="restaurant__name">{{ checkin.restaurant }}</span>

        <span :class="['expand-icon', expanded && 'expand-icon--expanded']" />
      </button>

      <p v-if="expanded" class="dumpling__description">
        <strong>Description</strong>
        {{ checkin.description }}
      </p>
    </div>

    <p class="note">
      {{ checkin.note }}
    </p>

    <Rating :rating="checkin.rating" />

    <Comments @openCommentForm="openCommentForm" />
  </div>
</template>

<script>
import moment from 'moment';
import Rating from './Rating';
import Comments from './Comments';


export default {
  name: 'Checkin',
  components: { Rating, Comments },
  filters: {
    formatDate(val) {
      if (!val) {
        return '-';
      }
      const date = val.toDate();
      return moment(date).fromNow();
    },
  },
  props: {
    checkin: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      expanded: false,
      commenting: false,
    };
  },
  methods: {
    openCommentForm() {
      console.log('test');

      this.commenting = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.checkin {
  position: relative;
  padding: $spacing;
  margin-left: -$spacing;
  margin-right: -$spacing;

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: $spacing;
    right: $spacing;
    bottom: 0;
    height: 1px;
    background-color: $c--gray-e;
  }

  &--commenting {
    background-color: $c--gray-f;

    &:after {
      content: none;
    }
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

  .expand-button:focus {
    outline: none;
  }

  .restaurant__name {
    font-family: $ff--headline;
    display: inline-block;
    vertical-align: middle;
  }

  .expand-icon {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 8px;
    margin-left: $spacing--sm;

    &:after,
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: $c--black;
      left: 0;
      top: 50%;
      border-radius: 4px;
      margin-top: -2px;
    }

    &:after {
      @include transition(transform);
      transform-origin: center;
      transform: rotate(90deg);
    }

    &--expanded:after {
      transform: rotate(0deg);
    }

    svg {
      display: block;
      width: 100%;
    }
  }
}

.dumpling__description {
  padding: $spacing--sm;
  background-color: $c--gray-f;
  margin-top: 8px;
  color: $c--gray-6;
  font-size: $fz--sm;

  strong {
    display: block;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: $fw--bold;
    color: $c--gray-9;
    font-size: $fz--xs;
    margin-bottom: .5em;
  }
}

</style>

