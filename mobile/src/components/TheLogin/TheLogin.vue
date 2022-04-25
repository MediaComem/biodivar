<script setup>
  import { ref } from '@vue/reactivity';

  import TheLoginRegister from './TheLoginRegister.vue';
  import TheLoginConnection from './TheLoginConnection.vue';
  import TheLoginFooter from './TheLoginFooter.vue';

  import licenseAggreement from "../../assets/text/license.json";

  const page = ref('connexion');

  const showAggreement = ref(false);
  const forgotPassword = ref(false);

</script>

<template>

  <div>
    <img data-role="header" alt="Biodivar" src="../../assets/logo.svg" />

    <h1 data-role="title">
      {{ $t('TheLogin.title') }}
    </h1>

    <base-radio>
      <button :class="{ 'active': page === 'connexion' }" @click="page = 'connexion'">
        {{ $t('TheLogin.button.connexion') }}
      </button>
      <button :class="{ 'active': page === 'inscription' }" @click="page = 'inscription'">
        {{ $t('TheLogin.button.inscription') }}
      </button>
    </base-radio>

    <the-login-connection v-if="page === 'connexion'" @forgot-password="forgotPassword = true" @register="page = 'inscription'" />

    <the-login-register v-if="page === 'inscription'" @connection="page = 'connexion'" @register="page = connexion" @aggreement="showAggreement = true"/>
    
    <the-login-footer></the-login-footer>

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
        <input class="email-link" type="text" v-model="email" placeholder="email utilisateur">
      </base-input>
    </base-dialog>
  </div>
</template>

<style scoped>

  div {
    --max-width: 640px;
    min-height: 100%;
    text-align: center;
  }

  [data-role="header"] {
    width: 100%;
    max-width: var(--max-width);
    margin-bottom: 2rem;
  }

  [data-role="title"] {
    text-align: center;
    color: var(--color);
    font-size: 1rem;
    margin: 0 0 4rem 0;
  }

  .email-link {
    --icon-link: url("../../assets/email.svg");
    --bg-color: none;
    --color: black;
  }

</style>