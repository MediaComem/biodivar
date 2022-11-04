<script setup>
  import { ref, onMounted, onUnmounted, computed } from '@vue/runtime-core';

  import { mapStore } from '../../composables/map';
  import { useStore } from '../../composables/store';
  import { store } from '../../store/store.js';

  import BaseUserMarker from './BaseUserMarker.vue';
  import BasePoi from './BasePoi.vue';
  import BasePath from './BasePath.vue';

  import ThePoiEditor from '../TheAdmin/biovers/Dialog/ThePoiEditor.vue';

  const KEY = import.meta.env.VITE_APP_MAP_KEY;

  const { map, position, mapYPosition } = mapStore();

  const { selectedBiovers } = useStore();

  const showCreationDialog = ref(false);
  const latlng = ref(undefined);
  const couldCreate = ref(false);

  const ownOrPublic = computed(() => store.getters['biovers/ownOrPublic'])
  const bioverIsEditable = computed(() => store.getters['biovers/bioverIsEditable'])
  const getMetersInPixel = computed(() => 40075016.686 * Math.abs(Math.cos(map.value.getCenter().lat * Math.PI/180)) / Math.pow(2, map.value.getZoom()+8));

  function poiCreatorController(event) {
    couldCreate.value = event.detail;
  }

  function isAllowedToEdit(bioverId) {
    return (ownOrPublic.value(bioverId) === 'public' && !bioverIsEditable.value(bioverId));
  }

  function getPosition(event) {
    if (couldCreate.value && event.latlng) {
      if (isAllowedToEdit(selectedBiovers.value.id)) {
        return;
      }
      latlng.value = event.latlng;
      showCreationDialog.value = true;
    }
  }

  onMounted(() => {
    window.addEventListener('poi-creator-control-ra', poiCreatorController);
    map.value = L.map('map', {zoomControl: false}).setView(position.value, 18);
    const dark = L.tileLayer(`https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/{z}/{x}/{y}.png?key=${KEY}`, {
        minZoom: 3,
        maxZoom: 22,
        attribution: ''
    }).addTo(map.value);
    map.value.on('click', getPosition);
    L.closeMap().addTo(map.value);
    L.poiCreatorRa().addTo(map.value);
  })

  onUnmounted(() => {
    window.removeEventListener('poi-creator-control-ra', poiCreatorController);
    map.value = null;
  })

</script>

<template>
  <div class="content" :style="{'top': mapYPosition + 25 + 'px'}">
    <div id="map" >
        <BaseUserMarker v-if="map" />
        <div v-if="map">
            <div v-for="(poi, index) of selectedBiovers.Poi" :key="index">
                <BasePoi :admin="false" :poi="poi" :meter="getMetersInPixel" :selected="0"/>
            </div>
        </div>
        <div v-if="map">
            <div v-for="(path, index) of selectedBiovers.Path" :key="index">
                <BasePath :admin="false" :coordinate="path.coordinate"/>
            </div>
        </div>
    </div>
  </div>
  <ThePoiEditor :showDialog="showCreationDialog" :isEdit="false" :coordinate="latlng" :bioversId="selectedBiovers.id"
    @close-dialog="showCreationDialog = false" @close-after-save="showCreationDialog = false"/>
</template>

<style scoped>
  .content {
    position: fixed !important;
    height: 95vh;
    width: 100vw;
    left: 0;
    z-index: 100;
  }

  #map {
    height: 100%;
    width: 100%;
  }
</style>