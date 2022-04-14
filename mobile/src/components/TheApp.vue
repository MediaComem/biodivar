<script setup>
  import TheAframe from './TheAframe.vue';
  import TheHud from './TheHud.vue';
  import { useRouter } from '../composables/router.js';
  import { useStore } from '../composables/store.js';

  const { section } = useStore();

  const { page, route } = useRouter();

</script>

<template>

  <div v-if="section == 'menu'">
    <base-modal>
      <header>
        <img alt="Biodivar" src="../assets/logo.svg" />
      </header>
      <component :is="page" />
    </base-modal>
  </div>

  <div v-else-if="section == 'ar'">
    <the-aframe></the-aframe>
    <the-hud></the-hud>
  </div>

</template>

<style scoped>

  header {
    border-bottom: solid black 1px;
    margin-bottom: 1rem;
  }

</style>
