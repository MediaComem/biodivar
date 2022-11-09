<script setup>
  import { onMounted } from '@vue/runtime-core';

  import { useStore } from '../../composables/store';
  import { setHubTimeout } from './hub-utils.js';

  import theHudMenu from './TheHudMenu.vue';
  import theHudEdit from './TheHudEdit.vue';
  import theHudMap from './TheHubMap.vue';

  const { mapOpen, hubDisplay } = useStore();

  function openHub() {
    if (!hubDisplay.value) {
      mapOpen.value = true;
      hubDisplay.value = true;
      setHubTimeout();
    }
  }

  onMounted(() => {
    hubDisplay.value = true;
    mapOpen.value = true;
    setHubTimeout();
  })
</script>

<template>
  <div data-role="hud" @click="openHub">
    <div data-role="hud-grid">
      <the-hud-menu v-if="hubDisplay" data-role="hud-grid-menu"></the-hud-menu>
      <!-- Demande de Julien pour retirer ce bouton pour les tests -->
      <the-hud-edit v-if="false" data-role="hud-grid-edit"></the-hud-edit>
      <the-hud-map v-if="hubDisplay" data-role="hud-grid-map"></the-hud-map>
      <div v-if="hubDisplay" data-role="hud-grid-debug"></div>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
  [data-role="hud"] {
    padding: 0.5rem !important;
    --icon-size: 60px;
  }

  [data-role="hud-grid-menu"] {grid-area: m}
  [data-role="hud-grid-edit"] {grid-area: e}
  [data-role="hud-grid-debug"]  {grid-area: d}

  [data-role="hud-grid"] {
    display: grid;
    width: 100%;
    height: 100%;
    justify-items: stretch;
    grid-template-rows: var(--icon-size) auto var(--icon-size);
    grid-template-columns: var(--icon-size) auto var(--icon-size);
    grid-template-areas:
      "m . e"
      "d . ."
      ". c ."
    ;
  }
</style>