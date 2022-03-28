<script setup>
  import theHudMenu from './TheHudMenu.vue';
  import theHudEdit from './TheHudEdit.vue';
</script>

<template>
  <div data-role="hud">
    <div data-role="hud-grid">
      <the-hud-menu data-role="hud-grid-menu"></the-hud-menu>
      <the-hud-edit data-role="hud-grid-edit"></the-hud-edit>
      <div data-role="hud-grid-debug"></div>
    </div>
  </div>
</template>

<style scoped>
  [data-role="hud"] {
    padding: 1rem !important;
    --icon-size: 2rem;
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
      "m . ."
      "d . ."
      ". . e"
    ;
  }
</style>