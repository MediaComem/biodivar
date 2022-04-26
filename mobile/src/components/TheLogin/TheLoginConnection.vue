<script setup>
  import { login } from '../../utils/api.js';
  import { ref } from '@vue/reactivity';
  import { useStore } from '../../composables/store.js';

  const { isAuth, username, forgotPassword } = useStore();

  const error = ref(false);

  const password = ref('');

  const emit = defineEmits(['register']);

  async function checkAuth() {
    const resp = await login(username.value, password.value);
    if (resp?.statusCode === 200) {
      isAuth.value = true;
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
        <input type="password" v-model="password" :placeholder="$t('TheLogin.placeholder.login.password')">
      </base-input>
      <base-button><img src="../../assets/connexion.svg" />
      {{ $t('TheLogin.button.connexion') }}
      </base-button>
      <a style="display: block" @click="forgotPassword = true">{{ $t('TheLogin.forgot-password') }}</a>
    </base-form>
</template>

<style scoped>
  .user {
    --icon-link: url("../../assets/perm_identity.svg");
    --bg-color: none;
    --color: black;
  }

  .password {
    --icon-link: url("../../assets/lock_outline.svg");
    --icon-link-right: url("../../assets/remove_red_eye.svg");
    --bg-color: none;
    --color: black;
  }
</style>