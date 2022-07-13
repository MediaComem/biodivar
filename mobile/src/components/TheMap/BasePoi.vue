<script setup>
  import { onMounted } from "@vue/runtime-core";

  import { mapStore } from '../../composables/map';

  import { getIcon } from '../../utils/api';

  let { map } = mapStore();

  const props = defineProps({
      poi: Object,
  });

  onMounted(() => {
      const markerIcon = L.icon({
        iconUrl: getIcon(props.poi.symbol),
        iconSize: [props.poi.symbol.width, props.poi.symbol.height],
      });

      const marker = L.marker([
        props.poi.coordinate.lat,
        props.poi.coordinate.long], {icon: markerIcon}).addTo(map.value);

      L.circle([
        props.poi.coordinate.lat,
        props.poi.coordinate.long], 
        {radius: props.poi.radius, fill: 
        props.poi.style_fill, 
        fillOpacity: 1,
        color: "RGB(0, 231, 200, 0.5)",
        fillColor: "RGB(205, 231, 65, 0.5)"
      }).addTo(map.value);

      const title = props.poi.title_is_visible ? `<p>${props.poi.title}</p>` : '';
      const subtitle = props.poi.subtitle_is_visible ? `<p>${props.poi.subtitle}</p>` : '';

      const tooltip = L.tooltip({
        permanent: true,
        direction: 'top',
      });

      tooltip.setContent(`${title}${subtitle}`)

      marker.bindTooltip(tooltip).openTooltip();
  })
</script>

<template>
  
</template>