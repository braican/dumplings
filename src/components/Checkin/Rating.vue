<template>
  <div class="rating">
    <span class="rating__number">{{ rating }}</span>
    <span
      v-for="n in 5"
      :key="n"
      :class="['dumpling-icon', rating < n ? 'dumpling-icon--disabled' : 'dumpling-icon--filled']"
    >
      <DumplingIcon :stroke="rating < n ? '#ccc' : '#ff0051'" />
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

  > span {
    vertical-align: middle;
  }
}

.rating__number {
  font-size: $fz--lg;
  color: $c--primary;
  font-family: $ff--headline;
  margin-right: $spacing--sm;
}

.dumpling-icon {
  display: inline-block;
  width: 20px;
  margin-left: 8px;

  svg {
    display: block;
    width: 100%;
  }
}

</style>
