<script setup>
  import { onMounted, onUnmounted, ref, computed, watch } from '@vue/runtime-core';

  import { useStore } from 'vuex';

  import ThePoiEditor from '../Dialog/ThePoiEditor.vue';
  import BasePoi from '../../../TheMap/BasePoi.vue';
  import BasePath from '../../../TheMap/BasePath.vue';

  const KEY = import.meta.env.VITE_APP_MAP_KEY;

  const store = useStore();

  const map = ref(undefined);

  const latlng = ref(undefined);
  const showCreationDialog = ref(false);
  const showEditionDialog = ref(false);
  const poiToUpdate = ref({});

  const pois = computed(() => store.state.biovers.pois);
  const getPois = computed(() => {
    return store.getters['biovers/getPois']
  });
  const getPaths = computed(() => store.getters['biovers/getPaths']);
  const getMetersInPixel = computed(() => 40075016.686 * Math.abs(Math.cos(map.value.getCenter().lat * Math.PI/180)) / Math.pow(2, map.value.getZoom()+8));

  function updateWait(state) {
    store.dispatch('global/updateWait', state);
  }

  function getPosition(event) {
      if (event.latlng && this.getCurrentBioverId !== -1) {
        updateWait(true);
        latlng.value = event.latlng;
        showCreationDialog.value = true;
      }
  }

  function openPoiEdition(event) {
      updateWait(true);
      poiToUpdate.value = { poi: event };
      showEditionDialog.value = true;
    }

  function computeBoxingBox() {
      const boundingBox = {
        minlat: 90,
        maxlat: -90,
        minlong: 180,
        maxlong: -180,
      };
      pois.value.forEach((poisOfBiover) => {
        poisOfBiover.pois.forEach((poi) => {
          if (poi.element.coordinate) {
            if (poi.element.coordinate.lat < boundingBox.minlat) boundingBox.minlat = poi.element.coordinate.lat;
            if (poi.element.coordinate.lat > boundingBox.maxlat) boundingBox.maxlat = poi.element.coordinate.lat;
            if (poi.element.coordinate.long < boundingBox.minlong) boundingBox.minlong = poi.element.coordinate.long;
            if (poi.element.coordinate.long > boundingBox.maxlong) boundingBox.maxlong = poi.element.coordinate.long;
          }
        })
      });
      map.value.fitBounds([[boundingBox.minlat, boundingBox.minlong],[boundingBox.maxlat, boundingBox.maxlong]]);
    }

    watch(() => pois, () => {
        computeBoxingBox();
    }, { deep: true });

  onMounted(() => {
    map.value = L.map('map').setView([0, 0], 7);
    L.tileLayer(`https://api.maptiler.com/maps/50a99959-5522-4b4a-8489-28de9d3af0ed/{z}/{x}/{y}.png?key=${KEY}`, {
        minZoom: 1,
        maxZoom: 19,
        name: "Base",
        attribution: '© BiodivAR'
    }).addTo(map.value);
    map.value.on('click', getPosition);
  })

  onUnmounted(() => {
      map.value = null;
  })

</script>

<template>
    <div id="map">
        <div v-if="map">
            <div v-for="(poi, index) of getPois" :key="index">
                <BasePoi :map="map" :poi="poi.element" :meter="getMetersInPixel" @update-poi="openPoiEdition"/>
            </div>
        </div>
        <div v-if="map">
            <div v-for="(path, index) of getPaths" :key="index">
                <BasePath :map="map" :coordinate="path.element.coordinate"/>
            </div>
        </div>
    </div>
    <ThePoiEditor :showDialog="showCreationDialog" :isEdit="false" :coordinate="latlng"
    @close-dialog="showCreationDialog = false" />
    <ThePoiEditor :isEdit="true" :poi="poiToUpdate" :showDialog="showEditionDialog"
    @close-dialog="showEditionDialog = false"/>
</template>

<style scoped>
  #map {
    height: 100%;
    width: 100%;
  }
</style>