<script setup>
  function enterAR() {
    const sceneEl = document.querySelector('a-scene');
    sceneEl.enterAR();
  }
</script>

<template>
  <svg
    @click="enterAR()"
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 40 40"
    style="enable-background:new 0 0 40 40;"
    xml:space="preserve"
  >
    <path d="M17.7,12h4.6v-1.9l-0.6-0.6h-3.3l-0.6,0.6V12z M19.4,32.7L16,27.1V9.4l1.7-1.7h4.7L24,9.4v17.7l-3.4,5.6 C20.3,33.2,19.8,33.2,19.4,32.7z M20,30.3l2.3-3.7V13.7h-4.6v12.9L20,30.3z M20,40c11,0,20-9,20-20S31,0,20,0S0,9,0,20S9,40,20,40z">
    </path>
  </svg>
</template>

<style>

</style>