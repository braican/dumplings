<template>
  <div class="log-dumpling">
    <form class="dumpling-form" @submit="submit">
      <div class="view">
        <DumplingPicker v-if="pickedDumpling === null" :picked="handlePicked" />
        <DumplingRating
          v-else
          :dumpling="pickedDumpling"
          @rating="setRating"
          @note="setNote"
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

        <button class="cancel-button" @click="close">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { checkinsCollection } from '@/firebase';
import DumplingPicker from '@/components/DumplingPicker';
import DumplingRating from '@/components/DumplingRating';

export default {
  name: 'LogDumpling',
  components: { DumplingPicker, DumplingRating },
  data() {
    return {
      pickedDumpling: null,
      rating: 1,
      note: '',
    };
  },
  computed: {
    ...mapState(['currentUser', 'userProfile', 'dumplings']),
  },
  methods: {
    submit(event) {
      event.preventDefault();
      const { currentUser, userProfile, note, rating, pickedDumpling: dumpling, dumplings } = this;

      const checkinData = {
        createdOn: new Date(),
        user: currentUser.uid,
        photo: userProfile.photoURL,
        userName: userProfile.displayName,
        dumpling: dumpling.id,
        description: dumpling.description,
        restaurant: dumplings[dumpling.restaurant].name,
        note,
        rating,
      };

      checkinsCollection.add(checkinData)
        .then(() => {
          console.log('STATUS: Checkin created successfully.'); // eslint-disable-line
          this.close();
        });
    },
    close() {
      this.$store.dispatch('closeLoggingDumpling');
    },
    handlePicked(dumpling) {
      this.pickedDumpling = dumpling;
    },
    setRating(rating) {
      this.rating = rating;
    },
    setNote(note) {
      this.note = note;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/abstracts';

.log-dumpling {
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  background-color: rgba($c--white, .9);
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

