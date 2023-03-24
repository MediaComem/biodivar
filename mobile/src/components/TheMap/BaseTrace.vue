<script setup>
  import { onMounted, ref, onUnmounted } from "@vue/runtime-core";

  import { mapStore } from '../../composables/map.js';

  const props = defineProps({
    admin: Boolean,
    coordinate: Object,
  });

  const { map, mapAdmin } = mapStore();

  const currentMap = ref(null);
  const polyline = ref(null);

  onMounted(() => {
      props.admin ? currentMap.value = mapAdmin.value : currentMap.value = map.value;
      const latlngs = [];
      props.coordinate.forEach(element => {
          latlngs.push([element.lat, element.long]);
      });
      const randomColor = Math.floor(Math.random()*16777215).toString(16);
      polyline.value = L.polyline(latlngs, {color: `#${randomColor}`}).addTo(currentMap.value);
  })

  onUnmounted(() => {
    currentMap.value.removeLayer(polyline.value);
  })
</script>

<template>
    
</template>