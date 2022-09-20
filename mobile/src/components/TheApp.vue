<script setup>
  import { ref, onMounted } from 'vue'

  import Footer from './app/UIElement/Footer.vue';

  import TheAframe from './TheAframe/TheAframe.vue';
  import TheHud from './TheHud/TheHud.vue';
  import { useRouter } from '../composables/router.js';
  import { useStore } from '../composables/store.js';
  import { storage } from '../composables/localStorage.js';
  import { logout, getBiovers, getBioversByUser } from '../utils/api.js';
  import { isMobileDevice } from '../utils/device.js';

  import BaseMap from './TheMap/BaseMap.vue';

  const { section, isMobileOrTablet, isIOS, isAuth, biovers, mapOpen, username } = useStore();

  const { removeUser } = storage();

  const { page, route } = useRouter();

  const menu = ref(false);

  async function disconnect() {
    const resp = await logout();
    if (resp?.statusCode === 200) {
      isAuth.value = false;
      removeUser();
      username.value = '';
    }
  }

  function closeDialog() {
    menu.value = false;
  }

   onMounted(async () => {
    isMobileOrTablet.value = isMobileDevice();
    isIOS.value = AFRAME.utils.device.isIOS();

    biovers.value = [];

    const publicBiovers = await getBiovers();
    const own = await getBioversByUser();

    const difference = publicBiovers.data.filter(
      (x) => !own.data.some((present) => present.id === x.id),
    );

    own.data.forEach((biover) => {
      biovers.value.push(biover);
    })

    difference.forEach((biover) => {
      biovers.value.push(biover);
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
        <div class="central-headers">
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
      <div data-role="component">
        <component :is="page" @click="menu = false" />
      </div>
      </div>
    </base-modal>
  </div>

  <div v-else-if="section == 'ar'">
    <the-aframe></the-aframe>
    <the-hud>
      <BaseMap v-if="mapOpen" />
      <div v-if="mapOpen" class="dialog-map-overlay" @click="mapOpen = false"></div>
    </the-hud>
  </div>

</template>

<style scoped>
  header {
    border-bottom: solid black 1px;
    margin-bottom: 1rem;
    display: flex;
    padding: 10px 10px 1rem 10px;
    background-color: #699A3F;
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
    z-index: 1000;
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
    min-height: 100%;
    width: 100%;
    padding-bottom: 56px;
  }

  [data-role="component"] {
    padding: 0px 10px 10px 10px;
  }

  .logo {
    height: 22px;
    width: 80%;
    justify-content: flex-start;
    display: flex;
  }

  .col {
    width: 33%;
  }

  .col > p {
    margin: 0px;
    cursor: pointer;
  }

  .account {
    display: flex;
    width: 20%;
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
