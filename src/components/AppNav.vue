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
    </ul>

    <button class="log-dumpling" @click="logDumpling">
      <span class="label">Eat</span>
      <div class="icon">
        <IconPlus />
      </div>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { auth } from '@/firebase';
import NavIcon from '@/components/NavIcon';

import IconHome from '@/svg/iconHome';
import IconList from '@/svg/iconList';
import IconUser from '@/svg/iconUser';
import IconPlus from '@/svg/iconPlus';

export default {
  name: 'AppNav',
  components: { NavIcon, IconPlus },
  computed: {
    ...mapState(['userProfile']),
    iconHome: () => IconHome,
    iconList: () => IconList,
    iconUser: () => IconUser,
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$store.dispatch('logout');
        this.$router.replace('/');
      });
    },
    logDumpling() {
      this.$store.dispatch('startLoggingDumpling');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/abstracts';

.mainnav {
  position: fixed;
  bottom: 0;
  left: 0;

   li {
     margin-bottom: $spacing--sm;
   }
}

.navlink {
  @include transition(background-color);
  text-decoration: none;
  display: block;
  text-align: center;
  padding: 8px .6rem;
  margin: auto;
  background-color: $c--white;

  &.router-link-active {
    background-color: $c--primary;
  }
}

.log-dumpling {
  position: fixed;
  right: $spacing--sm;
  bottom: $spacing;

  .label {
    @include label;
  }

  .icon {
    display: inline-block;
    width: 58px;
    height: 58px;
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
