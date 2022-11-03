<script setup>
  import { register } from '../../utils/api.js';
  import { ref } from '@vue/reactivity';
  import { useStore } from '../../composables/store.js';
  import { emailRegex } from '../../utils/validation.js';

  const { username, showAggreement, registerValidated } = useStore();

  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');

  const showPassword = ref(false);
  const showConfirmPassword = ref(false);

  const aggreement = ref(false);
  const error = ref(0);

  const emit = defineEmits(['register', 'connection'])

  async function registerUser() {
    if (validateUsername() && validateEmail() && validatePassword() && validateAggreement()) {
      const resp = await register(username.value, email.value, password.value);
      if (resp?.statusCode === 200) {
        registerValidated.value = true;
        emit('register');
      } else {
        error.value = 0;
      } 
    }
  }

  function validateUsername() {
    if (username.value === '') {
      error.value = 7;
      return false;
    }
    return true;
  }

  function validatePassword() {
    if (password.value.length < 4) {
      error.value = 2;
      return false;
    }
    if (password.value !== confirmPassword.value) {
      error.value = 3;
      return false;
    }
    return true;
  }

  function validateEmail() {
    if (email.value === '') {
        error.value = 4;
        return false;
      } else if (!emailRegex.test(email.value)) {
        error.value = 5;
        return false;
      } else {
        return true;
    }
  }

  function validateAggreement() {
    if (!aggreement.value) error.value = 6
    return aggreement.value
  }
</script>

<template>
    <base-form @submit.prevent="registerUser()">
      <base-message data-type="error" v-show="error === 1">
        {{ $t('TheLogin.error.login-failure') }}
      </base-message>
      <base-message data-type="error" v-show="error === 2">
        {{ $t('TheLogin.error.password-length') }}
      </base-message>
      <base-message data-type="error" v-show="error === 3">
        {{ $t('TheLogin.error.password-confirm') }}
      </base-message>
      <base-message data-type="error" v-show="error === 4">
        {{ $t('TheLogin.error.no-mail') }}
      </base-message>
      <base-message data-type="error" v-show="error === 5">
        {{ $t('TheLogin.error.valid-email') }}
      </base-message>
      <base-message data-type="error" v-show="error === 6">
        {{ $t('TheLogin.error.license') }}
      </base-message>
      <base-message data-type="error" v-show="error === 7">
        {{ $t('TheLogin.error.no-user') }}
      </base-message>
      <p>Déjà inscrit·e&thinsp;?&nbsp;<a @click="emit('connection')">{{ $t('TheLogin.connect') }}</a></p>
      <base-input class="user">
      <p class="material-symbols-sharp icon-margin icon-position" style="top: 3px">perm_identity</p>
        <input type="text" v-model="username" :placeholder="$t('TheLogin.placeholder.register.username')">
      </base-input>
      <base-input class="email">
        <p class="material-symbols-sharp icon-margin icon-position" style="top: 3px">email</p>
        <input type="text" v-model="email" :placeholder="$t('TheLogin.placeholder.register.email')">
      </base-input>
      <base-input class="password">
        <p class="material-symbols-sharp icon-margin icon-position" style="top: 3px">lock_outline</p>
        <input :type="showPassword ? 'text' : 'password'" v-model="password" :placeholder="$t('TheLogin.placeholder.register.password')">
        <span @click="showPassword = !showPassword">
          <p v-if="showPassword" class="material-symbols-sharp icon-margin">visibility_off</p>
          <p v-else class="material-symbols-sharp icon-margin">remove_red_eye</p>
        </span>
      </base-input>
      <base-input class="password">
        <p class="material-symbols-sharp icon-margin icon-position" style="top: 3px">lock_outline</p>
        <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" :placeholder="$t('TheLogin.placeholder.register.confirm')">
        <span @click="showConfirmPassword = !showConfirmPassword">
          <p v-if="showConfirmPassword" class="material-symbols-sharp icon-margin">visibility_off</p>
          <p v-else class="material-symbols-sharp icon-margin">remove_red_eye</p>
        </span>
      </base-input>
      <base-checkbox>
        <input type="checkbox" v-model="aggreement">
        <label>{{ $t('TheLogin.aggree') }} <a @click="showAggreement = true">{{ $t('TheLogin.license.link') }}</a></label>
      </base-checkbox>
      <base-button>
       <p class="material-symbols-sharp icon-margin-button">person_add</p><p class="button-text">{{ $t('TheLogin.creation') }}</p>
      </base-button>
    </base-form>
</template>

<style scoped>
  .user {
    --bg-color: none;
    --color: black;
    --border-color: #000000;
  }

  .password {
    --bg-color: none;
    --color: black;
    --border-color: #000000;
  }

  .email {
    --bg-color: none;
    --color: black;
    --border-color: #000000;
  }

  .icon-margin {
    margin: 0px;
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

  .icon-position {
    position: absolute;
    left: 21px;
  }
</style>