<template>
  <l-map ref="map" :min-zoom='minZoom' :max-zoom='maxZoom' :bounds='boundingBox' @click="getPosition">
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
    <PoiCreator :showDialog="showCreationDialog" :coordinate="latlng"
    @close-dialog="showCreationDialog = false" />
    <PoiEdition v-if="showEditionDialog" :poi="poiToUpdate" :showDialog="showEditionDialog"
    @close-dialog="showEditionDialog = false"/>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LControlLayers,
} from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

import { mapGetters, mapState } from 'vuex';

import Poi from './Poi.vue';
import Path from './Path.vue';
import PoiCreator from '../Dialog/PoiCreator.vue';
import PoiEdition from '../Dialog/PoiEdition.vue';

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
    PoiCreator,
    PoiEdition,
  },
  data() {
    return {
      showCreationDialog: false,
      showEditionDialog: false,
      poiToUpdate: undefined,
      latlng: undefined,
      unsubscribeActions: null,
      minZoom: 1,
      maxZoom: 19,
      boundingBox: [[-90, -180],[90,  180]],
    };
  },
  computed: {
    mapUrl() {
      return `https://api.maptiler.com/maps/50a99959-5522-4b4a-8489-28de9d3af0ed/{z}/{x}/{y}.png?key=${KEY}`;
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
        this.latlng = event.latlng;
        this.showCreationDialog = true;
      }
    },
    openPoiEdition(event) {
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
      console.log(this.pois)
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
      console.log(boundingBox);
      this.boundingBox = [[boundingBox.minlat, boundingBox.minlong],[boundingBox.maxlat, boundingBox.maxlong]];
    },
  },
  mounted() {
    this.unsubscribeActions = this.$store.subscribeAction({
      after: (action) => {
        if (action.type === 'biovers/addBioverToDisplay' || action.type === 'biovers/removeBioverToDisplay'|| action.type === 'biovers/updateImportPois' || action.type === 'biovers/importPaths' || action.type === 'biovers/getBiovers') {
          this.computeBoxingBox();
        }
      }
    });
  },
  unmounted() {
    this.unsubscribeActions();
  }
};
</script>
