<script setup>
  import { login } from '../../utils/api.js';
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useStore } from '../../composables/store.js';
  import { storage } from '../../composables/localStorage.js';
  import { keepAlive } from '../../composables/keepAlive.js';
  import { isMobileDevice } from '../../utils/device.js';

  const { isAuth, username, forgotPassword, section, registerValidated } = useStore();

  const { storeUser } = storage();

  const { setupKeepAlive } = keepAlive();

  const error = ref(false);

  const password = ref('');

  const showPassword = ref(false);

  const emit = defineEmits(['register']);

  async function checkAuth() {
    const resp = await login(username.value, password.value);
    if (resp?.statusCode === 200) {
      isAuth.value = true;
      storeUser(resp.data);
      username.value = resp.data;
      setupKeepAlive();
    } else {
      error.value = true;
    }
  }

  onMounted(() => {
    if (registerValidated.value) {
      setTimeout(() => registerValidated.value = false, 3000);
    }
  })

  onUnmounted(() => {
    registerValidated.value = false;
  })
</script>

<template>
    <base-form @submit.prevent="checkAuth()">
      <base-message data-type="error" v-if="error">
        {{ $t('TheLogin.error.login') }}
      </base-message>
      <base-message v-if="registerValidated">
        compte créé avec succès
      </base-message>
      <p>Pas encore de compte&thinsp;?&nbsp;<a @click="emit('register')">{{ $t('TheLogin.inscription') }}</a></p>
      <base-input class="user">
        <p class="material-symbols-sharp icon-margin icon-position" style="top: 3px">perm_identity</p>
        <input class="input-layout" type="text" v-model="username" :placeholder="$t('TheLogin.placeholder.login.user')">
      </base-input>
      <base-input class="password">
        <p class="material-symbols-sharp icon-margin icon-position" style="top: 3px">lock_outline</p>
        <input class="input-layout" :type="showPassword ? 'text' : 'password'" v-model="password" :placeholder="$t('TheLogin.placeholder.login.password')">
        <span @click="showPassword = !showPassword">
          <p v-if="showPassword" class="material-symbols-sharp icon-margin">visibility_off</p>
          <p v-else class="material-symbols-sharp icon-margin">remove_red_eye</p>
        </span>
      </base-input>
      <base-button>
      <p class="material-symbols-sharp icon-margin-button">login</p><p class="button-text">{{ $t('TheLogin.button.connexion') }}</p>
      </base-button>
      <a class="link" @click="forgotPassword = true">Mot de passe oublié&thinsp;?</a>
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

  .link {
    display: block;
    font-size: 14px;
    line-height: 14px;
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

  .input-layout {
    margin-left: 1rem !important;
    margin-right: 1rem !important;
    width: calc(100% - 2rem) !important;
  }
</style>