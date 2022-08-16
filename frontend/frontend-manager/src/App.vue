<template>
  <Layout />
</template>

<script>
import Layout from '@/views/Layout.vue';
import axios from 'axios';
import { mapActions } from 'vuex';
import setupKeepAlive from './composable/keepAlive';

export default {
  name: 'Home',
  components: {
    Layout,
  },
  methods: {
    async checkLoggin() {
      try {
        const resp = await axios.get(`${process.env.VUE_APP_URL}/login`, { withCredentials: true });
        this.authenticate({
          isAuthenticate: true,
          username: resp.data.data,
        });
        setupKeepAlive(this.authenticate, this.$router);
        this.$router.push('Biovers');
      } catch (error) {
        this.authenticate({
          isAuthenticate: false,
          username: '',
        });
        this.$router.push('Login');
      }
    },
    ...mapActions('auth', ['authenticate']),
  },
  mounted() {
    this.checkLoggin();
  },
};
</script>

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
