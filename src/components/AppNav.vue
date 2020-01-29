<template>
  <div class="appnav">
    <ul class="mainnav">
      <li>
        <router-link to="/feed" class="navlink">
          <NavIcon :icon="iconHome">
            Feed
          </NavIcon>
        </router-link>
      </li>
      <li>
        <router-link to="/dumplings" class="navlink">
          <NavIcon :icon="iconList">
            List
          </NavIcon>
        </router-link>
      </li>

      <li>
        <button @click="logout">
          Log out
        </button>
      </li>
    </ul>

    <button class="log-dumpling">
      <span class="label">Eat</span>
      <div class="icon">
        <IconPlus />
      </div>
    </button>
  </div>
</template>

<script>
import { auth } from '@/firebase';
import NavIcon from '@/components/NavIcon';

import IconHome from '@/svg/iconHome';
import IconList from '@/svg/iconList';
import IconPlus from '@/svg/iconPlus';

export default {
  name: 'AppNav',
  components: { NavIcon, IconPlus },
  computed: {
    iconHome: () => IconHome,
    iconList: () => IconList,
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$store.dispatch('logout');
        this.$router.replace('/');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/abstracts';

.appnav {
  position: fixed;
  right: 0;
  bottom: $spacing;
}

.mainnav li {
  margin-bottom: 1rem;
}

.navlink {
  text-decoration: none;
  display: block;
  text-align: center;
  padding: 8px 1rem;
  border-radius: 4px 0 0 4px;
  margin: auto;

  &.router-link-active {
    background-color: $c--primary;
  }
}

.log-dumpling {
  padding-right: 1rem;

  .label {
    @include label;
  }

  .icon {
    display: inline-block;
    box-sizing: border-box;
    width: 52px;
    height: 52px;
    background-color: $c--primary;
    border-radius: 100%;
    padding: 10px;
    box-shadow: 0px 0px 6px rgba($c--black, .5);

    svg {
      display: block;
      width: 100%;
      fill: $c--white
    }
  }
}

</style>
