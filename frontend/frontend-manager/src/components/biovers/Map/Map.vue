<template>
  <l-map :min-zoom='minZoom' :max-zoom='maxZoom' v-model='zoom' v-model:zoom='zoom'
    :center='center' @click="getPosition">
      <l-tile-layer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'></l-tile-layer>
      <div v-for="(path, index) in getPaths" :key="index">
        <Path v-if="path.display" :path="path" />
      </div>
      <div v-for="(poi, index) in getPois" :key="index">
          <Poi
            v-if="poi.display &&
            (ownOrPublic(poi.element.biovers) === 'own'
            || (ownOrPublic(poi.element.biovers) === 'public'
            && poi.element.is_public)) && poi.element.coordinate"
            :poi="poi"
            @update-poi="openPoiEdition"
          />
      </div>
    </l-map>
    <PoiCreator :showDialog="showCreationDialog" :coordinate="latlng"
    @close-dialog="showCreationDialog = false" />
    <PoiEdition v-if="showEditionDialog" :poi="poiToUpdate" :showDialog="showEditionDialog"
    @close-dialog="showEditionDialog = false" />
</template>

<script>
import {
  LMap,
  LTileLayer,
} from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

import { mapGetters } from 'vuex';

import Poi from './Poi.vue';
import Path from './Path.vue';
import PoiCreator from '../Dialog/PoiCreator.vue';
import PoiEdition from '../Dialog/PoiEdition.vue';

export default {
  components: {
    LMap,
    LTileLayer,
    Poi,
    Path,
    PoiCreator,
    PoiEdition,
  },
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
    ...mapGetters('biovers', ['getPois', 'getPaths', 'ownOrPublic']),
  },
  methods: {
    getPosition(event) {
      if (event.latlng) {
        this.latlng = event.latlng;
        this.showCreationDialog = true;
      }
    },
    openPoiEdition(event) {
      this.poiToUpdate = { poi: event };
      this.showEditionDialog = true;
    },
  },
};
</script>
