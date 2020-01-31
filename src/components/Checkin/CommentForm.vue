<template>
  <form class="comment-form" @submit="submit">
    <textarea
      ref="commentForm"
      :value="comment"
      class="comment-box"
      @input="event => comment = event.target.value"
    />
    <div class="actions">
      <button
        class="meta-info"
        type="button"
        @click="cancel"
      >
        Cancel
      </button>
      <button
        class="submit-button"
        type="submit"
        :disabled="comment === ''"
      >
        Post
      </button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import { commentsCollection } from '@/firebase';

export default {
  name: 'CheckinCommentForm',
  data() {
    return {
      comment: '',
    };
  },
  computed: {
    ...mapState(['commenting', 'userProfile', 'currentUser']),
  },
  mounted() {
    this.$refs.commentForm.focus();
  },
  methods: {
    submit(event) {
      event.preventDefault();
      const checkinId = this.commenting;

      const commentData = {
        createdOn: new Date(),
        uid: this.currentUser.uid,
        userName: this.userProfile.displayName,
        photo: this.userProfile.photoURL,
        comment: this.comment,
        checkin: checkinId,
      };

      commentsCollection.add(commentData)
        .then(() => {
          console.log('STATUS: Comment added'); // eslint-disable-line
          this.cancel();
        });
    },
    cancel() {
      this.$store.commit('setCommenting', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.comment-box {
  width: 100%;
  border: 1px solid $c--gray-9;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.submit-button {
  font-weight: $fw--bold;
  color: $c--primary;

  &:disabled {
    opacity: .3;
    font-weight: $fw--base;
    cursor: default;
    color: $c--gray-9;
    pointer-events: none;
  }
}

</style>
