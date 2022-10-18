<script setup>
  import { onMounted } from "@vue/runtime-core";

  const props = defineProps({
    map: Object,
    coordinate: Object,
  });

  onMounted(() => {
      const latlngs = [];
      props.coordinate.forEach(element => {
          latlngs.push([element.lat, element.long]);
      });
      L.polyline(latlngs, {color: 'red'}).addTo(props.map);
  })
</script>

<template>
    
</template>