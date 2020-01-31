<template>
  <div class="dumpling-picker">
    <header class="log-modal-header">
      <h3 class="section-header section-header--color">
        Check in a dumpling
      </h3>

      <button
        type="button"
        class="cancel"
        @click="cancel"
      >
        Cancel
      </button>
    </header>

    <input
      ref="search"
      :value="search"
      type="text"
      placeholder="Search"
      class="dumpling-input"
      @input="event => search = event.target.value"
    >

    <div class="dumpling-list">
      <ul>
        <li
          v-for="(entry, restaurantId) in dumplingList"
          :key="restaurantId"
          class="restaurant"
        >
          <button
            v-if="entry.dumplings.length === 1"
            class="restaurant__button"
            type="button"
            @click="() => picked(entry.dumplings[0])"
          >
            <p class="restaurant__name">
              {{ entry.name }}
            </p>
            <p class="meta-info">
              {{ entry.address }}
            </p>
          </button>

          <div
            v-if="entry.dumplings.length > 1"
            class="restaurant__button"
          >
            <p class="restaurant__name">
              {{ entry.name }}
            </p>
            <p class="meta-info">
              {{ entry.address }}
            </p>

            <p class="multi-dumplings">
              Choose one:
            </p>

            <ul class="dumpling-options">
              <li v-for="dumpling in entry.dumplings" :key="dumpling.id">
                <button
                  type="button"
                  class="restaurant__button"
                  @click="() => picked(dumpling)"
                >
                  {{ dumpling.description }}
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DumplingPicker',
  props: {
    picked: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      search: '',
    };
  },
  computed: {
    ...mapState(['dumplings']),
    dumplingList() {
      if (!this.search) {
        return this.dumplings;
      }

      const filtered = Object.keys(this.dumplings)
        .filter(key => this.dumplings[key].name.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
        .reduce((obj, key) => {
          obj[key] = this.dumplings[key];
          return obj;
        }, {});

      return filtered;
    },
  },
  mounted() {
    this.$refs.search.focus();
  },
  methods: {
    cancel() {
      this.$store.dispatch('closeLoggingDumpling');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.cancel {
  font-size: $fz--sm;
  margin-left: $spacing;
}

.dumpling-picker {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.dumpling-input {
  width: 100%;
  padding: $spacing--sm;
  font-size: $fz--lg;
  border-color: $c--gray-9;
}

.dumpling-list {
  flex: 1;
  overflow: auto;
  border: 1px solid $c--gray-e;
  border-top: 0;
  box-shadow: inset 0 -26px 30px -40px rgba($c--black, .6);
  padding: 6px $spacing--sm $spacing--sm;
}

.restaurant + .restaurant {
  border-top: 1px solid $c--gray-e;
}

.restaurant__button {
  width: 100%;
  text-align: left;
  padding: .8em 0;

  &:focus{
    outline: none;
    background-color: $c--gray-e;
  }
}

.restaurant__name {
  font-weight: $fw--bold;
}

.multi-dumplings {
  margin-top: $spacing--sm;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: $fw--bold;
  color: $c--gray-9;
  font-size: $fz--xs;
}

.dumpling-options {
  margin-left: $spacing--sm;

  li + li {
    border-top: 1px solid $c--gray-e;
  }
}


</style>
