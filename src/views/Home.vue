<template>
  <div class="home">
    <header class="masthead">
      <div class="logo">
        <Logo />
      </div>
      <div class="content">
        <h1 class="headline">
          Your companion to Portland's Dumpling Week
        </h1>
        <div class="login">
          <LoginButton />
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import Logo from  '@/svg/dumplings';
import LoginButton from '@/components/LoginButton';

export default {
  name: 'Home',
  components: { Logo, LoginButton },
};
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.home {
  padding: 6vw 10vw;
}

.masthead {
  display: flex;
  align-items: flex-end;
  padding-bottom: 8rem;
}

.logo {
  height: 36vh;

  svg {
    position: relative;
    top: -5vw;
    display: block;
    height: 100%;
    opacity: .4;
  }
}

.content {
  margin-left: -4vw;
  max-width: 860px;
  position: relative;
  z-index: 2;
}

.headline {
  font-family: $ff--headline;
  line-height: $lh--sm;
  font-size: 5vw;
}

.login {
  position: absolute;
  bottom: -8rem;
}



</style>
