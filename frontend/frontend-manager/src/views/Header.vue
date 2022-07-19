<script setup>
import {
  ref,
  onMounted,
  computed,
  watch,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

import { mapStore } from '../composables/map';

const menu = ref(false);
const currentRoute = ref('');

const store = useStore();
const router = useRouter();

const { mapOpen } = mapStore();

watch(() => router.currentRoute.value.path, (path) => {
  currentRoute.value = path.toLowerCase();
});

async function logout() {
  try {
    await axios.get(`${process.env.VUE_APP_URL}/logout`, { withCredentials: true });
    store.dispatch('auth/authenticate', {
      isAuthenticate: false,
      username: '',
    });
    store.dispatch('biovers/resetStore');
    router.push('Login');
  } catch (error) {
    console.log(error);
  }
}

const isAuthenticate = computed(() => store.state.auth.isAuthenticate);

const username = computed(() => store.state.auth.username);

onMounted(() => {
  currentRoute.value = router.currentRoute.value.path.toLowerCase();
});
</script>

<template>
  <div class="layout">
      <router-link id="logo" to="/">
        <img class="logo-image" alt="Biodivar" src="../assets/logo.svg" />
      </router-link>

      <div v-if="isAuthenticate" class="ar-layout">
        <img class="image" alt="Biodivar" src="../assets/headers/ar_mode.svg" />
        <p>RA</p>
      </div>

      <div v-if="isAuthenticate" class="map-layout">
        <div @click="mapOpen = !mapOpen" class="map-action">
          <img class="image" alt="Biodivar" src="../assets/headers/map_action.svg" />
          <p>Carte</p>
        </div>
      </div>

      <div v-if="isAuthenticate" class="settings-layout">
        <div class="settings-action">
          <img class="image" alt="Biodivar" src="../assets/headers/settings.svg" />
          <p>Préférences</p>
        </div>
      </div>

      <div v-if="!isAuthenticate" class="connection">
        <router-link
          v-if="currentRoute === '/' || currentRoute === '/login'"
          class="connection-link"
          to="/register"
        >
          {{ $t('header.register') }}
        </router-link>
        <router-link
          v-if="currentRoute === '/register'"
          class="connection-link"
          to="/login"
        >
          {{ $t('header.login') }}
        </router-link>
      </div>

      <div v-if="isAuthenticate" class="connection">
        <div class="user-action-layout">
          <div class="user-action" @click="menu = !menu">
            <div class="user-button">
              <img class="account-icon" src="../assets/headers/account.svg" alt="account">
              <p>{{ username }}</p>
              <img class="more-icon" src="../assets/headers/more.svg" alt="account">
            </div>
          </div>
          <div class="menu-action">
            <ul v-if="menu">
              <li @click="logout()">Logout</li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  padding: 0;
  background-color:  RGB(105, 154, 63);
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 50px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

#logo {
  grid-area: 1 / 1 / 2 / 2;
  height: 50px;
}

.logo-image {
  display: flex;
  height: 40px;
  padding-top: 3px;
  padding-left: 10px;
}

.image {
  height: 20px;
  padding-top: 16px;
  padding-right: 5px;
}

.ar-layout {
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  justify-content: center;
}

.map-layout {
  grid-area: 1 / 3 / 2 / 4;
  display: flex;
  justify-content: center;
}

.map-action {
  display: flex;
  cursor: pointer;
}

.settings-layout {
  grid-area: 1 / 4 / 2 / 5;
  display: flex;
  justify-content: center;
}

.settings-action {
  display: flex;
  cursor: pointer;
}

.connection {
  grid-area: 1 / 5 / 2 / 6;
  height: 200px;
  z-index: 1000;
  text-align: right;
  padding-right: 10px;
}

.connection-link {
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
    cursor: pointer;
    margin-bottom: 0;
    margin-top: 12px;
}

.user-action-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.user-action {
  grid-area: 1 / 1 / 2 / 2;
  background-color: rgb(141, 194, 111);
  width: 50%;
  height: 40px;
  margin-top: 5px;
  margin-left: 40%;
  border-radius: 30px;;
  cursor: pointer;
}

.user-button {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 40px;
}

.account-icon {
  grid-area: 1 / 1 / 2 / 2;
  height: 25px;
  margin-top: auto;
  margin-bottom: auto;
  padding-left: 5px;
}

.user-button > p {
  grid-area: 1 / 2 / 2 / 3;
  margin: 0;
  display: flex;
  justify-content: center;
  margin-top: auto;
  margin-bottom: auto;
}

.more-icon {
  grid-area: 1 / 3 / 2 / 4;
  height: 25px;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  padding-right: 5px;
}

.menu-action {
  grid-area: 2 / 1 / 3 / 2;
  width: 50%;
  height: 40px;
  margin-left: 40%;
}

ul {
  margin-top: 0;
  margin-bottom: 0;
  height: 40px;
  background-color: rgb(141, 194, 111);
  list-style: none;
}

li {
  z-index: 1001;
  cursor: pointer;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 5px;
}

</style>
