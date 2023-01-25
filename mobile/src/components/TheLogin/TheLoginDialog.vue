<script setup>
  import { ref } from '@vue/reactivity';
  import { useStore } from '../../composables/store.js';

  import { resetEmail } from '../../utils/api.js';

  import licenseAggreement from "../../assets/text/license.json";

  const { showAggreement, forgotPassword, send } = useStore();

  const email = ref('');

  const error = ref(false);

  function passwordReset() {
      error.value = !resetEmail(email.value);
      forgotPassword.value = false;
      send.value = true;
  }
</script>


<template>
    <div>
        <base-dialog class="text-only" v-if="showAggreement" @close="showAggreement = false">
            <p class="material-symbols-sharp icon-margin-button header-icon-layout">handshake</p>
            <header>{{ $t('TheLogin.license.general') }}</header>
            <p v-for="(element, index) in licenseAggreement" :key="index">{{ element }}</p>
        </base-dialog>

        <base-dialog class="input" v-if="forgotPassword && !send" @close="forgotPassword = false">
            <div style="display: flex; justify-content: center;">
              <header><p class="material-symbols-sharp icon-font icon-margin-header header-icon-layout">memory</p> {{ $t('TheLogin.reset.title') }}</header>
            </div>
            
            <p style="margin-bottom: 1.4rem; margin-left: 0.8rem; margin-right: 0.8rem">{{ $t('TheLogin.reset.description') }}</p>
            <base-message data-type="error" v-if="error">
              {{ $t('TheLogin.error.mail-not-found') }}
            </base-message>
            <base-input class="dialog-input-color">
              <p class="material-symbols-sharp icon-margin icon-position" style="top: 3px">email</p>
              <input class="email" type="text" v-model="email" placeholder="email utilisateur">
            </base-input>
            <base-button class="reset" @click="passwordReset()">
              <p class="material-symbols-sharp icon-margin-button">refresh</p><p class="button-text">{{ $t('TheLogin.reset-password') }}</p>
            </base-button>
        </base-dialog>

        <base-dialog v-if="send" class="result" @close="send = false">
          <div style="display: flex; margin-bottom: 1rem;">
            <header><p class="material-symbols-sharp icon-font icon-margin-header header-icon-layout">mark_email_unread</p> {{ $t('TheLogin.email-send') }}</header>
          </div>
            <base-button class="home" @click="send= false">
              <p class="material-symbols-sharp icon-margin-button">home</p><p class="button-text">{{ $t('TheLogin.button.home') }}</p>
            </base-button>
        </base-dialog>
    </div>
</template>

<style scoped>
  header {
    margin: 0;
  }

  .email {
    --bg-color: #F2F2F2;
    --color: black;
  }

  .reset {
    --link-color: white;
    --highlight-color: #009FE3;
    width: 100% !important;
    margin: 0 !important;
  }

  .home {
    --link-color: white;
    --highlight-color: #323232;
    width: 100% !important;
    margin: 0 !important;
  }

  .header-icon-layout {
    font-size: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon-font {
    font-size: 18px;
    display: inline-block;
    height: auto;
  }

  .icon-position {
    position: absolute;
    left: 8px;
  }

  .icon-margin {
    margin: 0px;
  }

  .icon-margin-header {
    margin: 0px;
    transform: translate(0px, 4px);
  }

  .icon-margin-button {
    margin: 0px;
    padding-right: 6px;
  }

  .button-text {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-bottom: 1.5px;
    font-variation-settings: "wght" 149, "ital" 0;
  }
</style>