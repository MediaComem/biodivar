<template>
  <l-map :max-zoom='19' v-model='zoom' v-model:zoom='zoom'
    :center='center' @click="getPosition">
      <l-tile-layer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'></l-tile-layer>
      <div v-for="(path, index) in paths" :key="index">
        <Path :path="path"/>
      </div>
      <div v-for="(poi, index) in pois" :key="index">
          <Poi :poi="poi"
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
    pois: Array,
    paths: Array,
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
};
</script>
