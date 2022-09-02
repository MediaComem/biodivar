<template>
  <l-map :min-zoom='minZoom' :max-zoom='maxZoom' v-model='zoom' v-model:zoom='zoom'
    :center='center' @click="getPosition">
    <l-tile-layer
      url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"
      layer-type="base"
      name="Couleurs"
      attribution='Données &copy; <a href="https://www.swisstopo.admin.ch">Swisstopo</a>'
    ></l-tile-layer>
    <l-tile-layer
      url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-grau/default/current/3857/{z}/{x}/{y}.jpeg"
      layer-type="base"
      name="Gris"
      attribution='Données &copy; <a href="https://www.swisstopo.admin.ch">Swisstopo</a>'
    ></l-tile-layer>
    <l-tile-layer
      url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg"
      layer-type="base"
      name="Sat"
      attribution='Données &copy; <a href="https://www.swisstopo.admin.ch">Swisstopo</a>'
    ></l-tile-layer>
    <l-tile-layer
      :url="mapUrl"
      layer-type="base"
      name="Base"
      attribution=""
    ></l-tile-layer>
      <l-control-layers />
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
    <!--PoiCreator :showDialog="showCreationDialog" :coordinate="latlng"
    @close-dialog="showCreationDialog = false" />
    <PoiEdition v-if="showEditionDialog" :poi="poiToUpdate" :showDialog="showEditionDialog"
    @close-dialog="showEditionDialog = false" /-->
</template>

<script>
import {
  LMap,
  LTileLayer,
  LControlLayers,
} from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

import { mapGetters } from 'vuex';

import Poi from './Poi.vue';
import Path from './Path.vue';

const KEY = import.meta.env.VITE_APP_MAP_KEY;

export default {
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    Poi,
    Path,
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
    mapUrl() {
      return `https://api.maptiler.com/maps/50a99959-5522-4b4a-8489-28de9d3af0ed/{z}/{x}/{y}.png?key=${KEY}`;
    },
    ...mapGetters('biovers', ['getPois', 'getPaths', 'ownOrPublic', 'getCurrentBioverId', 'bioverIsEditable']),
  },
  methods: {
    getPosition(event) {
      if (event.latlng && this.getCurrentBioverId !== -1) {
        if ((this.ownOrPublic(this.getCurrentBioverId) === 'public' && !this.bioverIsEditable(this.getCurrentBioverId))) {
          return;
        }
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
