<script setup>
  import { ref } from "@vue/reactivity";
  import { watch } from "@vue/runtime-core";
  import { useStore } from '../../composables/store.js';

  const { section } = useStore();

  function backToMenu() {
    section.value = 'menu';
  }

</script>

<template>
  <div class="circle-div" @click="backToMenu()">
    <p class="material-symbols-sharp icon-layout icon-margin icon-font">menu</p>
  </div>
</template>

<style scoped>
@import './hub.css';

.icon-layout {
  align-items: center;
  color: black;
}
</style>