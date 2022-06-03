<script setup>
  import { ref } from '@vue/reactivity';

  import TheLoginRegister from './TheLoginRegister.vue';
  import TheLoginConnection from './TheLoginConnection.vue';
  import TheLoginFooter from './TheLoginFooter.vue';

  const page = ref('connexion');

</script>

<template>

  <div>
    <img data-role="header" alt="Biodivar" src="../../assets/shared/logo.svg" />

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

    <the-login-connection v-if="page === 'connexion'" @register="page = 'inscription'" />

    <the-login-register v-if="page === 'inscription'" @connection="page = 'connexion'" @register="page = connexion"/>
    
    <the-login-footer></the-login-footer>
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
    font-family: 'BiodivAR Round Medium';
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    color: var(--color);
    margin: 0 0 4rem 0;
  }
</style>