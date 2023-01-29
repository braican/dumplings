<template>
  <header class="app-header">
    <div class="logo">
      <Logo stroke="#fff" theme="white_outline" />
    </div>

    <h1 class="headline">
      PDX Dumpling Week 2023
    </h1>
  </header>
</template>

<script>
import Logo from '@/svg/dumplings';

export default {
  name: 'AppHeader',
  components: { Logo },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.logo {
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  background-color: $c--primary;
  width: 44px;
  height: 44px;
  padding: 6px;
  z-index: 1;

  svg {
    display: block;
    height: 100%;
    margin: 0 auto;
  }
}

.headline {
  position: fixed;
  left: 22px;
  top: 100vh;
  padding-right: 60px;
  text-align: right;
  width: 100vh;
  transform: rotate(-90deg) translateY(-50%);
  transform-origin: 0 0;
  color: $c--primary;
  font-family: $ff--headline;
}
</style>
