<script setup>
import { onMounted, ref, onBeforeUnmount, watch } from '@vue/runtime-core';

import { mapStore } from '../../composables/map.js';

const props = defineProps({
  admin: Boolean,
  coordinate: Object,
  meter: Number,
  path: Object,
  editable: Boolean,
});

const emit = defineEmits(['updatePath']);

const { map, mapAdmin } = mapStore();

const currentMap = ref(null);
const polyline = ref(null);
const popup = ref(null);
const timeout = ref(null);

function openEdition() {
  emit('updatePath', props.path);
}

function setPopupEdition(button) {
  if (props.editable) {
    L.DomEvent.addListener(button, 'click', openEdition, this);
  }
}

function getWeight(path) {
  const val = path.style_stroke_width / props.meter 
  if (val < 1)
    return 1;
  return path.style_stroke_width / props.meter 
  };

function setPopup(popupCoordinate) {
  const content = L.DomUtil.create('div', '');
  if (props.editable) {
    const button = L.DomUtil.create(
      'button',
      'leaflet-custom-tooltip-button',
      content
    );
    button.id = `path-popup-${props.path.id}`;
    button.innerHTML =
      '<p class="material-symbols-sharp leaflet-custom-tooltip-button-icon">edit_location_alt</p><p class="leaflet-custom-tooltip-button-text">Modifier</p>';
    setPopupEdition(button);
  }

  polyline.value.on('click', () => {
    popup.value.openOn(currentMap.value);
  });

  polyline.value.on('mouseover', () => {
    if (timeout.value) {
      clearTimeout(timeout.value);
      timeout.value = undefined;
    }
    if (!popup.value.isOpen()) {
      popup.value.openOn(currentMap.value);
    }
  });

  polyline.value.on('mouseout', () => {
    timeout.value = setTimeout(() => {
      if (popup.value.isOpen()) {
        currentMap.value.removeLayer(popup.value);
      }
      timeout.value = undefined;
    }, 1000);
  });

  L.DomEvent.addListener(
    content,
    'mouseover',
    () => {
      if (timeout.value) {
        clearTimeout(timeout.value);
        timeout.value = undefined;
      }
    },
    this
  );
  L.DomEvent.addListener(
    content,
    'mouseout',
    () => {
      timeout.value = setTimeout(() => {
        if (popup.value.isOpen()) {
          currentMap.value.removeLayer(popup.value);
        }
      }, 200);
    },
    this
  );

  popup.value = L.popup({
    closeButton: false,
    autoClose: false,
    autoPan: false,
  });
  popup.value.setLatLng(popupCoordinate);
  popup.value.setContent(content);
}

function setupPath() {
  const latlngs = [];
  props.coordinate.forEach((element) => {
    latlngs.push([element.lat, element.long]);
  });
  if (props.path) {
    polyline.value = L.polyline(latlngs, {
      color: props.path.stroke_color,
      weight: getWeight(props.path),
      opacity: props.path.stroke_opacity / 100,
    }).addTo(currentMap.value);
    const indexOfPopupPosition = Math.floor(latlngs.length / 2);
    const popupCoordinate = latlngs[indexOfPopupPosition];
    setPopup(popupCoordinate);
  } else {
    polyline.value = L.polyline(latlngs, { color: 'red' }).addTo(
      currentMap.value
    );
  }
}

watch(
  () => props.coordinate,
  () => {
    currentMap.value.removeLayer(polyline.value);
    setupPath();
  },
  { deep: true }
);

onMounted(() => {
  props.admin
    ? (currentMap.value = mapAdmin.value)
    : (currentMap.value = map.value);
  setupPath();
});

onBeforeUnmount(() => {
  currentMap.value.removeLayer(polyline.value);
});
</script>

<template></template>
