<template>
  <div class="rating">
    <span
      v-for="n in 5"
      :key="n"
      :class="['dumpling-icon', rating < n ? 'dumpling-icon--disabled' : 'dumpling-icon--filled']"
    >
      <DumplingIcon :theme="rating < n ? 'gray_outline' : 'red_fill'" />
    </span>
  </div>
</template>

<script>
import DumplingIcon from '@/svg/dumplings';
export default {
  name: 'CheckinRating',
  components: { DumplingIcon },
  props: {
    rating: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.rating {
  margin-top: $spacing--sm;
  margin-bottom: $spacing--sm;
  display: flex;
}

.rating__number {
  font-size: $fz--lg;
  color: $c--primary;
  font-family: $ff--headline;
}

.dumpling-icon {
  display: inline-block;
  width: 20px;
  margin-right: .5rem;

  svg {
    display: block;
    width: 100%;
  }
}

</style>
