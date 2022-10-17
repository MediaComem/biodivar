<template>
  <l-map ref="map" :min-zoom='minZoom' :max-zoom='maxZoom' :bounds='boundingBox' @click="getPosition">
    <l-tile-layer
      :url="mapDark"
      layer-type="base"
      name="Dark"
      attribution=""
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
            || (ownOrPublic(poi.element.biovers) === 'public')) && poi.element.coordinate"
            :poi="poi"
            :meter="meterInPixel"
            @update-poi="openPoiEdition"
          />
      </div>
    </l-map>
    <ThePoiEditor :showDialog="showCreationDialog" :isEdit="false" :coordinate="latlng"
    @close-dialog="showCreationDialog = false" />
    <ThePoiEditor :isEdit="true" :poi="poiToUpdate" :showDialog="showEditionDialog"
    @close-dialog="showEditionDialog = false"/>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LControlLayers,
} from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

import { mapGetters, mapState, mapActions } from 'vuex';

import Poi from './Poi.vue';
import Path from './Path.vue';
import ThePoiEditor from '../Dialog/ThePoiEditor.vue';

const KEY = import.meta.env.VITE_APP_MAP_KEY;

export default {
  watch: {
    bioversToDisplay: {
      handler() {
        this.computeBoxingBox();
      },
      deep: true
    }
  },
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    Poi,
    Path,
    ThePoiEditor,
  },
  data() {
    return {
      showCreationDialog: false,
      showEditionDialog: false,
      poiToUpdate: undefined,
      latlng: undefined,
      unsubscribeActions: null,
      minZoom: 3,
      maxZoom: 22,
      boundingBox: [[-90, -180],[90,  180]],
      meterInPixel: 0,
      zoom: 0,
      map: undefined,
    };
  },
  computed: {
    mapUrl() {
      return `https://api.maptiler.com/maps/50a99959-5522-4b4a-8489-28de9d3af0ed/{z}/{x}/{y}.png?key=${KEY}`;
    },
    mapDark() {
      return `https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/{z}/{x}/{y}.png?key=${KEY}`
    },
    ...mapState('biovers', ['pois']),
    ...mapGetters('biovers', ['getPois', 'getPaths', 'ownOrPublic', 'getCurrentBioverId', 'bioverIsEditable']),
  },
  methods: {
    getPosition(event) {
      if (event.latlng && this.getCurrentBioverId !== -1) {
        if ((this.ownOrPublic(this.getCurrentBioverId) === 'public' && !this.bioverIsEditable(this.getCurrentBioverId))) {
          return;
        }
        this.updateWait(true);
        this.latlng = event.latlng;
        this.showCreationDialog = true;
      }
    },
    openPoiEdition(event) {
      if ((this.ownOrPublic(this.getCurrentBioverId) === 'public' && !this.bioverIsEditable(this.getCurrentBioverId))) {
          return;
      }
      this.updateWait(true);
      this.poiToUpdate = { poi: event };
      this.showEditionDialog = true;
    },
    computeBoxingBox() {
      const boundingBox = {
        minlat: 90,
        maxlat: -90,
        minlong: 180,
        maxlong: -180,
      };
      this.pois.forEach((poisOfBiover) => {
        poisOfBiover.pois.forEach((poi) => {
          if (poi.element.coordinate) {
            if (poi.element.coordinate.lat < boundingBox.minlat) boundingBox.minlat = poi.element.coordinate.lat;
            if (poi.element.coordinate.lat > boundingBox.maxlat) boundingBox.maxlat = poi.element.coordinate.lat;
            if (poi.element.coordinate.long < boundingBox.minlong) boundingBox.minlong = poi.element.coordinate.long;
            if (poi.element.coordinate.long > boundingBox.maxlong) boundingBox.maxlong = poi.element.coordinate.long;
          }
        })
      });
      this.boundingBox = [[boundingBox.minlat, boundingBox.minlong],[boundingBox.maxlat, boundingBox.maxlong]];
    },
    ...mapActions('global', ['updateWait']),
  },
  mounted() {
    this.map = this.$refs.map;
    setInterval(() => {
      const zoom = this.$refs.map.leafletObject._zoom;
      this.meterInPixel = 40075016.686 * Math.abs(Math.cos(this.map.center[1] * Math.PI/180)) / Math.pow(2, zoom+8);
    }, 1000)
    this.unsubscribeActions = this.$store.subscribeAction({
      after: (action) => {
        if (action.type === 'biovers/addBioverToDisplay' || action.type === 'biovers/removeBioverToDisplay'|| action.type === 'biovers/updateImportPois' || action.type === 'biovers/importPaths' || action.type === 'biovers/getBiovers') {
          this.computeBoxingBox();
        }
      }
    });
  },
  unmounted() {
    this.map = undefined;
    this.unsubscribeActions();
  }
};
</script>
