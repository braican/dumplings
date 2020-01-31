<template>
  <span class="navicon">
    <span class="icon">
      <component :is="icon" />
    </span>
    <span class="label label--bottom label--color"><slot /></span>
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
@import '@/styles/_abstracts.scss';

.navicon {
  display: block;
}

.router-link-active .label {
  color: $c--white;
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
