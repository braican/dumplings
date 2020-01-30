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
@import '@/styles/_abstracts.scss';

.home {
  padding: 6vw 10vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.masthead {
  position: relative;
}

.logo {
  width: 20vw;
  position: absolute;
  top: -28vh;
  left: -11vw;

  svg {
    display: block;
    height: 36vh;
    opacity: .2;
  }
}

.content {
  position: relative;
  z-index: 2;
}

.headline {
  font-family: $ff--headline;
  line-height: $lh--sm;
  font-size: 2rem;

  @include mq($bp--mobile) {
    font-size: 5vw;
  }
}

.login {
  margin-top: $spacing;
}

</style>
