<script setup>
  import { ref } from '@vue/reactivity';
  import { useStore } from '../../composables/store.js';

  import licenseAggreement from "../../assets/text/license.json";

  const { showAggreement, forgotPassword } = useStore();

  const email = ref('');
</script>


<template>
    <div>
        <base-dialog class="text-only" v-if="showAggreement" @close="showAggreement = false">
        <img src="../../assets/aggreement-icon.svg" alt="aggreement">
        <header>{{ $t('TheLogin.license.general') }}</header>
        <p v-for="(element, index) in licenseAggreement" :key="index">{{ element }}</p>
        </base-dialog>

        <base-dialog class="input" v-if="forgotPassword" @close="forgotPassword = false">
        <img src="../../assets/memory.svg" alt="memory">
        <header>{{ $t('TheLogin.reset.title') }}</header>
        <p>{{ $t('TheLogin.reset.description') }}</p>
        <base-input class="dialog-input-color">
            <input class="email" type="text" v-model="email" placeholder="email utilisateur">
        </base-input>
        <base-button class="reset">
            <img src="../../assets/refresh.svg" />{{ $t('TheLogin.reset-password') }}
        </base-button>
        </base-dialog>
    </div>
</template>

<style scoped>
  .email {
    --icon-link: url("../../assets/email.svg");
    --bg-color: white;
    --color: black;
  }

  .reset {
    --link-color: white;
    --highlight-color: #009FE3;
  }
</style>