<script setup>
  import { onMounted, onUnmounted, ref, computed, watch } from '@vue/runtime-core';

  import { mapStore } from '../../../../composables/map.js';
  import { store } from '../../../../store/store.js';
  import { computeGeoJSONFromPOIs } from '../../../../utils/geojson.js';

  import ThePoiEditor from '../Dialog/ThePoiEditor.vue';
  import BasePoi from '../../../TheMap/BasePoi.vue';
  import BasePath from '../../../TheMap/BasePath.vue';
  import BaseEvent from '../../../TheMap/BaseEvent.vue';
  import BaseTrace from '../../../TheMap/BaseTrace.vue';

  const KEY = import.meta.env.VITE_APP_MAP_KEY;

  const { mapAdmin } = mapStore();

  const latlng = ref(undefined);
  const showCreationDialog = ref(false);
  const showEditionDialog = ref(false);
  const shouldNotUpdateBounding = ref(false);
  const poiToUpdate = ref({});
  const mapAdminContainer = ref(null);
  const observer = ref(null);

  const pois = computed(() => store.state.biovers.pois);
  const getPois = computed(() => {
    return store.getters['biovers/getPois']
  });
  const getPaths = computed(() => store.getters['biovers/getPaths']);
  const getEvents = computed(() => store.getters['biovers/getEvents']);
  const getTraces = computed(() => store.getters['biovers/getTracesForDisplay']);
  const getTraceById = computed(() => store.getters['biovers/getTraceById']);
  const ownOrPublic = computed(() => store.getters['biovers/ownOrPublic'])
  const bioverIsEditable = computed(() => store.getters['biovers/bioverIsEditable'])
  const getCurrentBioverId = computed(() => store.getters['biovers/getCurrentBioverId'])
  const getcurrentLastTraceClick = computed(() => store.getters['global/getcurrentLastTraceClick'])
  const metersInPixel = ref(0);

  const clickPoi = ref(0);
  const couldCreate = ref(false);

  const tiles = ref(null);
  const currentAttributions = ref('');

  function closeEditor() {
    showCreationDialog.value = false;
    showEditionDialog.value = false;
    shouldNotUpdateBounding.value = false;
    window.dispatchEvent(new CustomEvent('close-poi-editor', {}));
  }

  function closeCreationEditorAterSave() {
    showCreationDialog.value = false;
    window.dispatchEvent(new CustomEvent('close-poi-editor', {}));
  }

  function updateMetersInPixel() {
    metersInPixel.value = 40075016.686 * Math.abs(Math.cos(mapAdmin.value.getCenter().lat * Math.PI/180)) / Math.pow(2, mapAdmin.value.getZoom()+8);
  }

  function updateWait(state) {
    store.dispatch('global/updateWait', state);
  }

  function getPosition(event) {
      if (couldCreate.value && event.latlng && this.getCurrentBioverId !== -1 && !showEditionDialog.value) {
        if (isAllowedToEdit(getCurrentBioverId.value)) {
          return;
        }
        clickPoi.value = 0;
        updateWait(true);
        shouldNotUpdateBounding.value = true;
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
      clickPoi.value = 0;
      updateWait(true);
      shouldNotUpdateBounding.value = true;
      showCreationDialog.value = false;
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
      mapAdmin.value.flyToBounds([[boundingBox.minlat, boundingBox.minlong],[boundingBox.maxlat, boundingBox.maxlong]], {duration: 1, easeLinearity: 0});
    }

    function poiCreatorController(event) {
      couldCreate.value = event.detail;
    }

    function changeTiles(event) {
      tiles.value.setUrl(event.detail.url);
      mapAdmin.value.attributionControl.removeAttribution(currentAttributions.value);
      currentAttributions.value = event.detail.attribution;
      mapAdmin.value.attributionControl.addAttribution(currentAttributions.value);
    }

    function download(file) {
      const anchor = document.createElement('a');
      anchor.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(file);
      anchor.target = '_blank';
      anchor.download = 'export_poi.json';
      anchor.click();
    }

    function prepareTracesToDisplay(traces) {
      const tracesToDisplay = [];
      let bundle = [];
      let lastTime = null;
      let currentTime = null;

      traces.forEach((trace) => {
        currentTime = Date.parse(trace.element.creation_date);
        if (lastTime != null && trace.display && currentTime - lastTime < 10000) {
          bundle.push(trace.element.coordinate);
        } else {
          if (bundle.length > 0) {
            tracesToDisplay.push(bundle);
            bundle = [];
          }
          if (trace.display) {
            bundle.push(trace.element.coordinate);
          }
        }
        lastTime = currentTime;
      })

      if (bundle.length > 0) {
            tracesToDisplay.push(bundle);
            bundle = [];
          }

      return tracesToDisplay;
    }
    
    function downloadAvailablePois(event) {
      const boundingBox = event.detail;
      const minLat = boundingBox._southWest.lat;
      const maxLat = boundingBox._northEast.lat;
      const minLong = boundingBox._southWest.lng;
      const maxLong = boundingBox._northEast.lng;
      /*const toBeDownload = getPois.value.filter((poi) => {
        const coordinate = poi.element.coordinate;
        return coordinate.lat > minLat && coordinate.lat < maxLat && coordinate.long > minLong && coordinate.long < maxLong;
      })*/
      download(computeGeoJSONFromPOIs(getPois.value))
    }

    watch(() => pois, () => {
      if (shouldNotUpdateBounding.value) {
        shouldNotUpdateBounding.value = false;
      } else {
        computeBoxingBox();
      }
    }, { deep: true });

    watch(() => getcurrentLastTraceClick.value, (newVal) => {
      if (newVal > 0) {
        const trace = getTraceById.value(newVal);
        if (trace != -1) {
          mapAdmin.value.panTo([trace[0].element.coordinate.lat, trace[0].element.coordinate.long], {animate: true, duration: 1, easeLinearity: 0})
        }
      }
    })

  onMounted(() => {
    window.addEventListener('poi-creator-control', poiCreatorController);
    window.addEventListener('custom-download-control', downloadAvailablePois);
    window.addEventListener('custom-tiles-control', changeTiles);

    mapAdmin.value = L.map('map', {zoomAnimation: true, zoomControl: false}).setView([0, 0], 7);
    currentAttributions.value = "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e \u003ca href=\"https://www.swisstopo.admin.ch/en/home.html\" target=\"_blank\"\u003e\u0026copy; swisstopo\u003c/a\u003e";
    tiles.value = L.tileLayer(`https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/{z}/{x}/{y}.png?key=${KEY}`, {
        minZoom: 3,
        maxZoom: 22,
        attribution: currentAttributions.value
    }).addTo(mapAdmin.value);
    
    L.zoomIn().addTo(mapAdmin.value);
    L.zoomOut().addTo(mapAdmin.value);
    L.poiCreator().addTo(mapAdmin.value);
    L.uploadControl().addTo(mapAdmin.value);
    L.downloadControl().addTo(mapAdmin.value);
    L.customTilesController().addTo(mapAdmin.value);

    mapAdmin.value.on('click', getPosition);
    mapAdmin.value.on('zoomend', updateMetersInPixel);
    mapAdmin.value.whenReady(() => {
      computeBoxingBox();
      updateMetersInPixel();
    });

    observer.value = new ResizeObserver(() => {
      mapAdmin.value.invalidateSize();
    });
    observer.value.observe(mapAdminContainer.value);
  })

  onUnmounted(() => {
    observer.value.disconnect();
    window.removeEventListener('poi-creator-control', poiCreatorController);
    window.removeEventListener('custom-download-control', downloadAvailablePois);
    window.removeEventListener('custom-tiles-control', changeTiles);
    mapAdmin.value = null;
  })

</script>

<template>
  <div ref="mapAdminContainer" class="content">
    <div id="map">
        <div v-if="mapAdmin">
            <div v-for="(poi, index) of getPois" :key="index">
                <BasePoi v-if="poi.display" :admin="true" :poi="poi.element" :meter="metersInPixel" :selected="clickPoi" :editable="!isAllowedToEdit(getCurrentBioverId)" @update-poi="openPoiEdition" @open-popup="clickPoi = $event"/>
            </div>
        </div>
        <div v-if="mapAdmin">
            <div v-for="(path, index) of getPaths" :key="index">
                <BasePath v-if="path.display" :admin="true" :coordinate="path.element.coordinate"/>
            </div>
        </div>
        <div v-if="mapAdmin">
            <div v-for="(event, index) of getEvents" :key="index">
                <BaseEvent v-if="event.display" :admin="true" :event="event.element"/>
            </div>
        </div>
        <div v-if="mapAdmin">
            <div v-for="(traces, index) of getTraces" :key="index">
              <div v-for="(traceToDisplay, indexTrace) of prepareTracesToDisplay(traces)" :key="indexTrace">
                <BaseTrace :admin="true" :coordinate="traceToDisplay"/>
              </div>
            </div>
        </div>
    </div>
  </div>
  <ThePoiEditor :showDialog="showCreationDialog" :isEdit="false" :coordinate="latlng" :bioversId="getCurrentBioverId"
    @close-dialog="closeEditor" @close-after-save="closeCreationEditorAterSave"/>
  <ThePoiEditor :isEdit="true" :poi="poiToUpdate" :showDialog="showEditionDialog"
    @close-dialog="closeEditor" @close-after-save="showEditionDialog = false"/>
</template>

<style scoped>
  .content {
    height: 50vh;
    width: 100%;
    max-width: 100%;
    resize: both;
    overflow: auto;
  }

  #map {
    height: 100%;
    width: 100%;
  }
</style>