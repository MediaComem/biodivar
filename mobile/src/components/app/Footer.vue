<script setup>
  import { logout } from '../../utils/api.js';
  import { useStore } from '../../composables/store.js';

  const { isIOS } = useStore();

  async function disconnect() {
    const resp = await logout();
    if (resp?.statusCode === 200) {
      isAuth.value = false;
      
    }
  }
</script>

<template>
    <div data-role="footer">
        <div class="container">
          <img src="../../assets/shared/home.svg" alt="home">
          <p>Accueil</p>
        </div>
        <div class="container" v-if="!isIOS && isWebXRAvailable">
          <img src="../../assets/footer/biovers.svg" alt="home">
          <p>biovers</p>
        </div>
        <div class="container">
          <img src="../../assets/footer/new-biovers.svg" alt="home">
          <p>nouveau</p>
        </div>
        <div class="container">
          <img src="../../assets/footer/visualisation.svg" alt="home">
          <p>visualisation</p>
        </div>
        <div class="container">
          <img src="../../assets/footer/settings.svg" alt="home">
          <p>réglages</p>
        </div>
        <div class="container" @click="disconnect()">
          <img src="../../assets/footer/logout.svg" alt="home">
          <p>déconnexion</p>
        </div>
    </div>
</template>

<style scoped>
  [data-role="footer"] {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 56px;
    background-color: black;
    text-align: center;
    justify-content: space-around;
    cursor: pointer;
  }

  .container {
    padding-top: 10px;
    width: 50px;
    height: 36px;
    display: inline-block;
  }
  
  img {
    width: 24px;
    height: 24px;
    color: white;
  }

  p {
    margin: 0;
    color: #F2F2F2;
    font-size: 8px;
  }
</style>