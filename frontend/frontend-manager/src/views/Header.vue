<template>
  <el-header class="layout">
    <el-menu
      :default-active="$route.path"
      background-color="unset"
      class="menu-layout"
      mode="horizontal"
      router
    >
      <el-menu-item index="/" class="element-position-left menu-title">BiodivAR</el-menu-item>
      <el-menu-item v-if="!isAuthenticate" index="/register" class="element-position-right"
        >S'inscrire</el-menu-item
      >
      <el-menu-item v-if="!isAuthenticate" index="/login" class="element-position-right"
        >Login</el-menu-item
      >
      <el-sub-menu v-if="isAuthenticate" index="user" class="element-position-right">
        <template #title>{{ username }}</template>
          <el-menu-item index="/logout" @click="logout">Logout</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-header>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'Home',
  methods: {
    async logout() {
      try {
        await axios.get(`${process.env.VUE_APP_URL}/logout`, { withCredentials: true });
        this.authenticate({
          isAuthenticate: false,
          username: '',
        });
        this.resetStore();
        this.$router.push('Login');
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions('auth', ['authenticate']),
    ...mapActions('biovers', ['resetStore']),
  },
  computed: {
    ...mapState('auth', ['isAuthenticate', 'username']),
  },
};
</script>

<style lang="scss" scoped>
.layout {
  padding: 0;
  background-color: $green;
}

.menu-layout {
  display: block;
}

.menu-title {
  font-weight: bold;
}

.element-position-left {
  float: left;
}

.element-position-right {
  float: right;
}
</style>
