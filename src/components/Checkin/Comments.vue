<template>
  <div class="comments">
    <button
      type="button"
      class="add-comment"
      @click="openCommentForm"
    >
      <CommentIcon />
      <span>Add a comment</span>
    </button>
  </div>
</template>

<script>
import CommentIcon from '@/svg/iconComment';

export default {
  name: 'CheckinComments',
  components: { CommentIcon },
  methods: {
    openCommentForm() {
      console.log('open');

      this.$emit('openCommentForm');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.comments {
  margin-top: $spacing;
}

.add-comment {
  display: flex;
  align-items: center;
  color: $c--gray-9;
  font-size: $fz--sm;

  svg {
    width: 1rem;
    margin-right: .5rem;
    fill: currentColor;
  }
}

</style>