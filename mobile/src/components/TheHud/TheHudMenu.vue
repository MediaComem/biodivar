<script setup>
  import { ref } from "@vue/reactivity";
  import { useStore } from '../../composables/store.js';
  import { hubStore } from '../../composables/hubStore.js';
  import { clearHubTimeout, setHubTimeout } from './hub-utils.js';

  const { section, selectedBiovers, minDistance } = useStore();
  const { menuOpen, parameterOpen } = hubStore();

  function openMenu() {
    clearHubTimeout();
    menuOpen.value = true
  }

  function closeMenu() {
    setHubTimeout();
    menuOpen.value = false
  }

  function openParameters() {
    menuOpen.value = false;
    parameterOpen.value = true;
  }

  function closeParameter() {
    menuOpen.value = true;
    parameterOpen.value = false;
  }

  function backToMenu() {
    menuOpen.value = false;
    parameterOpen.value = false;
    section.value = 'menu';
  }

</script>

<template>
  <div v-if="!menuOpen && !parameterOpen" class="circle-div" @click="openMenu()">
    <p class="material-symbols-sharp icon-layout icon-margin icon-font">menu</p>
  </div>

  <div v-if="menuOpen && !parameterOpen" class="menu-layout">
    <div class="menu-element" @click="closeMenu()"><p class="material-symbols-sharp menu-icon">close</p><p>{{ selectedBiovers.name }}</p></div>
    <div class="menu-element" @click="openParameters()"><p class="material-symbols-sharp menu-icon">tune</p><p>paramètres</p></div>
    <div class="menu-element" @click="backToMenu()"><p class="material-symbols-sharp menu-icon">exit_to_app</p><p>sortir de la RA</p></div>
  </div>

  <div v-if="parameterOpen" class="menu-layout-parameter">
    <div class="menu-element" @click="closeParameter()"><p class="material-symbols-sharp menu-icon">west</p><p>paramètres</p></div>
    <div class="menu-element-parameter">
      <p class="material-symbols-sharp" style="grid-area: 1 / 1 / 3 / 2; display: flex; align-items: center; justify-content: center">mode_of_travel</p>
      <p style="grid-area: 1 / 2 / 2 / 3;">actualiser position</p>
      <p style="grid-area: 2 / 2 / 3 / 3; font-size: 14px; display: flex; align-items: center">actualiser votre position après cette distance parcourue</p>
      <p style="grid-area: 3 / 1 / 4 / 2; font-size: 20px; display: flex; align-items: center; justify-content: center">{{ minDistance }} m</p>
      <input type="range" min="0.1" max="10" step="0.1" v-model="minDistance" style="grid-area: 3 / 2 / 4 / 3;"></div>  
  </div>

</template>

<style scoped>
@import './hub.css';

p {
  margin: 0px;
  color: white;
  font-size: 40px;
}

.menu-layout {
  width: calc(100vw - 1rem);
  height: 300px;
  background-color: #323232;
  border-radius: 20px;
  padding-left: 5px;
  padding-right: 5px;
  z-index: 101;
}

.menu-layout-parameter {
  width: calc(100vw - 1rem);
  height: 200px;
  background-color: #323232;
  border-radius: 20px;
  padding-left: 5px;
  padding-right: 5px;
  z-index: 101;
}

.menu-element {
  height: 100px;
  display: flex;
  align-items: center;
}

.menu-element-parameter {
  height: 100px;
  display: grid;
  grid-template-columns: 80px calc( 100% - 80px);
  grid-template-rows: repeat(3, 33%);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.menu-icon {
  padding-left: 20px;
  padding-right: 20px;
}

.icon-layout {
  align-items: center;
  color: black;
}
</style>