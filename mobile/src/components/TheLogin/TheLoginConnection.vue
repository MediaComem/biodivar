<script setup>
  import { login } from '../../utils/api.js';
  import { ref } from '@vue/reactivity';
  import { useStore } from '../../composables/store.js';
  import { storage } from '../../composables/localStorage.js';
  import { keepAlive } from '../../composables/keepAlive.js';
  import { isMobileDevice } from '../../utils/device.js';

  const { isAuth, username, forgotPassword, section } = useStore();

  const { storeUser } = storage();

  const { setupKeepAlive } = keepAlive();

  const error = ref(false);

  const password = ref('');

  const showPassword = ref(false);

  const emit = defineEmits(['register']);

  async function checkAuth() {
    const resp = await login(username.value, password.value);
    if (resp?.statusCode === 200) {
      if (isMobileDevice()) {
        section.value = 'menu';
      } else {
        section.value = 'admin';
      }
      isAuth.value = true;
      storeUser(resp.data);
      username.value = resp.data;
      setupKeepAlive();
    } else {
      error.value = true;
    }
  }
</script>

<template>
    <base-form @submit.prevent="checkAuth()">
      <base-message data-type="error" v-if="error">
        {{ $t('TheLogin.error.login') }}
      </base-message>
      <p>{{ $t('TheLogin.no-account') }} <a @click="emit('register')">{{ $t('TheLogin.inscription') }}</a></p>
      <base-input class="user">
        <input type="text" v-model="username" :placeholder="$t('TheLogin.placeholder.login.user')">
      </base-input>
      <base-input class="password">
        <input :type="showPassword ? 'text' : 'password'" v-model="password" :placeholder="$t('TheLogin.placeholder.login.password')">
        <span @click="showPassword = !showPassword">
          <img v-if="showPassword" src="../../assets/login/visibility_off.svg">
          <img v-else src="../../assets/login/remove_red_eye.svg">
        </span>
      </base-input>
      <base-button><img src="../../assets/login/connexion.svg" />
      {{ $t('TheLogin.button.connexion') }}
      </base-button>
      <a class="link" @click="forgotPassword = true">{{ $t('TheLogin.forgot-password') }}</a>
    </base-form>
</template>

<style scoped>
  .user {
    --icon-link: url("../../assets/login/perm_identity.svg");
    --bg-color: none;
    --color: black;
  }

  .password {
    --icon-link: url("../../assets/login/lock_outline.svg");
    --bg-color: none;
    --color: black;
  }

  .link {
    display: block;
    font-family: 'BiodivAR Medium';
    font-size: 14px;
    line-height: 14px;
  }
</style>