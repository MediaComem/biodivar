<script setup>
  import { onMounted, onUnmounted } from '@vue/runtime-core';

  import { mapStore } from '../../composables/map';
  import { useStore } from '../../composables/store';

  import BaseUserMarker from './BaseUserMarker.vue';
  import BasePoi from './BasePoi.vue';
  import BasePath from './BasePath.vue';

  const { map, position } = mapStore();

  const { selectedBiovers } = useStore();

  onMounted(() => {
    map.value = L.map('map').setView(position.value, 18);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 1,
        maxZoom: 19,
        attribution: '© BiodivAR'
    }).addTo(map.value);
  })

  onUnmounted(() => {
      map.value = null;
  })

</script>

<template>
    <div id="map">
        <BaseUserMarker v-if="map" />
        <div v-if="map">
            <div v-for="(poi, index) of selectedBiovers.Poi" :key="index">
                <BasePoi :poi="poi" :symbol="poi"/>
            </div>
        </div>
        <div v-if="map">
            <div v-for="(path, index) of selectedBiovers.Path" :key="index">
                <BasePath :coordinate="path.coordinate"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
  #map {
    position: absolute !important;
    height: 90vh;
    width: 90vw;
    top: 5vh;
    left: 5vw;
    z-index: 1000;
  }
</style>