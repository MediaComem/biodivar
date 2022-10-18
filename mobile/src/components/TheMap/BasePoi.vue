<script setup>
  import { onMounted, computed, watch, ref } from "@vue/runtime-core";

  import { getIcon } from '../../utils/api';

  const props = defineProps({
      map: Object,
      poi: Object,
      meter: Number,
  });

  const emit = defineEmits(['updatePoi']);

  const markerIcon = ref(null);
  const marker = ref(null);
  const circle = ref(null);
  const tooltip = ref(null);


  function openEdition() {
    emit('updatePoi', props.poi);
  }

  function getWeight(poi) { 
    return poi.style_stroke_width / props.meter 
  };

  function setupIcon(poi) {
    return L.icon({
      iconUrl: getIcon(poi.symbol),
      iconSize: [50,50],
      iconAnchor: [25 + ((Math.cos(poi.position.rotation) * poi.position.distance) / props.meter), 25 + (Math.sin(poi.position.rotation) * poi.position.distance)],
    });
  }

  function setupMarker(poi) {
    return L.marker([
        poi.coordinate.lat,
        poi.coordinate.long], {icon: markerIcon.value}).addTo(props.map);
  }

  function setupCircle(poi) {
    return L.circle([
        props.poi.coordinate.lat,
        props.poi.coordinate.long], 
        {
          radius: poi.radius - poi.style_stroke_width / 2,
          weight: getWeight(poi) * 2,
          color: `${poi.stroke_color}`,
          opacity: `${poi.stroke_opacity / 100}`,
          fill: true, 
          fillColor: `${poi.fill_color}`,
          fillOpacity: `${poi.fill_opacity / 100}`,
      }).addTo(props.map);
  }

  function setupPoi(poi) {
      markerIcon.value = setupIcon(poi);
      marker.value = setupMarker(poi);
      circle.value = setupCircle(poi);

      const title = poi.title_is_visible ? `<p>${poi.title}</p>` : '';
      const subtitle = poi.subtitle_is_visible ? `<p>${poi.subtitle}</p>` : '';

      tooltip.value = L.tooltip({
        permanent: true,
        direction: 'top',
      });

      tooltip.value.setContent(`${title}${subtitle}`)

      marker.value.bindTooltip(tooltip.value).openTooltip();
      marker.value.on('click', openEdition)
  }

  watch(() => props.poi, (newVal) => {
      props.map.removeLayer(marker.value);
      props.map.removeLayer(circle.value);
      setupPoi(newVal);
  }, { deep: true });

  onMounted(() => {
      setupPoi(props.poi);
  })
</script>

<template>
  
</template>