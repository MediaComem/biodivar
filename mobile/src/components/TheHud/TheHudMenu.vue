<script setup>
  import { onMounted } from '@vue/runtime-core';
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

  onMounted(() => {
    menuOpen.value = false;
    parameterOpen.value = false;
  })

</script>

<template>
  <div v-if="!menuOpen && !parameterOpen" class="circle-div" @click="openMenu()">
    <p class="material-symbols-sharp icon-layout icon-margin icon-font">menu</p>
  </div>

  <div v-if="menuOpen && !parameterOpen" class="menu-layout">
    <div class="menu-element" @click="closeMenu()" style="border-bottom: 1px solid #666666"><p class="material-symbols-sharp menu-icon">close</p><p>{{ selectedBiovers.name }}</p></div>
    <div class="menu-element" @click="openParameters()" style="border-bottom: 1px solid #666666"><p class="material-symbols-sharp menu-icon">tune</p><p>paramètres</p></div>
    <div class="menu-element" @click="backToMenu()"><p class="material-symbols-sharp menu-icon">exit_to_app</p><p>sortir de la RA</p></div>
  </div>

  <div v-if="parameterOpen" class="menu-layout-parameter">
    <div class="menu-element" @click="closeParameter()" style="border-bottom: 1px solid #666666"><p class="material-symbols-sharp menu-icon">west</p><p>paramètres</p></div>
    <div class="menu-element-parameter">
      <p class="material-symbols-sharp parameter-icon">mode_of_travel</p>
      <p class="parameter-title">actualiser position</p>
      <p class="paramter-description">actualiser votre position après cette distance parcourue</p>
      <p class="parameter-label">{{ minDistance }} m</p>
      <input type="range" min="0.1" max="10" step="0.1" v-model="minDistance" class="parameter-slider"></div>  
  </div>

</template>

<style scoped>
@import './hub.css';

p {
  margin: 0px;
  color: white;
  font-size: 32px;
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
  height: 220px;
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
  height: 120px;
  display: grid;
  grid-template-columns: 72px calc( 100% - 72px);
  grid-template-rows: repeat(3, 33%);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.menu-icon {
  padding-left: 20px;
  padding-right: 20px;
}

.parameter-icon {
  grid-area: 1 / 1 / 3 / 2; 
  display: flex; 
  align-items: center; 
  justify-content: center
}

.parameter-title {
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  align-items: end;
}

.paramter-description {
  grid-area: 2 / 2 / 3 / 3; 
  font-size: 14px; 
  display: flex; 
  align-items: center; 
  color: #BDBDBD
}

.parameter-label {
  grid-area: 3 / 1 / 4 / 2; 
  font-size: 20px; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  color: #BDBDBD
}

.parameter-slider {
  grid-area: 3 / 2 / 4 / 3;
}

.icon-layout {
  align-items: center;
  color: black;
}
</style>