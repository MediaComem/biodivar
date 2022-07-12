<script setup>
  import { onMounted, onUnmounted, watch } from "@vue/runtime-core";

  import { mapStore } from '../../composables/map';

  import { RotatedMarker } from './index.js';

  const { map, position, yaw } = mapStore();

  let marker = null;

  watch(() => yaw, () => {
    if (marker) {
      marker.setRotationAngle(yaw.value);
    }
  });

  watch(() => position, () => {
    if (marker) {
      marker.setLatLng(position.value);
    }
  });

  onMounted(() => {
    marker = L.rotatedMarker(position.value, {
        rotationAngle: yaw.value,
        draggable: true,
    }).addTo(map.value);
  })

  onUnmounted(() => {
      marker.remove();
      marker = null;
  })

</script>

<template>
    
</template>
