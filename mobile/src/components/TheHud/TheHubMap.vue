<script setup>
  import { useStore } from '../../composables/store';

  const { mapOpen } = useStore();

  function openMap() {
      mapOpen.value = !mapOpen.value;
  }
</script>

<template>
  <svg
    @click="openMap()"
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 40 40"
    style="enable-background:new 0 0 40 40; z-index: 100"
    xml:space="preserve"
  >
    <g stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m3 6.6 6.00001-3.6v14.4l-6.00001 3.6z"/><path d="m14.9999 6.6 6-3.6v14.4l-6 3.6z"/><path d="m14.9999 6.6-5.99999-3.6v14.4l5.99999 3.6z"/></g>
  </svg>
</template>

<style>

</style>