<script setup>
  import { ref } from "@vue/reactivity";
  import { useStore } from '../../composables/store.js';
  import { hubStore } from '../../composables/hubStore.js';
  import { clearHubTimeout, setHubTimeout } from './hub-utils.js';

  const { section, selectedBiovers } = useStore();
  const { menuOpen } = hubStore();

  function openMenu() {
    clearHubTimeout();
    menuOpen.value = true
  }

  function closeMenu() {
    setHubTimeout();
    menuOpen.value = false
  }

  function backToMenu() {
    section.value = 'menu';
  }

</script>

<template>
  <div v-if="!menuOpen" class="circle-div" @click="openMenu()">
    <p class="material-symbols-sharp icon-layout icon-margin icon-font">menu</p>
  </div>

  <div v-if="menuOpen" class="menu-layout">
    <div class="menu-element" @click="closeMenu()"><p class="material-symbols-sharp menu-icon">close</p><p>{{ selectedBiovers.name }}</p></div>
    <div class="menu-element"><p class="material-symbols-sharp menu-icon">tune</p><p>paramètres</p></div>
    <div class="menu-element" @click="backToMenu()"><p class="material-symbols-sharp menu-icon">exit_to_app</p><p>sortir de la RA</p></div>
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

.menu-element {
  height: 100px;
  display: flex;
  align-items: center;
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