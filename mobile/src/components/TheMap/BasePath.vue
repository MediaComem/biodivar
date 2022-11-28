<script setup>
  import { onMounted, ref, onBeforeUnmount } from "@vue/runtime-core";

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
      polyline.value = L.polyline(latlngs, {color: 'red'}).addTo(currentMap.value);
  })

  onBeforeUnmount(() => {
    currentMap.value.removeLayer(polyline.value);
  })
</script>

<template>
    
</template>