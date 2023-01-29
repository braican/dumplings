<template>
  <form class="new-dumpling" @submit="submit">
    <div v-if="!selectedRestaurant" class="restaurant-input">
      <label for="dumpling-restaurant">Restaurant</label>
      <input id="dumpling-restaurant" v-model="restaurant" type="text" />

      <ul v-if="restaurantResults.length > 0">
        <li v-for="rname in restaurantResults" :key="rname">
          <button type="button" @click="() => selectRestaurant(rname)">{{ rname }}</button>
        </li>
      </ul>
    </div>

    <br />
    <div v-if="selectedRestaurant">
      <p>{{ selectedRestaurant }}</p>
    </div>
    <div v-else>
      <label for="dumpling-restaurant-address">Restaurant address</label>
      <input id="dumpling-restaurant-address" v-model="address" type="text" />
    </div>

    <br />

    <label for="dumpling-description">Dumpling description</label>
    <textarea id="dumpling-description" v-model="description" rows="4" />

    <br />
    <br />

    <button class="button" type="submit">
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
  data() {
    return {
      restaurantMap: {},
      restaurantResults: [],
      selectedRestaurant: '',
      restaurant: '',
      address: '',
      description: '',
      google: null,
    };
  },
  watch: {
    restaurant(val) {
      if (val.length < 3) {
        this.restaurantResults = [];
        return;
      }

      const filteredRestaurants = Object.keys(this.restaurantMap)
        .filter(key => key.indexOf(val.toLowerCase()) > -1)
        .map(key => this.restaurantMap[key].name);

      this.restaurantResults = filteredRestaurants;
    },
  },
  async mounted() {
    if (this.google !== null) {
      return;
    }

    const gmapsLoader = new GoogleMapsLoader(mapsApiKey);
    this.google = await gmapsLoader.load();

    const restaurantSnap = await restaurantsCollection.orderBy('name').get();
    const restaurantMap = {};

    restaurantSnap.forEach(doc => {
      const { name } = doc.data();
      restaurantMap[name.toLowerCase()] = {
        id: doc.id,
        name,
      };
    });

    this.restaurantMap = restaurantMap;
  },

  methods: {
    selectRestaurant(restaurantName) {
      const restaurantData = this.restaurantMap[restaurantName.toLowerCase()];
      this.selectedRestaurant = restaurantData.name;
    },
    submit(event) {
      event.preventDefault();
      if (this.google === null) {
        return;
      }

      new Promise(resolve => {
        if (this.selectedRestaurant) {
          return resolve(this.restaurantMap[this.selectedRestaurant.toLowerCase()].id);
        }

        getLatLng(this.google, this.address).then(({ lat, lng }) => {
          restaurantsCollection
            .add({
              name: this.restaurant,
              address: this.address,
              geopoint: new firebase.firestore.GeoPoint(lat, lng),
            })
            .then(restaurantRef => resolve(restaurantRef.id));
        });
      })
        .then(restaurantId =>
          dumplingsCollection.add({
            description: this.description,
            restaurant: restaurantId,
            year: new Date().getFullYear(),
          }),
        )
        .then(id => {
          console.log(`Added ${id}`); // eslint-disable-line
          this.restaurant = '';
          this.address = '';
          this.description = '';
        });
    },
  },
};
</script>

<style lang="scss" scoped>
input,
textarea {
  width: 100%;
  display: block;
  border: 1px solid #999;
  padding: 4px;
}

.restaurant-input {
  position: relative;
}
</style>
