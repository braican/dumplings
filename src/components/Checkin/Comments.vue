<template>
  <div class="comments">
    <button
      class="meta-info comment-meta"
      @click="handleCommentTrigger"
    >
      <span class="comments-icon"><CommentIcon /></span>
      <span v-if="comments.length > 0 && !commentsVisible">{{ comments.length }} comment{{ comments.length > 1 ? 's' : '' }}</span>
      <span v-else-if="comments.length > 0">Hide comments</span>
      <span v-else>No comments yet. Add the first one.</span>
    </button>

    <ul v-if="comments.length && commentsVisible" class="comment-list">
      <li
        v-for="(comment, index) in comments"
        :key="comment.id"
        :class="['comment', index > 1 && !allCommentsVisible && 'comment--hidden']"
      >
        <header class="comment-header">
          <span class="commenter">
            {{ comment.userName }}
          </span>&nbsp;&nbsp;
          <span class="meta-info">
            {{ comment.createdOn | formatDate }}
          </span>
        </header>
        <p class="comment-content">
          {{ comment.comment }}
        </p>
      </li>
    </ul>

    <!-- <button
      v-if="comments.length > 2"
      type="button"
      class="all-comments-toggler"
      @click="toggleShowAllComments"
    >
      {{ allCommentsVisible ? 'Collapse comments' : `Show ${comments.length - 2} more comment${comments.length - 2 > 1 ? 's' : ''}` }}
    </button> -->

    <button
      v-if="!commenting && commentsVisible"
      type="button"
      class="add-comment button button--gray"
      @click="openCommentForm"
    >
      Add a comment
    </button>

    <CommentForm v-if="commenting" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CommentForm from './CommentForm';
import CommentIcon from '@/svg/iconComment';

export default {
  name: 'CheckinComments',
  components: { CommentForm, CommentIcon },
  props: {
    checkin: {
      type: String,
      required: true,
    },
    commenting: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      commentsVisible: false,
      allCommentsVisible: true,
    };
  },
  computed: {
    ...mapState(['commentMap']),
    comments() {
      const checkinComments = this.commentMap[this.checkin];
      return checkinComments || [];
    },
  },
  methods: {
    handleCommentTrigger() {
      if (this.comments.length > 0) {
        this.toggleShowComments();
      } else {
        this.openCommentForm();
      }
    },
    openCommentForm() {
      this.$store.commit('setCommenting', this.checkin);
    },
    toggleShowComments() {
      this.commentsVisible = !this.commentsVisible;
    },
    toggleShowAllComments() {
      this.allCommentsVisible = !this.allCommentsVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.comments {
  margin-top: $spacing--sm;
}

.comment-meta {
  display: flex;

  + .comment-form {
    margin-top: $spacing--sm;
  }
}

.comments-icon {
  width: 1rem;
  margin-right: .5em;

  svg {
    fill: currentColor;
  }
}

.comment-list {
  margin: $spacing--sm 0 $spacing--sm $spacing--sm;
  border-left: 2px solid $c--gray-e;
}

.comment {
  position: relative;
  padding: $spacing--sm 0 $spacing--sm $spacing--sm;

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: -5px;
    top: $spacing--sm;
    top: calc(#{$spacing--sm} + 5px);
    width: 8px;
    height: 8px;
    background-color: $c--gray-e;
    border-radius: 100%;
  }
}

.comment--hidden {
  display: none;
}

.comment-header {
  margin-bottom: .33rem;
}

.commenter {
  font-weight: $fw--bold;
  font-size: $fz--sm;
}

.all-comments-toggler {
  text-transform: uppercase;
  letter-spacing: 2px;
  color: $c--gray-9;
  font-size: $fz--xs;
  margin-bottom: $spacing;
  margin-left: $spacing;
  margin-left: calc(#{$spacing} + 2px);
}

.add-comment {
  font-size: $fz--sm;
}


</style>