<script setup>
  import { onMounted, onUnmounted, computed } from '@vue/runtime-core';

  import { mapStore } from '../../composables/map';
  import { useStore } from '../../composables/store';

  import BaseUserMarker from './BaseUserMarker.vue';
  import BasePoi from './BasePoi.vue';
  import BasePath from './BasePath.vue';

  const KEY = import.meta.env.VITE_APP_MAP_KEY;

  const { map, position, mapYPosition } = mapStore();

  const { selectedBiovers } = useStore();

  const getMetersInPixel = computed(() => 40075016.686 * Math.abs(Math.cos(map.value.getCenter().lat * Math.PI/180)) / Math.pow(2, map.value.getZoom()+8));

  onMounted(() => {
    map.value = L.map('map', {zoomControl: false}).setView(position.value, 18);
    const dark = L.tileLayer(`https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/{z}/{x}/{y}.png?key=${KEY}`, {
        minZoom: 3,
        maxZoom: 22,
        attribution: ''
    }).addTo(map.value);
    L.closeMap().addTo(map.value);
  })

  onUnmounted(() => {
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
</template>

<style scoped>
  .content {
    position: fixed !important;
    height: 95vh;
    width: 100vw;
    left: 0;
  }

  #map {
    height: 100%;
    width: 100%;
  }
</style>