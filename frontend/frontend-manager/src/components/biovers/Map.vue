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
    <PoiCreator :showDialog="showDialog" :coordinate="latlng" @close-dialog="showDialog = false"
    @save="save"/>
</template>

<script>
import {
  LMap,
  LTileLayer,
} from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

import Poi from './Poi.vue';
import Path from './Path.vue';
import PoiCreator from './PoiCreator.vue';

import poi from '../../api/poi';

export default {
  components: {
    LMap,
    LTileLayer,
    Poi,
    Path,
    PoiCreator,
  },
  props: {
    biovers: Object,
    pois: Array,
    paths: Array,
  },
  emits: ['newPoi'],
  data() {
    return {
      showDialog: false,
      latlng: undefined,
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
      if (event.latlng) {
        this.latlng = event.latlng;
        this.showDialog = true;
      }
    },
    async save(event) {
      // eslint-disable-next-line no-param-reassign
      event.author = 4;
      // eslint-disable-next-line no-param-reassign
      event.biovers = this.biovers[0].id;
      const newPoi = await poi.savePoi(event);
      this.showDialog = false;
      this.$emit('newPoi', newPoi.data.data);
    },
  },
};
</script>
