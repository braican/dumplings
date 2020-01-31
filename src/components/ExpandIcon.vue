<template>
  <span class="icon">
    <span v-if="collapsedLabel || expandedLabel" class="expand-label">{{ expanded ? expandedLabel : collapsedLabel }}</span>&nbsp;<span :class="['expand-icon', expanded && 'expand-icon--expanded']" />
  </span>
</template>

<script>
export default {
  name: 'ExpandIcon',
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
    collapsedLabel: {
      type: String,
      default: '',
    },
    expandedLabel: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.icon {
  display: inline;
  white-space: nowrap;
}
.expand-label {
  color: $c--gray-6;
  font-size: $fz--sm;
}

.expand-icon {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 8px;
  margin-left: .2rem;

  &:after,
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: $c--gray-6;
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
}
</style>
