<template>
  <header class="app-header">
    <div class="logo">
      <Logo stroke="#fff" />
    </div>

    <h1 class="headline">
      PDX Dumpling Week 2020
    </h1>
  </header>
</template>

<script>
import Logo from  '@/svg/dumplings';

export default {
  name: 'AppHeader',
  components: { Logo },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.logo {
  display: inline-block;
  vertical-align: middle;
  background-color: $c--primary;
  width: 32px;
  height: 32px;
  padding: 6px;

  svg {
    display: block;
    height: 100%;
    margin: 0 auto;
  }
}

.headline {
  display: inline-block;
  vertical-align: middle;
  margin-left: $spacing;
  color: $c--primary;
  font-family: $ff--headline;
}

</style>
