<script setup>
  import { onMounted } from "@vue/runtime-core";

  import { mapStore } from '../../composables/map';

  import { getIcon } from '../../utils/api';

  let { map } = mapStore();

  const props = defineProps({
      coordinate: Object,
      symbol: Object,
  });

  onMounted(() => {
      const markerIcon = L.icon({
        iconUrl: getIcon(props.symbol),
        iconSize: [50, 98],
      });

      L.marker([
        props.coordinate.lat,
        props.coordinate.long], {icon: markerIcon}).addTo(map.value);
  })
</script>

<template>
  
</template>