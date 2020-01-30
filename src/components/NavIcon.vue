<template>
  <span class="navicon">
    <span class="icon">
      <component :is="icon" />
    </span>
    <span class="label"><slot /></span>
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
  display: block;
  color: $c--primary;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: $fz--xs;
  font-weight: $fw--bold;
  margin-top: 4px;

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
