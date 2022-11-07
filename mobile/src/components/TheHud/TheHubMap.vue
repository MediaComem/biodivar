<script setup>
  import { ref, onMounted, onUnmounted } from '@vue/runtime-core';
  import { useStore } from '../../composables/store';
  import { mapStore } from '../../composables/map';
  import { clearHubTimeout, setHubTimeout } from './hub-utils.js';
  import { saveEvent } from '../../utils/api.js';

  const { mapOpen, hubDisplay, hubDisplayTimeout, selectedBiovers } = useStore();
  const { couldMove, mapYPosition, position, accuracy } = mapStore();

  const minYPosition = ref(0);
  const maxYPosition = ref(0);
  const openEventSent = ref(false);
  const moveTimeout = ref(null);
  const openInProgress = ref(false);

  function createEvent(event) {
    saveEvent({
      is_public: true,
      gps_accuracy: accuracy.value,
      biovers: selectedBiovers.value.id,
      coordinate: { lat: position.value[0], long: position.value[1], alt: position.value[2] ?? 0 },
      data: event,
    });
  }

  function touchstart() {
    moveTimeout.value = setTimeout(() => {
      couldMove.value = true;
    }, 300);
  }

  function touchend() {
    if (!couldMove.value) {
      if (mapYPosition.value > (maxYPosition.value - minYPosition.value) / 2) {
        openMap();
      } else {
        closeMap();
      }
    }
    couldMove.value = false;
    clearTimeout(moveTimeout.value);
    moveTimeout.value = null;
  }

  function move(event) {
    if (couldMove.value) {
      clearHubTimeout();
      const yPosition = event.touches[0].pageY;
      if (yPosition > minYPosition.value && yPosition < maxYPosition.value) {
        mapYPosition.value = yPosition;
        if (!openEventSent.value && mapYPosition.value < maxYPosition.value - 15) {
          openEventSent.value = true;
          createEvent('open-map');
        }
      }
      if (mapYPosition.value > maxYPosition.value - 15) {
        if (openEventSent.value) {
          openEventSent.value = false;
          createEvent('close-map');
        }
        setHubTimeout();
      }
    }
  }

  function openMap() {
    openInProgress.value = true;
    clearHubTimeout();
    mapYPosition.value = minYPosition.value;
    openEventSent.value = true;
    createEvent('open-map');
    setTimeout(() => openInProgress.value = false, 500);
  }

  function closeMap() {
    clearHubTimeout();
    if (!openInProgress.value) {
      mapYPosition.value = maxYPosition.value;
      openEventSent.value = false;
      createEvent('close-map');
      setHubTimeout();
    }
  }

  onMounted(() => {
    window.addEventListener('close-ar-map', closeMap);
    minYPosition.value = screen.availHeight - (screen.availHeight * 0.95);
    maxYPosition.value = screen.availHeight - (screen.availHeight * 0.1);
    mapYPosition.value = maxYPosition.value;
  })

  onUnmounted(() => {
    window.removeEventListener('close-ar-map', closeMap);
  })
</script>

<template>
  <div class="half-circle" :class="{'transition': !couldMove}" :style="{'top': mapYPosition - 4 + 'px'}" @touchmove="move" @touchstart="touchstart" @touchend="touchend">
    <p class="material-symbols-sharp icon-layout icon-margin icon-font">map</p>
  </div>
</template>

<style scoped>
@import './hub.css';

.half-circle {
    width: 60px;
    height: 30px;
    background-color: #2F80ED;
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
    border-bottom: 0;
    cursor: pointer;
    position: absolute;
    left: calc(50vw - 30px);
    z-index: 10000;
}

 .transition {
    transition: top 200ms ease;
    transition-delay: 15ms;
  }

.icon-layout {
  padding-top: 4px;
  align-items: start;
  color: white;
}
</style>