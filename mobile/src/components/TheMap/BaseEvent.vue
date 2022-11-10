<script setup>
import { ref, onMounted, onUnmounted, watch } from "@vue/runtime-core"; 

import { mapStore } from '../../composables/map.js';

const props = defineProps({
  admin: Boolean,
  event: Object,
});

const { map, mapAdmin } = mapStore();

const currentMap = ref(null);
const circle = ref(null);
const popup = ref(null);

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