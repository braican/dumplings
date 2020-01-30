<template>
  <span class="navicon">
    <span class="label"><slot /></span>
    <span class="icon">
      <component :is="icon" />
    </span>
  </span>
</template>

<script>
export default {
  name: 'NavIcon',
  props: {
    icon: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped lang="scss">
@import '../styles/abstracts';

.navicon {
  display: block;
}

.label {
  @include label;

  .router-link-active & {
    color: $c--white;
  }
}

.icon {
  width: 24px;
  display: block;
  margin: auto;

  svg {
    display: block;
    width: 100%;
    fill: $c--primary;

    .router-link-active & {
      fill: $c--white;
    }
  }
}
</style>
