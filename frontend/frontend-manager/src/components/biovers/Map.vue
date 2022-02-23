<template>
  <l-map :min-zoom='minZoom' :max-zoom='maxZoom' v-model='zoom' v-model:zoom='zoom'
    :center='center' @click="getPosition" :options="{zoomControl: false}">
      <l-tile-layer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'></l-tile-layer>
      <div v-for="(path, index) in paths" :key="index">
        <Path :path="path"/>
      </div>
      <div v-for="(poi, index) in pois" :key="index">
          <Poi :poi="poi"
            :iconHeight="40"
            :iconWidth="25"
            :icon="'https://placekitten.com'"
            @update-poi="openPoiEdition"/>
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
    biovers: Object,
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
      defaultZoom: { min: 1, max: 19 },
      minZoom: 1,
      maxZoom: 19,
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
        this.showCreationDialog = true;
      }
    },
    openPoiEdition(event) {
      this.poiToUpdate = event.element;
      this.showEditionDialog = true;
    },
    async save(event) {
      // TODO: REFACTOR WITH RIGHT ID USER
      // eslint-disable-next-line no-param-reassign
      event.author = 4;
      // eslint-disable-next-line no-param-reassign
      event.biovers = this.biovers[0].id;
      const newPoi = await poi.savePoi(event);
      this.showCreationDialog = false;
      this.$emit('newPoi', newPoi.data.data);
    },
    async updatePoi(event) {
      const updatedPoi = await poi.updatePoi(event);
      this.showEditionDialog = false;
      this.$emit('updatePoi', updatedPoi.data.data);
    },
  },
};
</script>
