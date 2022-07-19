<script setup>
import { onActivated, computed } from 'vue';
import { useStore } from 'vuex';

import Map from '../components/biovers/Map/Map.vue';
import BioversSelection from '../components/biovers/Data/BioversSelection.vue';
import GeoJsonImporter from '../components/biovers/Import/GeoJsonImporter.vue';
import Filter from '../components/biovers/Data/Filter.vue';

import { mapStore } from '../composables/map';

const { mapOpen } = mapStore();
const store = useStore();

const ownBiovers = computed(() => store.state.biovers.ownBiovers);
const bioversToDisplay = computed(() => store.state.biovers.bioversToDisplay);
const currentBioversId = computed(() => store.state.biovers.currentBioversId);

onActivated(async () => {
  await store.dispatch('biovers/getBiovers');
});
</script>

<template>
  <div>
    <div v-if="mapOpen" style="height: 50vh">
      <Map />
    </div>
    <div
      v-if="currentBioversId !== 0"
      class="upload-layout">
      <div class="import">
        <GeoJsonImporter
          v-if="bioversToDisplay.length > 0 && ownBiovers.length > 0"
          :authorId="ownBiovers[0].owner"
        />
      </div>
      <div class="filter">
        <Filter v-if="bioversToDisplay.length > 0" />
      </div>
    </div>
    <div>
      <BioversSelection />
    </div>
  </div>
</template>

<style scoped>
.upload-layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.import {
  grid-area: 1 / 1 / 2 / 2;
}

.filter {
  grid-area: 1 / 2 / 2 / 3;
}
</style>
