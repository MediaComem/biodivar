<template>
  <div>
    <el-container class="is-vertical">
    <Header />
      <el-main>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from '@/views/Header.vue';

export default {
  name: 'Home',
  components: {
    Header,
  },
};
</script>

<style scoped>
.is-vertical {
  flex-direction: column;
}
</style>
