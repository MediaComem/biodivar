<template>
  <l-map :min-zoom='minZoom' :max-zoom='maxZoom' v-model='zoom' v-model:zoom='zoom'
    :center='center' @click="getPosition">
      <l-tile-layer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'></l-tile-layer>
      <div v-for="(path, index) in getPaths" :key="index">
        <Path :path="path"/>
      </div>
      <div v-for="(poi, index) in getPois" :key="index">
          <Poi :poi="poi.poi"
            :iconHeight="40"
            :iconWidth="25"
            :icon="'https://placekitten.com'"
            @update-poi="openPoiEdition(poi.poi, poi.biover)"/>
      </div>
    </l-map>
    <PoiCreator :showDialog="showCreationDialog" :coordinate="latlng"
    @close-dialog="showCreationDialog = false" @save="save"/>
    <PoiEdition :poi="poiToUpdate" :showDialog="showEditionDialog"
    @close-dialog="showEditionDialog = false"
    @save="updatePoi"/>
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
import PoiEdition from './PoiEdition.vue';

import poi from '../../api/poi';

export default {
  components: {
    LMap,
    LTileLayer,
    Poi,
    Path,
    PoiCreator,
    PoiEdition,
  },
  props: {
    currentBioversId: Number,
    pois: Array,
    paths: Array,
  },
  emits: ['newPoi', 'updatePoi'],
  data() {
    return {
      showCreationDialog: false,
      showEditionDialog: false,
      poiToUpdate: undefined,
      latlng: undefined,
      zoom: 15,
      minZoom: 1,
      maxZoom: 19,
      center: [
        46.7809153620790993954869918525218963623046875,
        6.64862875164097832936249687918461859226226806640625],
    };
  },
  computed: {
    getPois() {
      const pois = [];
      this.pois.forEach((pAll) => {
        pAll.pois.forEach((p) => {
          pois.push({ biover: pAll.biover, poi: p });
        });
      });
      return pois;
    },
    getPaths() {
      const paths = [];
      this.paths.forEach((pAll) => {
        pAll.paths.forEach((p) => {
          paths.push(p);
        });
      });
      return paths;
    },
  },
  methods: {
    getPosition(event) {
      if (event.latlng) {
        this.latlng = event.latlng;
        this.showCreationDialog = true;
      }
    },
    openPoiEdition(event, bioverId) {
      this.poiToUpdate = { poi: event.element, biover: bioverId };
      this.showEditionDialog = true;
    },
    async save(event) {
      // eslint-disable-next-line no-param-reassign
      event.biovers = this.currentBioversId;
      const newPoi = await poi.savePoi(event);
      this.showCreationDialog = false;
      this.$emit('newPoi', newPoi.data.data);
    },
    async updatePoi(event) {
      const updatedPoi = await poi.updatePoi(event);
      this.showEditionDialog = false;
      this.$emit('updatePoi', { biover: updatedPoi.data.data.biovers, poi: updatedPoi.data.data });
    },
  },
};
</script>
