<script setup>
  import { onMounted, watch, ref, onBeforeUnmount } from "@vue/runtime-core";

  import { mapStore } from '../../composables/map.js';

  import { getIcon } from '../../utils/api';

  const props = defineProps({
    admin: Boolean,
    poi: Object,
    meter: Number,
    selected: Number,
  });

  const emit = defineEmits(['updatePoi', 'openPopup']);

  const { map, mapAdmin } = mapStore();

  const currentMap = ref(null);

  const markerIcon = ref(null);
  const marker = ref(null);
  const circle = ref(null);
  const popup = ref(null);
  const openFromClick = ref(0);

  const timeout = ref(null);

  function openEdition() {
    emit('updatePoi', props.poi);
  }

  function getWeight(poi) { 
    return poi.style_stroke_width / props.meter 
  };

  function getOffsetPosition(poi) {
    return [-((Math.cos(toRadians(poi.position.rotation)) * poi.position.distance) / props.meter), ((Math.sin(toRadians(poi.position.rotation)) * poi.position.distance) / props.meter)];
  }

  function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  function setupIcon(poi) {
    return L.icon({
      iconUrl: getIcon(poi.symbol),
      iconSize: [50,50],
      iconAnchor: [25 + ((Math.cos(toRadians(poi.position.rotation)) * poi.position.distance) / props.meter), 25 - ((Math.sin(toRadians(poi.position.rotation)) * poi.position.distance) / props.meter)],
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
          weight: getWeight(poi),
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
      marker.value.on('click', () => {
        popup.value.openOn(currentMap.value);
        emit('openPopup', props.poi.id);
      });
      marker.value.on('mouseover', () => {
        if (timeout.value) {
          clearTimeout(timeout.value);
          timeout.value = undefined;
        }
        if (!popup.value.isOpen()) {
          popup.value.openOn(currentMap.value);
        }
      });
      marker.value.on('mouseout', () => {
        timeout.value = setTimeout(() => {
          if(popup.value.isOpen() && openFromClick.value !== props.poi.id) {
            currentMap.value.removeLayer(popup.value);
          }
          timeout.value = undefined;
        }, 1000)
      });
      const content = L.DomUtil.create('div', '');
      const title = L.DomUtil.create('p', '', content);
      title.innerHTML = `${poi.title}`;
      const subtitle = L.DomUtil.create('p', '', content);
      subtitle.innerHTML = `${poi.subtitle}`;
      if (props.admin) {
        const button = L.DomUtil.create('button', '', content);
        button.innerHTML = 'Edit';
        L.DomEvent.addListener(button, 'click', openEdition, this);
      }
      
      L.DomEvent.addListener(content, 'mouseover', () => {
        if (timeout.value) {
          clearTimeout(timeout.value);
          timeout.value = undefined;
        }
      }, this);
      L.DomEvent.addListener(content, 'mouseout',  () =>{
        timeout.value = setTimeout(() => {
          if(popup.value.isOpen() && openFromClick.value !== props.poi.id) {
            currentMap.value.removeLayer(popup.value);
          }
        }, 200)
      }, this);

      popup.value = L.popup({closeButton: false, offset: getOffsetPosition(props.poi)});
      popup.value.setLatLng([props.poi.coordinate.lat,props.poi.coordinate.long]);
      popup.value.setContent(content);
  }

  watch(() => props.poi, (newVal) => {
      currentMap.value.removeLayer(marker.value);
      currentMap.value.removeLayer(circle.value);
      if (popup.value.isOpen()) currentMap.value.removeLayer(popup.value);
      setupPoi(newVal);
  }, { deep: true });

  watch(() => props.meter, () => {
    circle.value.setStyle({weight: getWeight(props.poi)});
    marker.value.setIcon(setupIcon(props.poi));
    popup.value.options.offset = getOffsetPosition(props.poi);
    popup.value.update();
  });

  watch(() => props.selected, (newVal) => {
    openFromClick.value = newVal;
  });

  onMounted(() => {
      props.admin ? currentMap.value = mapAdmin.value : currentMap.value = map.value;
      setupPoi(props.poi);
  })

  onBeforeUnmount(() => {
    currentMap.value.removeLayer(marker.value);
    currentMap.value.removeLayer(circle.value);
    if (popup.value.isOpen()) currentMap.value.removeLayer(popup.value);
  })
</script>

<template>
  
</template>

<style>
.tooltip {
  z-index: 999999;
}
</style>