<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

import { savePois, savePaths } from '../../../../utils/api.js';

const store = useStore();

const currentBioversId = computed(() => store.state.biovers.currentBioversId);
const uploadInProgress = computed(() => store.state.biovers.uploadInProgress);
const uploadDone = computed(() => store.state.biovers.uploadDone);

const upload = ref(null);
const couldPublish = ref(false);
const saveDone = ref(false);
const pois = ref([]);
const paths = ref([]);

function setWaiting(state) {
  store.dispatch('global/updateWait', state);
}

function importPois(importedPois) {
  store.dispatch('biovers/importPois', importedPois);
}

function importPaths(importedPaths) {
  store.dispatch('biovers/importPaths', importedPaths);
}

function resetUpload() {
  store.dispatch('biovers/resetUpload');
}

function updateImportPois(updatedPois) {
  store.dispatch('biovers/updateImportPois', updatedPois);
}

function updateImportPaths(updatedPaths) {
  store.dispatch('biovers/updateImportPaths', updatedPaths);
}

function createPathCoordinates(coordiantes) {
  const pathCoordiantes = [];
  coordiantes.forEach((coordiante) => pathCoordiantes.push({
    long: coordiante[0],
    lat: coordiante[1],
    alt: coordiante[2] || 0,
  }));
  return pathCoordiantes;
}

function createPoi(poi) {
  return {
    title: poi.properties.title,
    subtitle: '',
    coordinate: {
      long: poi.geometry.coordinates[0],
      lat: poi.geometry.coordinates[1],
      alt: poi.geometry.coordinates[2],
      creation_date: new Date(),
    },
    position: {
      distance: 0,
      rotation: 0,
      elevation: 0,
    },
    biovers: currentBioversId,
    extrusion: 0,
    radius: 2,
    style_type: 'circle',
    style_stroke_width: 0.1,
    stroke_color: '#FFFFFF',
    stroke_opacity: 40,
    fill_type: false,
    fill_color: '#FFFFFF',
    fill_opacity: 20,
    amplitude: 0,
    wireframe: false,
    scope: 50,
    trigger_mode: 'location',
    map_url: '',
    map_media_type: '',
  };
}

function createPath(coordinates) {
  return {
    coordinate: createPathCoordinates(coordinates),
    biovers: currentBioversId,
    radius: 15.5,
    style_type: 'sphere',
    style_stroke: true,
    style_stroke_width: 1.2,
    style_elevation: 16.4,
    amplitude: 22.3,
    style_is_visible: true,
    scope: 455.5,
  };
}

function createElement(data) {
  if (data.geometry.type === 'Point') {
    pois.value.push(createPoi(data));
  } else if (data.geometry.type === 'LineString') {
    paths.value.push(createPath(data.geometry.coordinates));
  }
}

function sent(event) {
  const result = event.detail.features;

  result.forEach((feature) => {
    createElement(feature);
  });
  importPois(pois.value);
  importPaths(paths.value);
  couldPublish.value = true;
}

function handleExceed() {
  setWaiting(true)
  if (upload.value.uploadFiles.length > 1) {
    upload.value.uploadFiles.splice(0, 1);
  }
  sent();
  setWaiting(false)
}

async function save() {
  if (!couldPublish.value) return;
  setWaiting(true)
  if (pois.value.length > 0) {
    const createdPois = await savePois(pois.value);
    updateImportPois(createdPois.data);
  }

  if (paths.value.length > 0) {
    const createdPaths = await savePaths(paths.value);
    updateImportPaths(createdPaths.data);
  }

  resetUpload();
  setWaiting(false);
  saveDone.value = true;
  setTimeout(() => {
    saveDone.value = false;
    couldPublish.value = false;
  }, 2000);
}

onMounted(() => {
  window.addEventListener('custom-upload-control', sent);
})

onUnmounted(() => {
  window.removeEventListener('custom-upload-control', sent);
})
</script>

<template>
  <div class="action-layout" :class="{'margin-layout': !couldPublish}">
    <base-button v-if="couldPublish" class="button" @click="save">
      <p class="material-symbols-sharp icon-margin icon-font">publish</p><p class="button-text">Enregistrer les modifications</p>
    </base-button>
    <template v-if="saveDone">
      <el-alert :title="$t('import.result')" type="success" />
    </template>
  </div>
</template>

<style scoped>
.action-layout {
  display: flex;
  flex-wrap: wrap;
}

.margin-layout {
  margin-top: 1rem;
}

.button {
  --link-color: white;
  --highlight-color: #2F80ED;
  margin: 1rem !important;
  padding-left: 15px !important;
  padding-right: 15px !important;
}

.button > p {
  margin: 0px;
}

.header-icon-layout {
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon-font {
    font-size: 20px;
  }

  .icon-margin {
    margin: 0px;
    padding-right: 6px;
  }

  .button-text {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-bottom: 1.5px;
    font-variation-settings: "wght" 149, "ital" 0;
  }
</style>
