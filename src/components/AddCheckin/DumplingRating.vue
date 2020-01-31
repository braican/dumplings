<template>
  <form class="dumpling-rating" @submit="submit">
    <header class="log-modal-header">
      <h6 class="section-header section-header--color">
        {{ restaurantName }}
      </h6>
      <button
        class="back-button"
        type="button"
        @click="$emit('back')"
      >
        <BackArrowIcon />
        <span>Back</span>
      </button>
    </header>

    <p class="dumpling__description">
      {{ dumpling.description }}
    </p>

    <div class="controls">
      <p class="your-rating">
        <span class="label">Your rating:</span>&nbsp;&nbsp;<span class="rating">{{ rating }}</span>

        <span
          v-for="n in rating"
          :key="n"
          class="dumpling-icon"
        >
          <DumplingIcon theme="red_outline" />
        </span>
      </p>

      <input
        v-model.number="rating"
        type="range"
        min="1"
        max="5"
        value="0"
        class="rating-input"
      >

      <textarea
        v-model="note"
        class="dumpling__notes"
        placeholder="Dumpling notes..."
        rows="3"
      />
    </div>

    <div class="actions">
      <button
        v-if="!loading"
        class="button check-in-button"
        type="submit"
      >
        Check in
      </button>
      <p v-else>
        Saving your checkin...
      </p>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import { checkinsCollection } from '@/firebase';
import DumplingIcon from '@/svg/dumplings';
import BackArrowIcon from '@/svg/iconBackArrow';

export default {
  name: 'DumplingRating',
  components: { DumplingIcon, BackArrowIcon },
  props: {
    dumpling: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rating: 3,
      note: '',
      loading: false,
    };
  },
  computed: {
    ...mapState(['dumplings', 'currentUser', 'userProfile']),
    restaurantName() {
      const restaurantId = this.dumpling.restaurant;
      if (!this.dumplings[restaurantId]) {
        return '';
      }

      return this.dumplings[restaurantId].name;
    },
  },
  watch: {
    rating() {
      this.$emit('rating', this.rating);
    },
    note() {
      this.$emit('note', this.note);
    },
  },
  mounted() {
    window.onpopstate = () => {
      this.$emit('back');
    };
  },
  beforeDestroy() {
    window.onpopstate = null;
  },

  methods: {
    submit(event) {
      event.preventDefault();

      this.loading = true;
      const checkinData = {
        createdOn: new Date(),
        uid: this.currentUser.uid,
        userName: this.userProfile.displayName,
        photo: this.userProfile.photoURL,
        dumpling: this.dumpling.id,
        description: this.dumpling.description,
        restaurant: this.dumplings[this.dumpling.restaurant].name,
        restaurantId: this.dumpling.restaurant,
        note: this.note,
        rating: this.rating,
      };

      checkinsCollection.add(checkinData)
        .then(() => {
          console.log('STATUS: Checkin created successfully.'); // eslint-disable-line
          this.loading = false;
          this.close();
        });
    },
    close() {
      this.$store.dispatch('closeLoggingDumpling');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.back-button {
  display: flex;
  align-items: center;
  margin-left: $spacing;

  svg {
    width: 20px;
  }
  span {
    display: inline-block;
    margin-left: 3px;
    font-size: $fz--sm;
  }
}

.dumpling__description {
  max-height: 156px;
  overflow: hidden;
}

.rating-input {
  width: 98%;
}

.your-rating {
  margin-top: $spacing;
  margin-bottom: $spacing--sm;
  display: flex;
  align-items: center;
  padding-right: 8px;

  .label {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: $fw--bold;
    color: $c--gray-9;
    font-size: $fz--xs;
  }

  .rating {
    font-size: $fz--lg;
    font-family: $ff--headline;
    color: $c--primary;
    flex: 1;
  }
}

.dumpling-icon {
  display: inline-block;
  width: 20px;
  margin-left: 4px;

  svg {
    display: block;
    width: 100%;
  }
}

.dumpling__notes {
  margin-top: $spacing;
  width: 100%;
  border-color: $c--gray-e;
  background-color: $c--gray-f;
}

.actions {
  margin-top: $spacing--sm;
  min-height: 48px;
}
.check-in-button {
  width: 100%;
}

</style>
