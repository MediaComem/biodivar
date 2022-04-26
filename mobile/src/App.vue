<script setup>
  import TheLogin from './components/TheLogin/TheLogin.vue';
  import TheLoginDialog from './components/TheLogin/TheLoginDialog.vue';
  import TheApp from './components/TheApp.vue';

  import { ref } from '@vue/reactivity';
  import { useStore } from './composables/store.js';
  import { isLogged } from './utils/api.js';

  const { isAuth, showAggreement, forgotPassword } = useStore();

  const isLoading = ref(true);

  isLogged().then(resp => {
    isLoading.value = false;
    if (resp?.statusCode !== 200) return;
    isAuth.value = true;
  });

</script>

<template>

  <div v-if="isLoading">
    <base-modal>Chargement de l'app</base-modal>
  </div>

  <div v-else-if="!isAuth">
    <base-modal>
      <the-login :class="{'dialog': showAggreement || forgotPassword }"></the-login>
    </base-modal>
    <the-login-dialog></the-login-dialog>
  </div>

  <div v-else>
    <the-app></the-app>
  </div>

</template>

<style>
  * { box-sizing: border-box }
  #app { height: 100% }
</style>