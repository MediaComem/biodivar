<script setup>
  import { ref } from '@vue/reactivity';

  import Footer from './app/Footer.vue';

  import TheAframe from './TheAframe.vue';
  import TheHud from './TheHud.vue';
  import { useRouter } from '../composables/router.js';
  import { useStore } from '../composables/store.js';
  import { logout } from '../utils/api.js';


  const { section, isMobileOrTablet, isAuth } = useStore();

  const { page, route } = useRouter();

  const menu = ref(false);

  async function disconnect() {
    const resp = await logout();
    if (resp?.statusCode === 200) {
      isAuth.value = false;
    }
  }

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
              <li class="menu-item-divider"><img class="menu-item" alt="Pencil" src="../assets/shared/edit.svg"> {{ $t('Header.Modify') }}</li>
              <li @click="disconnect()"><img class="menu-item" alt="Disconnect" src="../assets/shared/logout.svg"> {{ $t('Header.Logout') }}</li>
            </ul>
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
</style>
