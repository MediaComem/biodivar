<script setup>
  import { ref, onMounted, onUnmounted, computed } from '@vue/runtime-core';

  import { mapStore } from '../../composables/map';
  import { useStore } from '../../composables/store';
  import { store } from '../../store/store.js';

  import BaseUserMarker from './BaseUserMarker.vue';
  import BasePoi from './BasePoi.vue';
  import BasePath from './BasePath.vue';

  import ThePoiEditor from '../TheAdmin/biovers/Dialog/ThePoiEditor.vue';
  import ThePathEditor from '../TheAdmin/biovers/Dialog/ThePathEditor.vue';

  const KEY = import.meta.env.VITE_APP_MAP_KEY;

  const { map, position, mapYPosition, couldMove, maxHeightMap } = mapStore();

  const { selectedBiovers } = useStore();

  const showCreationDialog = ref(false);
  const latlng = ref(undefined);
  const couldCreate = ref(false);
  const showEditionDialog = ref(false);
  const showPathEditionDialog = ref(false);
  const poiToUpdate = ref({});
  const pathToUpdate = ref({});
  const mapContainer = ref(null);
  const observer = ref(null);
  const clickPoi = ref(0);

  const ownOrPublic = computed(() => store.getters['biovers/ownOrPublic'])
  const bioverIsEditable = computed(() => store.getters['biovers/bioverIsEditable'])
  const getMetersInPixel = computed(() => 40075016.686 * Math.abs(Math.cos(map.value.getCenter().lat * Math.PI/180)) / Math.pow(2, map.value.getZoom()+8));

  function updateWait(state) {
    store.dispatch('global/updateWait', state);
  }

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

  function openPoiEdition(event) {
    if (isAllowedToEdit(event.biovers)) {
      return;
    }
    
    clickPoi.value = 0;
    showCreationDialog.value = false;
    poiToUpdate.value = { poi: event };
    showEditionDialog.value = true;
  }

  function openPathEdition(event) {
      if (isAllowedToEdit(event.biovers)) {
        return;
      }
      updateWait(true);
      pathToUpdate.value = { path: event };
      showPathEditionDialog.value = true;
    }

  function closeCreationDialog() {
    showCreationDialog.value = false
    window.dispatchEvent(new CustomEvent('close-poi-editor-ra', {}));
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
    if (!isAllowedToEdit(selectedBiovers.value.id)) {
      L.poiCreatorRa().addTo(map.value);
    }
    

    observer.value = new ResizeObserver(() => {
      map.value.invalidateSize();
    });
    observer.value.observe(mapContainer.value);
  })

  onUnmounted(() => {
    observer.value.disconnect();
    window.removeEventListener('poi-creator-control-ra', poiCreatorController);
    map.value = null;
  })

</script>

<template>
  <div ref="mapContainer" class="content" :class="{'transition': !couldMove}" :style="{'height': maxHeightMap - mapYPosition + 'px', 'top': mapYPosition + 25 + 'px'}">
    <div id="map" >
        <BaseUserMarker v-if="map" />
        <div v-if="map">
            <div v-for="(poi, index) of selectedBiovers.Poi" :key="index">
                <BasePoi :admin="false" :poi="poi" :meter="getMetersInPixel" :selected="clickPoi" :editable="!isAllowedToEdit(selectedBiovers.id)" @update-poi="openPoiEdition" @open-popup="clickPoi = $event"/>
            </div>
        </div>
        <div v-if="map">
            <div v-for="(path, index) of selectedBiovers.Path" :key="index">
                <BasePath :admin="false" :coordinate="path.coordinate" :path="path" :editable="!isAllowedToEdit(selectedBiovers.id)" @update-path="openPathEdition"/>
            </div>
        </div>
    </div>
  </div>
  <ThePoiEditor :poi="poiToUpdate" :showDialog="showEditionDialog"
    @close-dialog="showEditionDialog = false" @close-after-save="showEditionDialog = false"/>
  <ThePathEditor :path="pathToUpdate" :showDialog="showPathEditionDialog" @close-dialog="showPathEditionDialog = false" @close-after-save="showPathEditionDialog = false"/>
</template>

<style scoped>
  .content {
    position: fixed !important;
    width: 100vw;
    left: 0;
    z-index: 100;
  }

  .transition {
    transition: top 200ms ease;
  }

  #map {
    height: 100%;
    width: 100%;
  }
</style>