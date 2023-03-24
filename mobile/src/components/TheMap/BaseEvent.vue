<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "@vue/runtime-core"; 
import { useStore } from 'vuex';
import { mapStore } from '../../composables/map.js';

const props = defineProps({
  admin: Boolean,
  event: Object,
});

const { map, mapAdmin } = mapStore();

const store = useStore();

const currentMap = ref(null);
const circle = ref(null);
const popup = ref(null);

const hoverPoiInTable = computed(() => store.getters['global/getcurrentEventTableOver']);
const currentTabClick = computed(() => store.getters['global/getCurrentEventTabClick']);


watch(() => hoverPoiInTable.value, () => {
  if (!currentTabClick.value.includes(props.event.id)) {
    if (hoverPoiInTable.value === props.event.id) {
      if (!popup.value.isOpen()) popup.value.openOn(currentMap.value);
    } else {
      if (popup.value.isOpen()) currentMap.value.removeLayer(popup.value);
    }
  }
});

watch(() => currentTabClick.value, (newVal) => {
  if (newVal.includes(props.event.id)) {
    if (!popup.value.isOpen()) { 
      popup.value.openOn(currentMap.value)
    };
    if (hoverPoiInTable.value === props.event.id) {
      currentMap.value.panTo([props.event.coordinate.lat, props.event.coordinate.long], {animate: true, duration: 1, easeLinearity: 0})
    }
  } else {
    if (hoverPoiInTable.value === props.event.id) {
      if (!popup.value.isOpen()) popup.value.openOn(currentMap.value);
    } else {
      if (popup.value.isOpen()) currentMap.value.removeLayer(popup.value);
    }
  }
}, { deep: true });

onMounted(() => {
  props.admin ? currentMap.value = mapAdmin.value : currentMap.value = map.value;
  circle.value = L.circle([
    props.event.coordinate.lat,
    props.event.coordinate.long], 
    {
      radius: 2,
      weight: 1,
      color: `#ff0000`,
    }).addTo(currentMap.value);
  popup.value = L.popup({closeButton: false, autoClose: false, autoPan: false})
    .setLatLng([
      props.event.coordinate.lat,
      props.event.coordinate.long])
    .setContent(`<p>${props.event.data}</p><p>${props.event.creation_date}</p>`);
  circle.value.on('click', () => {
    popup.value.isOpen() ? currentMap.value.removeLayer(popup.value) : currentMap.value.addLayer(popup.value) ;
  })
})

onUnmounted(() => {
  currentMap.value.removeLayer(circle.value);
  currentMap.value.removeLayer(popup.value);
})

</script>

<template>
    
</template>