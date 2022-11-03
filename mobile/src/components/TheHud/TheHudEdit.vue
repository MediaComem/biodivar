<script setup>
  function enterAR() {
    const sceneEl = document.querySelector('a-scene');
    sceneEl.enterAR();
  }
</script>

<template>
  <div class="circle-div" @click="enterAR()">
    <p class="material-symbols-sharp icon-layout icon-margin icon-font">edit</p>
  </div>
</template>

<style scoped>
@import './hub.css';

.icon-layout {
  align-items: center;
  color: black;
}
</style>