<script setup>
import Header from '@/views/Header.vue';
</script>

<template>
  <div>
    <el-container class="is-vertical">
    <Header />
    <el-main class="main-layout">
      <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style  lang="scss" scoped>
.is-vertical {
  flex-direction: column;
  min-height: 100vh;
}

.main-layout {
  background-color: RGB(141, 194, 111);
}
</style>
