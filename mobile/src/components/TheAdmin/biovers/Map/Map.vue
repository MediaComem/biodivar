<script setup>
  import { onMounted, onUnmounted, ref, computed, watch } from '@vue/runtime-core';

  import { mapStore } from '../../../../composables/map.js';
  import { store } from '../../../../store/store.js';

  import ThePoiEditor from '../Dialog/ThePoiEditor.vue';
  import BasePoi from '../../../TheMap/BasePoi.vue';
  import BasePath from '../../../TheMap/BasePath.vue';

  const KEY = import.meta.env.VITE_APP_MAP_KEY;

  const { mapAdmin } = mapStore();

  const latlng = ref(undefined);
  const showCreationDialog = ref(false);
  const showEditionDialog = ref(false);
  const poiToUpdate = ref({});

  const pois = computed(() => store.state.biovers.pois);
  const getPois = computed(() => {
    return store.getters['biovers/getPois']
  });
  const getPaths = computed(() => store.getters['biovers/getPaths']);
  const ownOrPublic = computed(() => store.getters['biovers/ownOrPublic'])
  const bioverIsEditable = computed(() => store.getters['biovers/bioverIsEditable'])
  const getCurrentBioverId = computed(() => store.getters['biovers/getCurrentBioverId'])
  const metersInPixel = ref(0);

  function updateMetersInPixel() {
    metersInPixel.value = 40075016.686 * Math.abs(Math.cos(mapAdmin.value.getCenter().lat * Math.PI/180)) / Math.pow(2, mapAdmin.value.getZoom()+8);
  }

  function updateWait(state) {
    store.dispatch('global/updateWait', state);
  }

  function getPosition(event) {
      if (event.latlng && this.getCurrentBioverId !== -1) {
        if (isAllowedToEdit(getCurrentBioverId.value)) {
          return;
        }
        updateWait(true);
        latlng.value = event.latlng;
        showCreationDialog.value = true;
      }
  }

  function isAllowedToEdit(bioverId) {
    return (ownOrPublic.value(bioverId) === 'public' && !bioverIsEditable.value(bioverId));
  }

  function openPoiEdition(event) {
      if (isAllowedToEdit(event.biovers)) {
          return;
      }
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
      mapAdmin.value.fitBounds([[boundingBox.minlat, boundingBox.minlong],[boundingBox.maxlat, boundingBox.maxlong]]);
    }

    watch(() => pois, () => {
        computeBoxingBox();
    }, { deep: true });

  onMounted(() => {
    mapAdmin.value = L.map('map').setView([0, 0], 7);
    /*const base = L.tileLayer(`https://api.maptiler.com/maps/50a99959-5522-4b4a-8489-28de9d3af0ed/{z}/{x}/{y}.png?key=${KEY}`, {
        minZoom: 3,
        maxZoom: 22,
        attribution: 'BiodivAR'
    }).addTo(map.value);*/
    const dark = L.tileLayer(`https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/{z}/{x}/{y}.png?key=${KEY}`, {
        minZoom: 3,
        maxZoom: 22,
        attribution: 'BiodivAR'
    }).addTo(mapAdmin.value);
    /*var baseLayers = {
      "Dark": dark,
      "Base": base
    };
    L.control.layers(baseLayers).addTo(map.value);*/
    mapAdmin.value.on('click', getPosition);
    mapAdmin.value.on('zoomend', updateMetersInPixel);
    mapAdmin.value.whenReady(() => {
      computeBoxingBox();
      updateMetersInPixel();
    });
  })

  onUnmounted(() => {
      mapAdmin.value = null;
  })

</script>

<template>
    <div id="map">
        <div v-if="mapAdmin">
            <div v-for="(poi, index) of getPois" :key="index">
                <BasePoi :admin="true" :poi="poi.element" :meter="metersInPixel" :selected="poi.display" @update-poi="openPoiEdition"/>
            </div>
        </div>
        <div v-if="mapAdmin">
            <div v-for="(path, index) of getPaths" :key="index">
                <BasePath :admin="true" :coordinate="path.element.coordinate"/>
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