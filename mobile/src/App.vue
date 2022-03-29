<script setup>
  import TheAframe from './components/TheAframe.vue';
  import TheHud from './components/TheHud.vue';
  import TheLogin from './components/TheLogin.vue';
  import AppModal from './components/AppModal.vue';
  import {ref} from '@vue/reactivity';
  import {getBiovers} from './utils/api.js';

  const isLoading = ref(true);
  const isAuth = ref(false);

  getBiovers().then(biovers => {
    isLoading.value = false;
    if (biovers?.statusCode !== 200) return;
    isAuth.value = true;
  });

</script>

<template>
  <div v-if="isLoading">
    <app-modal>
      Loading
    </app-modal>
  </div>
  <div v-if="!isAuth">
    <app-modal>
      <the-login></the-login>
    </app-modal>
  </div>
  <div v-if="isAuth">
    <the-aframe></the-aframe>
    <the-hud></the-hud>
  </div>
</template>

<style>
  * { box-sizing: border-box }
  #app { height: 100% }
</style>