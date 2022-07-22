<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

import BioverCreator from '../Dialog/BioverCreator.vue';

const store = useStore();

const currentBioversId = computed(() => store.state.biovers.currentBioversId);

const bioversCreator = ref(false);

function openBioversCreator() {
  bioversCreator.value = true;
}

function closeBioversCreator() {
  bioversCreator.value = false;
}
</script>

<template>
  <div class="action-layout">
    <BaseButton class="button" @click="openBioversCreator">
      <img src="../../../assets/body/add.svg" alt="add">
      Créer un nouveau biovers
    </BaseButton>
    <BioverCreator :showDialog="bioversCreator" @closeDialog="closeBioversCreator"/>
    <BaseButton v-if="currentBioversId !== 0" class="button">
      <img src="../../../assets/body/upload.svg" alt="add">
      Importer .json
    </BaseButton>
    <BaseButton v-if="currentBioversId !== 0" class="button">
      <img src="../../../assets/body/publish.svg" alt="add">
      Publier
    </BaseButton>
  </div>
</template>

<style scoped>
.action-layout {
  display: flex;
}

.button {
  --link-color: white;
  --highlight-color: #2F80ED;
}
</style>
