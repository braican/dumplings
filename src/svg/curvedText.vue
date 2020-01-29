<template>
  <!-- <span class="wrap" :style="{transform: `translate3d(-50%, -10px, 0) rotate(${characters * 10}deg)`}"> -->
  <span class="wrap">
    <span
      v-for="(piece, index) in textPieces"
      :key="`${piece}-${index}`"
      :class="['character', piece === 'i' ? 'character--small' : '']"
    >
      {{ piece }}
    </span>
  </span>
</template>

<script>
export default {
  name: 'CurvedTextSvg',
  computed: {
    textPieces() {
      return this.$slots.default[0].text.trim().split('');
    },
    characters() {
      return this.textPieces.length - 1;
    },

  },
};
</script>

<style lang="scss" scoped>
@import '../styles/abstracts';

.wrap {
  display: inline-block;
  position: absolute;
  right: 0;
  top: 0;
  width: 56px;
  height: 56px;
}
.character {
  text-transform: uppercase;
  font-weight: $fw--bold;
  display: inline-block;
  height: 56px;
  position: absolute;
  width: 1em;
  left: 0;
  top:   0;
  transform-origin: bottom center;
}

@for $i from 1 through 100 {
  .character:nth-child(#{$i+1}) {
    transform: rotate(($i*20)+deg);
  }
}
</style>
