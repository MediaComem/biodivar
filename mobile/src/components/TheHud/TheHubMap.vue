<script setup>
  import { ref, onMounted, onUnmounted } from '@vue/runtime-core';
  import { useStore } from '../../composables/store';
  import { mapStore } from '../../composables/map';
  import { clearHubTimeout, setHubTimeout } from './hub-utils.js';

  const { mapOpen, hubDisplay, hubDisplayTimeout } = useStore();
  const { mapYPosition } = mapStore();

  const minYPosition = ref(0);
  const maxYPosition = ref(0);

  function move(event) {
    clearHubTimeout();
    const yPosition = event.touches[0].pageY;
    if (yPosition > minYPosition.value && yPosition < maxYPosition.value) {
      mapYPosition.value = yPosition;
    }
    if (mapYPosition.value > maxYPosition.value - 15) {
      setHubTimeout();
    }
  }

  function closeMap() {
    mapYPosition.value = maxYPosition.value;
    setHubTimeout();
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
  <div class="half-circle" :style="{'top': mapYPosition - 4 + 'px'}" @touchmove="move">
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

.icon-layout {
  padding-top: 4px;
  align-items: start;
  color: white;
}
</style>