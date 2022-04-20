<script setup>
  import { login, register } from '../utils/api.js';
  import { ref } from '@vue/reactivity';
  import { useStore } from '../composables/store.js';

  const { isAuth, username } = useStore();

  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  const error = ref(false);

  const page = ref('inscription');

  async function checkAuth() {
    const resp = await login(username.value, password.value);
    if (resp?.statusCode === 200) {
      isAuth.value = true;
    } else {
      error.value = true;
    }
  }

  async function registerUser() {
    const resp = await register(username.value, email.value, password.value);
    if (resp?.statusCode === 200) {
      selectPage('connexion');
    } else {
      error.value = true;
    }
  }

  function selectPage(selection) {
    error.value = false;
    page.value = selection;
  }

</script>

<template>

  <div>

    <img data-role="header" alt="Biodivar" src="../assets/logo.svg" />

    <h1 data-role="title">
      Réalité augmentée géolocalisée pour l'exploration de la nature
    </h1>

    <base-radio>
      <button :class="{ 'active': page === 'connexion' }" @click="selectPage('connexion')">connexion</button>
      <button :class="{ 'active': page === 'inscription' }" @click="selectPage('inscription')">inscription</button>
    </base-radio>

    <base-form v-if="page === 'connexion'" @submit.prevent="checkAuth()">
      <base-message data-type="error" v-if="error">
        Erreur dans le nom d'utilisateur ou le mot de passe
      </base-message>
      <p>Pas encore de compte? <a @click="selectPage('inscription')">Inscrivez-vous</a></p>
      <input type="text" v-model="username" placeholder="email ou nom d'utilisateur">
      <input type="password" v-model="password" placeholder="mot de passe">
      <button><img src="../assets/connexion.svg" />Connexion</button>
      <a style="display: block">Mot de passe oublié?</a>
    </base-form>

    <base-form v-if="page === 'inscription'" @submit.prevent="registerUser()">
      <base-message data-type="error" v-if="error">
        Erreur durant l'enregistrement de l'utilisateur
      </base-message>
      <p>Déjà inscrit·e ? <a @click="selectPage('connexion')">Connectez-vous</a></p>
      <input type="text" v-model="username" placeholder="nom d'utilisateur">
      <input type="text" v-model="email" placeholder="email utilisateur">
      <input type="password" v-model="password" placeholder="mot de passe">
      <input type="password" v-model="confirmPassword" placeholder="confirmer mot de passe">
      <button>Créer un compte</button>
    </base-form>
    <div data-role="footer">
      <div class="heig">
        <img src="../assets/Logo_HEIG-VD_MEI.svg" alt="heig">
      </div>
      <div class="hes">
        <img src="../assets/Logo_HES-SO_Couleurs.svg" alt="hes">
      </div>
      
    </div>
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