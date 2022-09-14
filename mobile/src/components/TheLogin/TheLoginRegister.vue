<script setup>
  import { register } from '../../utils/api.js';
  import { ref } from '@vue/reactivity';
  import { useStore } from '../../composables/store.js';
  import { emailRegex } from '../../utils/validation.js';

  const { username, showAggreement } = useStore();

  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');

  const showPassword = ref(false);
  const showConfirmPassword = ref(false);

  const aggreement = ref(false);
  const error = ref(0);

  const emit = defineEmits(['register', 'connection'])

  async function registerUser() {
    if (validateEmail() && validatePassword() && validateAggreement()) {
      const resp = await register(username.value, email.value, password.value);
      if (resp?.statusCode === 200) {
        emit('register');
      } else {
        error.value = 0;
      } 
    }
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
      <p>{{ $t('TheLogin.already-register') }} <a @click="emit('connection')">{{ $t('TheLogin.connect') }}</a></p>
      <base-input class="user">
        <input type="text" v-model="username" :placeholder="$t('TheLogin.placeholder.register.username')">
      </base-input>
      <base-input class="email">
        <input type="text" v-model="email" :placeholder="$t('TheLogin.placeholder.register.email')">
      </base-input>
      <base-input class="password">
        <input :type="showPassword ? 'text' : 'password'" v-model="password" :placeholder="$t('TheLogin.placeholder.register.password')">
        <span @click="showPassword = !showPassword">
          <img v-if="showPassword" src="../../assets/login/visibility_off.svg">
          <img v-else src="../../assets/login/remove_red_eye.svg">
        </span>
      </base-input>
      <base-input class="password">
        <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" :placeholder="$t('TheLogin.placeholder.register.confirm')">
        <span @click="showConfirmPassword = !showConfirmPassword">
          <img v-if="showConfirmPassword" src="../../assets/login/visibility_off.svg">
          <img v-else src="../../assets/login/remove_red_eye.svg">
        </span>
      </base-input>
      <base-checkbox>
        <input type="checkbox" v-model="aggreement">
        <label>{{ $t('TheLogin.aggree') }} <a @click="showAggreement = true">{{ $t('TheLogin.license.link') }}</a></label>
      </base-checkbox>
      <base-button><img src="../../assets/login/person_add.svg" />{{ $t('TheLogin.creation') }}</base-button>
    </base-form>
</template>

<style scoped>
  .user {
    --icon-link: url("../../assets/login/perm_identity.svg");
    --bg-color: none;
    --color: black;
    --border-color: #000000;
  }

  .password {
    --icon-link: url("../../assets/login/lock_outline.svg");
    --bg-color: none;
    --color: black;
    --border-color: #000000;
  }

  .email {
    --icon-link: url("../../assets/login/email.svg");
    --bg-color: none;
    --color: black;
    --border-color: #000000;
  }
</style>