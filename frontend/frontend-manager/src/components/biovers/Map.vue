<template>
  <l-map :max-zoom='19' v-model='zoom' v-model:zoom='zoom'
    :center='center' @click="getPosition">
      <l-tile-layer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'></l-tile-layer>
      <Path :coordinate="getPath"/>
      <div v-for="(item, index) in getPois" :key="index">
          <poi :coordinate="item"
            :iconHeight="40"
            :iconWidth="25"
            :icon="'https://placekitten.com'" />
      </div>
    </l-map>
</template>

<script>
import {
  LMap,
  LTileLayer,
} from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

import Poi from './Poi.vue';
import Path from './Path.vue';

export default {
  components: {
    LMap,
    LTileLayer,
    Poi,
    Path,
  },
  props: {
    biovers: Object,
  },
  data() {
    return {
      zoom: 15,
      pathCoodinate: [],
      poiCoordinate: [],
      center: [
        46.7809153620790993954869918525218963623046875,
        6.64862875164097832936249687918461859226226806640625],
    };
  },
  methods: {
    getPosition(event) {
      console.log(event);
    },
  },
  computed: {
    getPath() {
      const path = [];
      this.biovers.Path[0].coordinate.forEach((x) => {
        path.push([x.lat, x.long]);
      });
      return path;
    },
    getPois() {
      const pois = [];
      this.biovers.Poi.forEach((x) => {
        pois.push([x.coordinate.lat, x.coordinate.long]);
      });
      return pois;
    },
  },
};
</script>
