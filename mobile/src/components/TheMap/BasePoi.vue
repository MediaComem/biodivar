<script setup>
  import { onMounted, watch, ref, onBeforeUnmount } from "@vue/runtime-core";

  import { mapStore } from '../../composables/map.js';

  import { getIcon } from '../../utils/api';

  const props = defineProps({
    admin: Boolean,
    poi: Object,
    meter: Number,
    selected: Boolean,
  });

  const emit = defineEmits(['updatePoi']);

  const { map, mapAdmin } = mapStore();

  const currentMap = ref(null);

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
        poi.coordinate.long], {icon: markerIcon.value}).addTo(currentMap.value);
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
      }).addTo(currentMap.value);
  }

  function setupPoi(poi) {
      markerIcon.value = setupIcon(poi);
      marker.value = setupMarker(poi);
      circle.value = setupCircle(poi);

      const title = poi.title_is_visible ? `<p>${poi.title}</p>` : '';
      const subtitle = poi.subtitle_is_visible ? `<p>${poi.subtitle}</p>` : '';

      tooltip.value = L.tooltip({
        permanent: props.selected,
        direction: 'top',
      });

      tooltip.value.setContent(`${title}${subtitle}`)

      marker.value.bindTooltip(tooltip.value);
      marker.value.on('click', openEdition)
  }

  watch(() => props.selected, () => {
      currentMap.value.removeLayer(marker.value);
      currentMap.value.removeLayer(circle.value);
      setupPoi(props.poi);
  }, { deep: true });

  watch(() => props.poi, (newVal) => {
      currentMap.value.removeLayer(marker.value);
      currentMap.value.removeLayer(circle.value);
      setupPoi(newVal);
  }, { deep: true });

  onMounted(() => {
      props.admin ? currentMap.value = mapAdmin.value : currentMap.value = map.value;
      setupPoi(props.poi);
  })

  onBeforeUnmount(() => {
    currentMap.value.removeLayer(marker.value);
    currentMap.value.removeLayer(circle.value);
  })
</script>

<template>
  
</template>