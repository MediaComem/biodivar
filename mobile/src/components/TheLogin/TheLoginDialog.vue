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
            <img src="../../assets/login/aggreement-icon.svg" alt="aggreement">
            <header>{{ $t('TheLogin.license.general') }}</header>
            <p v-for="(element, index) in licenseAggreement" :key="index">{{ element }}</p>
        </base-dialog>

        <base-dialog class="input" v-if="forgotPassword && !send" @close="forgotPassword = false">
            <img src="../../assets/login/memory.svg" alt="memory">
            <header>{{ $t('TheLogin.reset.title') }}</header>
            <p>{{ $t('TheLogin.reset.description') }}</p>
            <base-message data-type="error" v-if="error">
              {{ $t('TheLogin.error.mail-not-found') }}
            </base-message>
            <base-input class="dialog-input-color">
                <input class="email" type="text" v-model="email" placeholder="email utilisateur">
            </base-input>
            <base-button class="reset" @click="passwordReset()">
                <img src="../../assets/login/refresh.svg" />{{ $t('TheLogin.reset-password') }}
            </base-button>
        </base-dialog>

        <base-dialog v-if="send" class="result" @close="send = false">
            <img class="sent-margin" src="../../assets/login/mark_email_unread.svg" alt="memory">
            <p class="sent-margin">{{ $t('TheLogin.email-send') }}</p>
            <base-button class="home" @click="send= false">
                <img src="../../assets/shared/home.svg" />{{ $t('TheLogin.button.home') }}
            </base-button>
        </base-dialog>
    </div>
</template>

<style scoped>
  .email {
    --icon-link: url("../../assets/login/email.svg");
    --bg-color: white;
    --color: black;
  }

  .reset {
    --link-color: white;
    --highlight-color: #009FE3;
  }

  .home {
    --link-color: white;
    --highlight-color: #323232;
  }
</style>