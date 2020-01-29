<template>
  <form class="new-dumpling" @submit="submit">
    <label for="dumpling-restaurant">Restaurant</label>
    <input
      id="dumpling-restaurant"
      v-model="restaurant"
      type="text"
    >

    <br>

    <label for="dumpling-restaurant-address">Restaurant address</label>
    <input
      id="dumpling-restaurant-address"
      v-model="address"
      type="text"
    >

    <br>

    <label for="dumpling-description">Dumpling description</label>
    <textarea
      id="dumpling-description"
      v-model="description"
      rows="4"
    />

    <br>
    <br>

    <button class="button">
      Submit
    </button>
  </form>
</template>

<script>
import firebase from 'firebase/app';
import { Loader as GoogleMapsLoader } from 'google-maps';
import { mapsApiKey } from '@/config';
import { restaurantsCollection, dumplingsCollection } from '@/firebase';

const getLatLng = ({ maps }, address) =>
  new Promise((resolve, reject) => {
    const geocoder = new maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status !== 'OK' || !results[0]) {
        console.error('Geocode was not successful.', status);
        reject(status);
      }

      const latLng = results[0].geometry.location.toJSON();
      resolve(latLng);
    });
  });

export default {
  name: 'Admin',
  data: () => ({
    restaurant: '',
    address: '',
    description: '',
    google: null,
  }),
  async mounted() {
    if (this.google !== null) {
      return;
    }

    const gmapsLoader = new GoogleMapsLoader(mapsApiKey);
    this.google = await gmapsLoader.load();
  },
  methods: {
    submit(event) {
      event.preventDefault();
      if (this.google === null) {
        return;
      }

      getLatLng(this.google, this.address)
        .then(({ lat, lng }) =>
          restaurantsCollection.add({
            name: this.restaurant,
            address: this.address,
            geopoint: new firebase.firestore.GeoPoint(lat, lng),
          })
        )
        .then(restaurantRef =>
          dumplingsCollection.add({
            description: this.description,
            restaurant: restaurantRef,
          })
        )
        .then(() => {
          console.log("Added"); // eslint-disable-line
          this.restaurant = '';
          this.address = '';
          this.description = '';
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.new-dumpling {
  padding: 8vw;
}

input,
textarea {
  width: 100%;
  display: block;
  border: 1px solid #999;
  padding: 4px;
}
</style>
