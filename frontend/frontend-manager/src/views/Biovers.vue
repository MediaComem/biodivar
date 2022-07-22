<script setup>
import { onActivated } from 'vue';
import { useStore } from 'vuex';

import Map from '../components/biovers/Map/Map.vue';
import BioversSelection from '../components/biovers/Data/BioversSelection.vue';
import GlobalAction from '../components/biovers/Action/GlobalAction.vue';
import Filter from '../components/biovers/Data/Filter.vue';

import { mapStore } from '../composables/map';

const { mapOpen } = mapStore();
const store = useStore();

onActivated(async () => {
  await store.dispatch('biovers/getBiovers');
});
</script>

<template>
  <div>
    <div v-if="mapOpen" style="height: 50vh">
      <Map />
    </div>
    <div class="upload-layout">
      <div class="import">
        <GlobalAction />
      </div>
    </div>
    <div>
      <BioversSelection />
    </div>
  </div>
</template>

<style scoped>
.upload-layout {
  width: 100%;
}

.import {
  grid-area: 1 / 1 / 2 / 2;
}

.filter {
  grid-area: 1 / 2 / 2 / 3;
}
</style>
