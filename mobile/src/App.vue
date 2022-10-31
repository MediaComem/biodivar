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
    font-family: "BiodivAR Bold";
    src: local("WOFF2"),
    url(./assets/fonts/webfont/biodivar-sans-Bold.woff2) format("woff2");
  }

  @font-face {
    font-family: "BiodivAR Bold Italic";
    src: local("WOFF2"),
    url(./assets/fonts/webfont/biodivar-sans-BoldItalic.woff2) format("woff2");
  }

  @font-face {
    font-family: "BiodivAR Book";
    src: local("WOFF2"),
    url(./assets/fonts/webfont/biodivar-sans-Book.woff2) format("woff2");
  }

  @font-face {
    font-family: "BiodivAR Book Italic";
    src: local("WOFF2"),
    url(./assets/fonts/webfont/biodivar-sans-BookItalic.woff2) format("woff2");
  }

  @font-face {
    font-family: "BiodivAR Hairline";
    src: local("WOFF2"),
    url(./assets/fonts/webfont/biodivar-sans-Hairline.woff2) format("woff2");
  }

  @font-face {
    font-family: "BiodivAR Hairline Italic";
    src: local("WOFF2"),
    url(./assets/fonts/webfont/biodivar-sans-HairlineItalic.woff2) format("woff2");
  }

  @font-face {
    font-family: "BiodivAR Light";
    src: local("WOFF2"),
    url(./assets/fonts/webfont/biodivar-sans-Light.woff2) format("woff2");
  }

  @font-face {
    font-family: "BiodivAR Light Italic";
    src: local("WOFF2"),
    url(./assets/fonts/webfont/biodivar-sans-LightItalic.woff2) format("woff2");
  }

  @font-face {
    font-family: "BiodivAR Medium";
    src: local("WOFF2"),
    url(./assets/fonts/webfont/biodivar-sans-Medium.woff2) format("woff2");
  }

  @font-face {
    font-family: "BiodivAR Medium Italic";
    src: local("WOFF2"),
    url(./assets/fonts/webfont/biodivar-sans-MediumItalic.woff2) format("woff2");
  }

  @font-face {
    font-family: "BiodivAR Regular";
    src: local("WOFF2"),
    url(./assets/fonts/webfont/biodivar-sans-Regular.woff2) format("woff2");
  }

  @font-face {
    font-family: "BiodivAR Regular Italic";
    src: local("WOFF2"),
    url(./assets/fonts/webfont/biodivar-sans-RegularItalic.woff2) format("woff2");
  }

  @font-face {
    font-family: "BiodivAR Round Medium";
    src: local("WOFF2"),
    url(./assets/fonts/webfont/biodivar-sans-rounded-Medium.woff2) format("woff2");
  }

@font-face {
    font-family: "BiodivAR Ultralight";
    src: local("WOFF2"),
    url(./assets/fonts/webfont/biodivar-sans-Ultralight.woff2) format("woff2");
  }

  @font-face {
    font-family: "BiodivAR Ultralight Italic";
    src: local("WOFF2"),
    url(./assets/fonts/webfont/biodivar-sans-UltralightItalic.woff2) format("woff2");
  }

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
</style>