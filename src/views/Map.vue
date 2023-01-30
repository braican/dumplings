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
    ...mapState(['dumplings', 'dumplingsLoaded']),
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
