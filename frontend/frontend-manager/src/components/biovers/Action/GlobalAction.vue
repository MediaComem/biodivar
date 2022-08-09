<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import BioverCreator from '../Dialog/BioverCreator.vue';

import poiAPI from '../../../api/poi';
import pathAPI from '../../../api/path';

const store = useStore();

const currentBioversId = computed(() => store.state.biovers.currentBioversId);
const uploadInProgress = computed(() => store.state.biovers.uploadInProgress);
const uploadDone = computed(() => store.state.biovers.uploadDone);

const bioversCreator = ref(false);
const upload = ref(null);
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
    is_public: false,
    is_editable: false,
    coordinate: {
      long: poi.geometry.coordinates[0],
      lat: poi.geometry.coordinates[1],
      alt: poi.geometry.coordinates[2],
    },
    biovers: currentBioversId,
    radius: 15.5,
    style_type: 'sphere',
    style_stroke: true,
    style_stroke_width: 1.2,
    style_fill: false,
    style_elevation: 16.4,
    style_elevation_ground: 32.4,
    style_noise: 22.3,
    style_is_visible: true,
    visible_from: 455.5,
    trigger_mode: 'location',
  };
}

function createPath(coordinates) {
  return {
    is_public: false,
    is_editable: false,
    coordinate: createPathCoordinates(coordinates),
    biovers: currentBioversId,
    radius: 15.5,
    style_type: 'sphere',
    style_stroke: true,
    style_stroke_width: 1.2,
    style_elevation: 16.4,
    style_elevation_ground: 32.4,
    style_noise: 22.3,
    style_is_visible: true,
    visible_from: 455.5,
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
  };
  fr.readAsText(upload.value.uploadFiles[0].raw);
}

function handleExceed() {
  if (upload.value.uploadFiles.length > 1) {
    upload.value.uploadFiles.splice(0, 1);
  }
  sent();
}

async function save() {
  if (pois.value.length > 0) {
    const createdPois = await poiAPI.savePois(pois.value);
    updateImportPois(createdPois.data.data);
  }

  if (paths.value.length > 0) {
    const createdPaths = await pathAPI.savePaths(paths.value);
    updateImportPaths(createdPaths.data.data);
  }

  resetUpload();
  upload.value.uploadFiles.splice(0, 1);
  saveDone.value = true;
  setTimeout(() => {
    saveDone.value = false;
  }, 2000);
}
</script>

<template>
  <div class="action-layout">
    <BaseButton class="button" @click="openBioversCreator">
      <img src="../../../assets/body/add.svg" alt="add">
      Créer un nouveau biovers
    </BaseButton>
    <BioverCreator :showDialog="bioversCreator" @closeDialog="closeBioversCreator"/>
    <el-upload
      ref="upload"
      class="upload-demo"
      style="display: flex;"
      accept=".json,.geojson"
      action="https://jsonplaceholder.typicode.com/posts/"
      :auto-upload="false"
      :on-change="handleExceed"
    >
      <template #trigger>
       <BaseButton v-if="currentBioversId !== 0" class="button">
          <img src="../../../assets/body/upload.svg" alt="add">
          Importer .json
        </BaseButton>
      </template>
      <BaseButton v-if="currentBioversId !== 0" class="button" @click="save" :disabled="upload && upload.uploadFiles.length === 0">
        <img src="../../../assets/body/publish.svg" alt="add">
        Publier
      </BaseButton>
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
}

.el-upload {
  padding-right: 15px;
}
</style>
