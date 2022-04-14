<script setup>
  import BaseForm from './base/BaseForm.vue';
  import BaseMessage from './base/BaseMessage.vue';
  import { login } from '../utils/api.js';
  import { ref } from '@vue/reactivity';
  import { isAuth } from '../store.js';

  const username = ref('');
  const password = ref('');
  const error = ref(false);

  function checkAuth () {
    login(username.value, password.value).then(response => {
      if (response?.statusCode !== 200) {
        error.value = true;
        return;
      }
      isAuth.value = true;
    });
  }

</script>

<template>
  <div>
    <img data-role="header" alt="Biodivar" src="../assets/logo.svg" />
    <h1 data-role="title">
      Réalité augmentée géolocalisée pour l'exploration de la nature
    </h1>
    <base-form @submit.prevent="checkAuth()">
      <header>Connexion</header>
      <base-message data-type="error" v-if="error">
        Erreur dans le nom d'utilisateur ou le mot de passe
      </base-message>
      <input type="text" v-model="username" placeholder="email ou nom d'utilisateur">
      <input type="password" v-model="password" placeholder="mot de passe">
      <button>Connexion</button>
    </base-form>
  </div>
</template>

<style scoped>
  div {
    --max-width: 640px;
    min-height: 100%;
    font-family: 'Courier New', Courier, monospace;
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
</style>