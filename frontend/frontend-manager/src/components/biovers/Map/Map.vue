<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import {
  LMap,
  LTileLayer,
} from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

import Poi from './Poi.vue';
import Path from './Path.vue';
import PoiCreator from '../Dialog/PoiCreator.vue';
import PoiEdition from '../Dialog/PoiEdition.vue';

const showCreationDialog = ref(false);
const showEditionDialog = ref(false);
const poiToUpdate = ref({});
const latlng = ref({});
const zoom = ref(15);
const minZoom = ref(1);
const maxZoom = ref(22);
const center = ref([46.7809153620790993954869918525218963623046875,
  6.64862875164097832936249687918461859226226806640625]);

const store = useStore();

const getPois = computed(() => store.getters['biovers/getPois']);
const getPaths = computed(() => store.getters['biovers/getPaths']);
const ownOrPublic = computed(() => store.getters['biovers/ownOrPublic']);
const getCurrentBioverId = computed(() => store.getters['biovers/getCurrentBioverId']);
const bioverIsEditable = computed(() => store.getters['biovers/bioverIsEditable']);

const mapUrl = computed(() => `https://api.maptiler.com/maps/50a99959-5522-4b4a-8489-28de9d3af0ed/{z}/{x}/{y}.png?key=${process.env.VUE_APP_MAP_KEY}`);

function getPosition(event) {
  if (event.latlng && getCurrentBioverId.value !== -1) {
    if ((ownOrPublic.value(getCurrentBioverId.value) === 'public' && !bioverIsEditable.value(getCurrentBioverId.value))) {
      return;
    }
    latlng.value = event.latlng;
    showCreationDialog.value = true;
  }
}

function openPoiEdition(event) {
  poiToUpdate.value = { poi: event };
  showEditionDialog.value = true;
}
</script>

<template>
  <div class="map-layout">
    <l-map :min-zoom="minZoom" :max-zoom="maxZoom" v-model="zoom" :zoom="zoom"
      :center="center" @click="getPosition">
      <l-tile-layer :url='mapUrl'></l-tile-layer>
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
  </div>
</template>

<style scoped>
.map-layout {
  height: inherit;
}
</style>
