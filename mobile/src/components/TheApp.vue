<script setup>
  import BaseModal from './base/BaseModal.vue';
  import TheAframe from './TheAframe.vue';
  import TheHud from './TheHud.vue';
  import { page } from '../store.js';
</script>

<template>
  <div v-if="page == 'home'">
    <base-modal>
      <header>
        <img alt="Biodivar" src="../assets/logo.svg" />
      </header>
    </base-modal>
  </div>
  <div v-else-if="page == 'ar'">
    <the-aframe></the-aframe>
    <the-hud></the-hud>
  </div>
</template>

<style scoped>
  header {
    border-bottom: solid black 1px;
  }
</style>
