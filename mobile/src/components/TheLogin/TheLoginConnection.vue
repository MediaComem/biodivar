<script setup>
  import { login } from '../../utils/api.js';
  import { ref } from '@vue/reactivity';
  import { useStore } from '../../composables/store.js';

  const { isAuth, username } = useStore();

  const error = ref(false);

  const password = ref('');

  const emit = defineEmits(['forgot-password', 'register']);

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
      <input type="text" v-model="username" :placeholder="$t('TheLogin.placeholder.login.user')">
      <input type="password" v-model="password" :placeholder="$t('TheLogin.placeholder.login.password')">
      <button><img src="../../assets/connexion.svg" />
      {{ $t('TheLogin.button.connexion') }}
      </button>
      <a style="display: block" @click="emit('forgot-password')">{{ $t('TheLogin.forgot-password') }}</a>
    </base-form>
</template>