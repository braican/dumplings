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
        <router-link to="/user" class="navlink">
          <NavIcon :icon="iconUser">
            Me
          </NavIcon>
        </router-link>
      </li>
      <li>
        <router-link to="/map" class="navlink">
          <NavIcon :icon="iconMap">
            Map
          </NavIcon>
        </router-link>
      </li>
    </ul>

    <button v-if="!commenting" class="log-dumpling" @click="logDumpling">
      <div class="icon">
        <IconPlus />
      </div>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NavIcon from '@/components/NavIcon';

import IconHome from '@/svg/iconHome';
import IconList from '@/svg/iconList';
import IconUser from '@/svg/iconUser';
import IconPlus from '@/svg/iconPlus';
import IconMap from '@/svg/iconMap';

export default {
  name: 'AppNav',
  components: { NavIcon, IconPlus },
  computed: {
    ...mapState(['userProfile', 'commenting']),
    iconHome: () => IconHome,
    iconList: () => IconList,
    iconUser: () => IconUser,
    iconMap: () => IconMap,
  },
  methods: {
    logDumpling() {
      this.$store.commit('setCurrentRoute', this.$router.currentRoute);
      this.$store.dispatch('startLoggingDumpling');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.mainnav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $c--white;
  z-index: 2;
  display: flex;
  box-shadow: 0 7px 12px $c--black;
  padding-right: calc(58px + 1rem + #{$spacing--sm});

  li {
    flex: 1;
  }

  @include mq($bp--mobile) {
    top: 0;
    left: auto;
    bottom: auto;
    box-shadow: none;
    padding-right: 0;
    box-shadow: 0 0 20px rgba($c--black, 0.2);
    border-radius: 0 0 0 8px;
    overflow: hidden;
  }
}

.navlink {
  @include transition(background-color);
  text-decoration: none;
  display: block;
  text-align: center;
  padding: 8px 0.6rem;
  margin: auto;
  background-color: $c--white;

  &.router-link-active {
    background-color: $c--primary;
  }

  @include mq($bp--mobile) {
    padding-left: $spacing;
    padding-right: $spacing;
  }
}

.log-dumpling {
  position: fixed;
  z-index: 3;
  right: $spacing--sm;
  bottom: $spacing;
  display: inline-block;
  width: 58px;
  height: 58px;
  background-color: $c--primary;
  border-radius: 100%;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba($c--black, 0.5);

  svg {
    display: block;
    width: 100%;
    fill: $c--white;
  }
}
</style>
