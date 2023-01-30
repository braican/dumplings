<template>
  <div class="map">
    <GmapMap
      :center="{ lat: 45.5152, lng: -122.6784 }"
      :zoom="12"
      :class="'map-embed'"
      :options="{
        disableDefaultUI: true,
      }"
    >
      <GmapInfoWindow
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      ></GmapInfoWindow>
      <GmapMarker
        v-for="entry in dumplings"
        :key="entry.id"
        :position="
          google && new google.maps.LatLng(entry.geopoint.latitude, entry.geopoint.longitude)
        "
        :clickable="true"
        :icon="getIcon(entry)"
        @click="toggleInfoWindow(entry)"
      />
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps';
import { mapState } from 'vuex';

export default {
  name: 'Dumplings',
  data() {
    return {
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        content: '',
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },
  computed: {
    ...mapState(['dumplings', 'dumplingsLoaded', 'userCheckins', 'starsMap']),
    google: gmapApi,
  },
  methods: {
    toggleInfoWindow: function(marker) {
      this.infoWindowPos = new this.google.maps.LatLng(
        marker.geopoint.latitude,
        marker.geopoint.longitude,
      );
      this.infoOptions.content = `
        <p><strong style="font-weight: bold">${marker.name}</strong></p>
        <p class="marker-address">${marker.address}</p>
        <p class="marker-dumpling">${marker.dumplings.map(d => d.description).join('; ')}</p>
      `;
      if (this.currentMidx === marker) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMidx = marker;
      }
    },
    getIcon: function(dumpling) {
      const hasBeen = this.userCheckins.find(ch => ch.restaurantId === dumpling.id);
      const isStarred = this.starsMap[dumpling.id];

      if (hasBeen) {
        return {
          path:
            'M9.984 17.016l9-9-1.406-1.453-7.594 7.594-3.563-3.563-1.406 1.406zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93z',
          strokeWeight: 0,
          fillOpacity: 1,
          fillColor: 'green',
        };
      }

      if (isStarred) {
        return {
          path:
            'M12 17.25l-6.188 3.75 1.641-7.031-5.438-4.734 7.172-0.609 2.813-6.609 2.813 6.609 7.172 0.609-5.438 4.734 1.641 7.031z',
          strokeWeight: 1,
          strokeColor: '#000',
          fillOpacity: 1,
          fillColor: '#e1ad01',
        };
      }

      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_abstracts.scss';

.small-stats {
  font-weight: $fw--bold;
  color: $c--primary;
  margin-top: $spacing;
}

.dumpling-list {
  margin-top: $spacing;
}

.map {
  margin-left: 44px;
}

.map-embed {
  width: 100%;
  height: calc(100vh - 58px);

  @include mq($bp--mobile) {
    height: 100vh;
  }
}
</style>

<style lang="scss">
.gm-style-iw-d {
  .marker-dumpling {
    margin-top: 6px;
  }
}
</style>
