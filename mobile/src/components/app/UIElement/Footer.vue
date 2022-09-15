<script setup>
  import { logout } from '../../../utils/api.js';
  import { useStore } from '../../../composables/store.js';

  const { isIOS, isAuth, section } = useStore();

  async function disconnect() {
    const resp = await logout();
    if (resp?.statusCode === 200) {
      isAuth.value = false;
    }
  }
</script>

<template>
    <div data-role="footer">
      <a href="#menu">
        <div class="container">
          <p class="material-symbols-sharp">home</p>
          <p class="text-font">{{ $t('Footer.Homepage') }}</p>
        </div>
      </a>
      <a href="#biovers">
        <div class="container" v-if="!isIOS">
          <img src="../../../assets/footer/biovers.svg" alt="home">
          <p class="text-font">{{ $t('Footer.Biover') }}</p>
        </div>
      </a>
        <div class="container">
          <img src="../../../assets/footer/new-biovers.svg" alt="new">
          <p class="text-font">{{ $t('Footer.New') }}</p>
        </div>
        <div class="container" @click="section = 'admin'">
          <img src="../../../assets/footer/visualisation.svg" alt="visualize">
          <p class="text-font">{{ $t('Footer.Visualize') }}</p>
        </div>
        <div class="container">
          <p class="material-symbols-sharp">settings</p>
          <p class="text-font">{{ $t('Footer.Settings') }}</p>
        </div>
        <div class="container" @click="disconnect()">
          <p class="material-symbols-sharp">logout</p>
          <p class="text-font">{{ $t('Footer.Logout') }}</p>
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
  }

  .text-font {
    font-family: 'BiodivAR Book';
    font-size: 8px;
    line-height: 8px;
  }
</style>