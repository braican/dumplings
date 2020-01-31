<template>
  <div class="log-dumpling-modal">
    <div class="form-controls">
      <DumplingPicker v-if="pickedDumpling === null" :picked="handlePicked" />
      <DumplingRating
        v-else
        :dumpling="pickedDumpling"
        @back="unsetPicked"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DumplingPicker from '@/components/AddCheckin/DumplingPicker';
import DumplingRating from '@/components/AddCheckin/DumplingRating';

export default {
  name: 'LogDumpling',
  components: { DumplingPicker, DumplingRating },
  data() {
    return {
      pickedDumpling: null,
    };
  },
  computed: {
    ...mapState(['currentRoute']),
  },
  // mounted() {
  //   window.addEventListener('onpopstate', () => {
  //     this.$router.push(this.currentRoute.fullPath);
  //   });
  // },
  methods: {
    handlePicked(dumpling) {
      this.pickedDumpling = dumpling;
    },
    unsetPicked() {
      this.pickedDumpling = null;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/_abstracts.scss';

.log-dumpling-modal {
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($c--white, .9);
}

.form-controls {
  height: 100vh;
  width: 100%;
  background-color: $c--white;
  z-index: 3;
  box-shadow: 0 -6px 20px rgba($c--black, .2);
  padding: $spacing $spacing 4rem $spacing;
  overflow: auto;
}

.log-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing;
}

</style>

