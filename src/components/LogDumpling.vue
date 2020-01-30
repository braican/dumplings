<template>
  <div class="log-dumpling">
    <form class="dumpling-form" @submit="submit">
      <h3 class="headline">
        Check in a dumpling
      </h3>

      <div class="view">
        <DumplingPicker v-if="pickedDumpling === null" :picked="handlePicked" />
        <DumplingRating
          v-else
          v-model="rating"
          :dumpling="pickedDumpling"
        />
      </div>

      <div class="actions">
        <button
          v-if="pickedDumpling !== null"
          class="button"
          type="submit"
        >
          Check in
        </button>

        <button class="cancel-button" @click="cancel">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import DumplingPicker from '@/components/DumplingPicker';
import DumplingRating from '@/components/DumplingRating';

export default {
  name: 'LogDumpling',
  components: { DumplingPicker, DumplingRating },
  data() {
    return {
      pickedDumpling: null,
      rating: 1,
    };
  },
  methods: {
    submit(event) {
      event.preventDefault();
      console.log(this.rating);

    },
    cancel() {
      this.$store.dispatch('closeLoggingDumpling');
    },
    handlePicked(dumpling) {
      this.pickedDumpling = dumpling;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/abstracts';

.log-dumpling {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  background-color: rgba($c--white, .9);
}

.headline {
  font-family: $ff--headline;
  font-size: $fz--lg;
  color: $c--primary;
  margin-bottom: $spacing;
}

.dumpling-form {
  height: 90vh;
  width: 100%;
  background-color: $c--white;
  z-index: 3;
  padding: $spacing $spacing--sm;
  box-shadow: 0 -6px 20px rgba($c--black, .2);
  display: flex;
  flex-direction: column;
}

.view {
  flex: 1;
  overflow: hidden;
}

.actions {
  display: flex;
  margin-top: $spacing;
  justify-content: space-between;
}

.cancel-button {
  display: inline-block;
  margin-left: auto;
}

</style>

