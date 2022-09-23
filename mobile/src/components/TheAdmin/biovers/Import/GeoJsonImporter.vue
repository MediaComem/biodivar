<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import BioverCreator from '../Dialog/BioverCreator.vue';

import { savePois, savePaths } from '../../../../utils/api.js';

const store = useStore();

const currentBioversId = computed(() => store.state.biovers.currentBioversId);
const uploadInProgress = computed(() => store.state.biovers.uploadInProgress);
const uploadDone = computed(() => store.state.biovers.uploadDone);

const bioversCreator = ref(false);
const upload = ref(null);
const couldPublish = ref(false);
const saveDone = ref(false);
const pois = ref([]);
const paths = ref([]);

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

function openBioversCreator() {
  bioversCreator.value = true;
}

function closeBioversCreator() {
  bioversCreator.value = false;
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
    title: poi.properties.common_name.fr,
    title_is_visible: true,
    subtitle: '',
    subtitle_is_visible: false,
    coordinate: {
      long: poi.geometry.coordinates[0],
      lat: poi.geometry.coordinates[1],
      alt: poi.geometry.coordinates[2],
      creation_date: new Date(),
    },
    position: {
      distance: 0,
      alpha: 0,
      height: 0,
    },
    biovers: currentBioversId,
    extrusion: 0,
    radius: 0,
    style_type: 'circle',
    style_stroke_width: 1,
    stroke_color: '#FFFFFF',
    stroke_opacity: 100,
    fill_type: false,
    fill_color: '#FFFFFF',
    fill_opacity: 100,
    amplitude: 22.3,
    wireframe: false,
    scope: 50,
    trigger_mode: 'location',
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

function sent() {
  let fileContent = '';

  const fr = new FileReader();
  fr.onload = () => {
    fileContent = fr.result;
    const result = JSON.parse(fileContent);
    if (Array.isArray(result)) {
      result.forEach((type) => {
        type.features.forEach((data) => {
          createElement(data);
        });
      });
    } else {
      result.features.forEach((data) => {
        createElement(data);
      });
    }
    importPois(pois.value);
    importPaths(paths.value);
    couldPublish.value = true;
  };
  if (upload.value.uploadFiles) {
    fr.readAsText(upload.value.uploadFiles[0].raw);
  }
}

function handleExceed() {
  if (upload.value.uploadFiles.length > 1) {
    upload.value.uploadFiles.splice(0, 1);
  }
  sent();
}

async function save() {
  if (!couldPublish.value) return;
  if (pois.value.length > 0) {
    const createdPois = await savePois(pois.value);
    updateImportPois(createdPois.data);
  }

  if (paths.value.length > 0) {
    const createdPaths = await savePaths(paths.value);
    updateImportPaths(createdPaths.data);
  }

  resetUpload();
  upload.value.uploadFiles.splice(0, 1);
  saveDone.value = true;
  setTimeout(() => {
    saveDone.value = false;
    couldPublish.value = false;
  }, 2000);
}
</script>

<template>
  <div class="action-layout">
    <base-button class="button" @click="openBioversCreator">
      <p class="material-symbols-sharp text-formatting">add_circle</p> Créer un nouveau biovers
    </base-button>
    <BioverCreator :showDialog="bioversCreator" @closeDialog="closeBioversCreator"/>
    <el-upload
      ref="upload"
      style="display: flex;"
      accept=".json,.geojson"
      action="https://jsonplaceholder.typicode.com/posts/"
      :auto-upload="false"
      :on-change="handleExceed"
    >
      <template #trigger>
        <base-button class="button">
          <p class="material-symbols-sharp text-formatting">upload_file</p> Importer .json
        </base-button>
      </template>
      <base-button :class="{button: couldPublish, disable: !couldPublish}" @click="save">
        <p class="material-symbols-sharp text-formatting">publish</p> Publier
      </base-button>
    </el-upload>
    <template v-if="saveDone">
      <el-alert :title="$t('import.result')" type="success" />
    </template>
  </div>
</template>

<style scoped>
.action-layout {
  display: flex;
}

.button {
  --link-color: white;
  --highlight-color: #2F80ED;
  width: auto !important;
  margin: 1rem !important;
  padding-left: 15px !important;
  padding-right: 15px !important;
}

.disable {
  --link-color: white;
  --highlight-color: #2f81ed69;
  width: auto !important;
  margin: 1rem !important;
  padding-left: 15px !important;
  padding-right: 15px !important;
}

.button > p {
  margin: 0px;
}

.el-upload {
  padding-right: 15px;
}

.text-formatting {
  margin: 0
}
</style>
