<script setup>
import { onMounted } from 'vue';
import Layout from '@/views/Layout.vue';
import axios from 'axios';
import { useStore } from 'vuex';

const store = useStore();

async function checkLoggin() {
  try {
    await axios.get(`${process.env.VUE_APP_URL}/login`, { withCredentials: true });
  } catch (error) {
    store.dispatch('auth/authenticate', {
      isAuthenticate: false,
      username: '',
    });
  }
}

onMounted(() => {
  checkLoggin();
});
</script>

<template>
  <Layout />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#body {
  margin: 0;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
