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
  }, { deep: true });

  watch(() => position, () => {
    if (marker) {
      marker.setLatLng(position.value);
    }
  }, { deep: true } );

  onMounted(() => {
    const markerIconSvg = L.icon({
      iconUrl: './assets/bluedot_D.svg',
      iconSize: [80, 80],
      className: 'rotated-marker-svg'
    });

    marker = L.rotatedMarker(position.value, {
        rotationAngle: yaw.value,
        draggable: true,
        icon: markerIconSvg,
    }).addTo(map.value);
  })

  onUnmounted(() => {
      marker.remove();
      marker = null;
  })

</script>

<template>
    
</template>

<style>
.rotated-marker-svg {
  z-index: 100001 !important;
}
</style>