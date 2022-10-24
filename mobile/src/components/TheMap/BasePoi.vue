<script setup>
  import { onMounted, watch, ref, onBeforeUnmount, computed } from "@vue/runtime-core";
  import { useStore } from 'vuex';

  import { mapStore } from '../../composables/map.js';

  import { getIcon } from '../../utils/api';

  const props = defineProps({
    admin: Boolean,
    poi: Object,
    meter: Number,
    selected: Number,
    editable: Boolean,
  });

  const emit = defineEmits(['updatePoi', 'openPopup']);

  const { map, mapAdmin } = mapStore();

  const store = useStore();

  const currentMap = ref(null);

  const markerIcon = ref(null);
  const marker = ref(null);
  const circle = ref(null);
  const popup = ref(null);
  const openFromClick = ref(0);

  const timeout = ref(null);

  const hoverPoiInTable = computed(() => store.getters['global/getcurrentTableOver'])
  const currentTabClick = computed(() => store.getters['global/getCurrentTabClick'])

  function removeClickPopup() {
    store.dispatch('global/removeClickElement', props.poi.id);
  }

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

  function setPopupEdition(button) {
    if (props.editable) {
      L.DomEvent.addListener(button, 'click', openEdition, this);
    }
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
            removeClickPopup();
          }
          timeout.value = undefined;
        }, 1000)
      });
      const content = L.DomUtil.create('div', '');
      const title = L.DomUtil.create('p', '', content);
      title.innerHTML = `${poi.title}`;
      const subtitle = L.DomUtil.create('p', '', content);
      subtitle.innerHTML = `${poi.subtitle}`;
      if (props.admin && props.editable) {
        const button = L.DomUtil.create('button', '' ,content);
        button.id = `poi-popup-${props.poi.id}`
        button.innerHTML = 'Edit';
        setPopupEdition(button);
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
            removeClickPopup();
          }
        }, 200)
      }, this);

      popup.value = L.popup({closeButton: false, autoClose: false, autoPan: false, offset: getOffsetPosition(props.poi)});
      popup.value.setLatLng([props.poi.coordinate.lat,props.poi.coordinate.long]);
      popup.value.setContent(content);
  }

  watch(() => props.poi, (newVal) => {
      currentMap.value.removeLayer(marker.value);
      currentMap.value.removeLayer(circle.value);
      if (popup.value.isOpen()) currentMap.value.removeLayer(popup.value);
      removeClickPopup();
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

  watch(() => hoverPoiInTable.value, () => {
    if (!currentTabClick.value.includes(props.poi.id)) {
      if (hoverPoiInTable.value === props.poi.id) {
        if (!popup.value.isOpen()) popup.value.openOn(currentMap.value);
      } else {
        if (popup.value.isOpen()) currentMap.value.removeLayer(popup.value);
      }
    }
  });

  watch(() => currentTabClick.value, (newVal) => {
    if (newVal.includes(props.poi.id)) {
      if (!popup.value.isOpen()) { 
        popup.value.openOn(currentMap.value)
      };
      if (hoverPoiInTable.value === props.poi.id) {
        currentMap.value.panTo([props.poi.coordinate.lat, props.poi.coordinate.long], {animate: true, duration: 1, easeLinearity: 0})
      }
    } else {
      if (hoverPoiInTable.value === props.poi.id) {
        if (!popup.value.isOpen()) popup.value.openOn(currentMap.value);
      } else {
        if (popup.value.isOpen()) currentMap.value.removeLayer(popup.value);
      }
    }
  }, { deep: true });

  onMounted(() => {
      props.admin ? currentMap.value = mapAdmin.value : currentMap.value = map.value;
      setupPoi(props.poi);
  })

  onBeforeUnmount(() => {
    removeClickPopup();
    currentMap.value.removeLayer(marker.value);
    currentMap.value.removeLayer(circle.value);
    if (popup.value.isOpen()) currentMap.value.removeLayer(popup.value);
  })
</script>

<template>
  
</template>