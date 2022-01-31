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
      <el-menu-item v-if="getAutheticate" index="/" class="element-position-left"
        >Tableau de bord</el-menu-item
      >
      <el-menu-item v-if="getAutheticate" index="/" class="element-position-left"
        >Biovers</el-menu-item
      >
      <el-menu-item v-if="getAutheticate" index="/" class="element-position-left"
        >Mes données</el-menu-item
      >
      <el-menu-item v-if="!getAutheticate" index="/register" class="element-position-right"
        >S'inscrire</el-menu-item
      >
      <el-menu-item v-if="!getAutheticate" index="/login" class="element-position-right"
        >Login</el-menu-item
      >
      <el-menu-item v-if="getAutheticate" index="/user" class="element-position-right">{{
        getUsername.username
      }}</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['getAutheticate', 'getUsername']),
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
