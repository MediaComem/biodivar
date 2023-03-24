<script setup>
  import TheLogin from './components/TheLogin/TheLogin.vue';
  import TheLoginDialog from './components/TheLogin/TheLoginDialog.vue';
  import TheApp from './components/TheApp.vue';

  import { ref } from '@vue/reactivity';
  import { useStore } from './composables/store.js';
  import { storage } from './composables/localStorage.js';
  import { keepAlive } from './composables/keepAlive.js';
  import { isLogged } from './utils/api.js';

  const { isAuth, showAggreement, forgotPassword, send, username } = useStore();
  const { getUser, removeUser, storeUser } = storage();
  const { setupKeepAlive } = keepAlive();

  const isLoading = ref(true);

  isLogged().then(resp => {
    isLoading.value = false;
    if (resp?.statusCode !== 200) {
      isAuth.value = false;
      removeUser();
      username.value = '';
      return;
    }
    isAuth.value = true;
    username.value = getUser();
    // In case of the login is done on the administration view
    if (!username.value) {
      username.value = resp.data;
      storeUser(username.value);
    }
    setupKeepAlive();
  });

</script>

<template>

  <div v-if="isLoading">
    <base-modal>Chargement de l'app</base-modal>
  </div>

  <div v-else-if="!isAuth">
    <base-modal>
      <the-login :class="{'dialog': showAggreement || forgotPassword || send }"></the-login>
    </base-modal>
    <the-login-dialog></the-login-dialog>
  </div>

  <div v-else>
    <the-app></the-app>
  </div>

</template>

<style>
   @font-face {
    font-family: "BiodivAR Title";
    src: local("ttf"),
    url(./assets/fonts/BiodivAR-titleGX.ttf) format('truetype');
  }

  @font-face {
    font-family: "BiodivAR Roman";
    src: local("ttf"),
    url(./assets/fonts/BiodivAR-RomanGX.ttf) format('truetype');
  }

  * { box-sizing: border-box }
  #app {
    height: 100%;
    font-feature-settings: "calt" 0;
    font-variant-ligatures: no-contextual;
    letter-spacing: 0.02em;
  }

  p {
    font-family: "BiodivAR Roman";
    font-variation-settings: "wght" 110, "ital" 0;
  }

  a {
    font-family: "BiodivAR Roman";
    font-variation-settings: "wght" 110, "ital" 0;
  }

  .a-enter-vr-button {
    background-color: #2F80ED;
    height: 38px;
    width: 38px;
    border-radius: 19px;
    min-width: 38px
  }

  .a-enter-vr-button:hover {
    opacity: 0.8;
    background-color: #2F80ED;
  }

  .a-enter-vr-button::before {
    content: '';
  }
</style>