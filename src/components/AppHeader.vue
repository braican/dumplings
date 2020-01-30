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
@import '../styles/abstracts';

.logo {
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  background-color: $c--primary;
  width: 44px;
  height: 44px;
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
  margin-left: 38px;
  margin-left: calc(#{$spacing--sm} + 44px);
  color: $c--primary;
  font-family: $ff--headline;
  line-height: 44px;;
}

</style>
