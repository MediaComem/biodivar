<script setup>
  import { login, register } from '../utils/api.js';
  import { ref } from '@vue/reactivity';
  import { useStore } from '../composables/store.js';
  import { emailRegex } from '../utils/validation.js';

  import licenseAggreement from "../assets/text/license.json";

  const { isAuth, username } = useStore();

  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  const error = ref(false);
  const registerError = ref('');

  const page = ref('inscription');

  const aggreement = ref(false);

  const showAggreement = ref(false);

  const forgotPassword = ref(false);

  async function checkAuth() {
    const resp = await login(username.value, password.value);
    if (resp?.statusCode === 200) {
      isAuth.value = true;
    } else {
      error.value = true;
    }
  }

  async function registerUser() {
    if (validateEmail() && validatePassword() && validateAggreement()) {
      const resp = await register(username.value, email.value, password.value);
      if (resp?.statusCode === 200) {
        selectPage('connexion');
      } else {
        registerError.value = this.$i18n.t('TheLogin.error.login-failure');
        error.value = true;
      } 
    }
    else {
      error.value = true;
    }
  }

  function selectPage(selection) {
    if (page.value === selection) return;
    error.value = false;
    page.value = selection;
  }

  function validatePassword() {
    if (password.value.length < 4) {
      registerError.value = this.$i18n.t('TheLogin.error.password-length');
      error.value = true;
      return false;
    }
    if (password.value !== confirmPassword.value) {
      registerError.value = this.$i18n.t('TheLogin.error.password-confirm');
      return false;
    }
    return true;
  }

  function validateEmail() {
    if (email.value === '') {
        registerError.value = this.$i18n.t('TheLogin.error.no-mail');
        return false;
      } else if (!emailRegex.test(email.value)) {
        registerError.value = this.$i18n.t('TheLogin.error.email-valid');
        return false;
      } else {
        return true;
    }
}

  function validateAggreement() {
    if (!aggreement.value) this.$i18n.t('TheLogin.error.license')
    return aggreement.value
  }

</script>

<template>

  <div>

    <img data-role="header" alt="Biodivar" src="../assets/logo.svg" />

    <h1 data-role="title">
      {{ $t('TheLogin.title') }}
    </h1>

    <base-radio>
      <button :class="{ 'active': page === 'connexion' }" @click="selectPage('connexion')">
        {{ $t('TheLogin.button.connexion') }}
      </button>
      <button :class="{ 'active': page === 'inscription' }" @click="selectPage('inscription')">
        {{ $t('TheLogin.button.inscription') }}
      </button>
    </base-radio>

    <base-form v-if="page === 'connexion'" @submit.prevent="checkAuth()">
      <base-message data-type="error" v-if="error">
        {{ $t('TheLogin.error.login') }}
      </base-message>
      <p>{{ $t('TheLogin.no-account') }} <a @click="selectPage('inscription')">{{ $t('TheLogin.inscription') }}</a></p>
      <input type="text" v-model="username" :placeholder="$t('TheLogin.placeholder.login.user')">
      <input type="password" v-model="password" :placeholder="$t('TheLogin.placeholder.login.password')">
      <button><img src="../assets/connexion.svg" />
      {{ $t('TheLogin.button.connexion') }}
      </button>
      <a style="display: block" @click="forgotPassword = true">{{ $t('TheLogin.forgot-password') }}</a>
    </base-form>

    <base-form v-if="page === 'inscription'" @submit.prevent="registerUser()">
      <base-message data-type="error" v-if="error">
        {{ registerError }}
      </base-message>
      <p>{{ $t('TheLogin.already-register') }} <a @click="selectPage('connexion')">{{ $t('TheLogin.connect') }}</a></p>
      <base-input>
        <input type="text" v-model="username" :placeholder="$t('TheLogin.placeholder.register.username')">
      </base-input>
      <input type="text" v-model="email" :placeholder="$t('TheLogin.placeholder.register.email')">
      <input type="password" v-model="password" :placeholder="$t('TheLogin.placeholder.register.password')">
      <input type="password" v-model="confirmPassword" :placeholder="$t('TheLogin.placeholder.register.confirm')">
      <base-checkbox>
        <input type="checkbox" v-model="aggreement">
        <label>{{ $t('TheLogin.aggree') }} <a @click="showAggreement = true">{{ $t('TheLogin.license.link') }}</a></label>
      </base-checkbox>
      <button><img src="../assets/person_add.svg" />{{ $t('TheLogin.creation') }}</button>
    </base-form>
    <div data-role="footer">
      <div class="heig">
        <img src="../assets/Logo_HEIG-VD_MEI.svg" alt="heig">
      </div>
      <div class="hes">
        <img src="../assets/Logo_HES-SO_Couleurs.svg" alt="hes">
      </div>
    </div>
    <base-dialog class="text-only" v-if="showAggreement" @close="showAggreement = false">
      <img src="../assets/aggreement-icon.svg" alt="aggreement">
      <header>{{ $t('TheLogin.license.general') }}</header>
      <p v-for="(element, index) in licenseAggreement" :key="index">{{ element }}</p>
    </base-dialog>
    <base-dialog class="input" v-if="forgotPassword" @close="forgotPassword = false">
      <img src="../assets/memory.svg" alt="memory">
      <header>{{ $t('TheLogin.reset.title') }}</header>
      <p>{{ $t('TheLogin.reset.description') }}</p>
      <base-input class="dialog-input-color">
        <input type="text" v-model="email" placeholder="email utilisateur">
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

  [data-role="footer"] {
    max-width: var(--max-width);
    width: 100%;
    display: inline-flex;
  }

  .heig {
    width: 50%;
    display: flex;
    justify-content: flex-start;
  }

  .hes {
    width: 50%;
    display: flex;
    justify-content: flex-end;
  }

</style>