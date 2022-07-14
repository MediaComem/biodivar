<script setup>
  import { ref, onMounted } from 'vue'

  import Footer from './app/UIElement/Footer.vue';

  import TheAframe from './TheAframe/TheAframe.vue';
  import TheHud from './TheHud/TheHud.vue';
  import { useRouter } from '../composables/router.js';
  import { useStore } from '../composables/store.js';
  import { storage } from '../composables/localStorage.js';
  import { logout, getBiovers } from '../utils/api.js';
  import { isMobileDevice } from '../utils/device.js';

  import BaseMap from './TheMap/BaseMap.vue';

  const { section, isMobileOrTablet, isIOS, isAuth, biovers, mapOpen } = useStore();

  const { removeUser } = storage();

  const { page, route } = useRouter();

  const menu = ref(false);

  async function disconnect() {
    const resp = await logout();
    if (resp?.statusCode === 200) {
      isAuth.value = false;
      removeUser();
    }
  }

  function closeDialog() {
    menu.value = false;
  }

  onMounted(() => {
    isMobileOrTablet.value = isMobileDevice();
    isIOS.value = AFRAME.utils.device.isIOS();

    biovers.value = [];

    getBiovers().then((resp) => {
      resp.data.forEach((biover) => {
        biovers.value.push(biover);
      })
    })
  });
</script>

<template>

  <div v-if="section == 'menu'">
    <base-modal style="text-align: center;">
      <div data-role="screen">
        <header>
          <div class="logo" @click="menu = false">
            <img alt="Biodivar" src="../assets/shared/logo.svg" />
          </div>
          <div class="account">
            <img class="acount-image" alt="Account" src="../assets/shared/account_circle.svg" @click="menu = !menu">
            <ul v-if="menu">
              <li class="menu-item-divider font"><img class="menu-item" alt="Pencil" src="../assets/shared/edit.svg"> {{ $t('Header.Modify') }}</li>
              <li @click="disconnect()" class="font"><img class="menu-item" alt="Disconnect" src="../assets/shared/logout.svg"> {{ $t('Header.Logout') }}</li>
            </ul>
            <div v-if="menu" class="dialog-overlay" @click="closeDialog()"/>
          </div>
        </header>
        <component :is="page" @click="menu = false" />
      </div>
      <Footer v-if="isMobileOrTablet" @click="menu = false"/>
    </base-modal>
  </div>

  <div v-else-if="section == 'ar'">
    <the-aframe></the-aframe>
    <the-hud></the-hud>
    <BaseMap v-if="mapOpen" />
    <div v-if="mapOpen" class="dialog-map-overlay" @click="mapOpen = false"></div>
  </div>

</template>

<style scoped>
  header {
    border-bottom: solid black 1px;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    display: flex;
  }

  ul {
    display: block;
    position: absolute;
    top: 2.2rem;
    z-index: 100;
    background-color: #F2F2F2;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 232px;
    border-radius: 0.5rem;
  }

  li {
    display: flex;
    align-items: center;
    padding-left: 1rem;
    z-index: 100;
    height: 40px;
  }

  li:hover {
    background-color: #8DC26F;
    mix-blend-mode: multiply;
  }

  [data-role="screen"] {
    display: inline-block;
    max-width: 1280px;
    min-height: 100%;
    width: 100%;
  }

  .logo {
    height: 22px;
    width: 75%;
    justify-content: flex-start;
    display: flex;
  }

  .account {
    display: flex;
    width: 25%;
    justify-content: flex-end;
    cursor: pointer;
  }

  .account-image {
    width: 24px;
    height: 24px;
  }

  .menu-item {
    padding-right: 10px;
  }

  .menu-item-divider {
    border-bottom: 1px solid #BDBDBD
  }

  .dialog-overlay {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
  }


  .dialog-map-overlay {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 0.5;
  }

  .font {
    font-family: 'BiodivAR Medium';
    font-size: 16px;
    line-height: 16px;
  }
</style>
