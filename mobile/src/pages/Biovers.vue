<script setup>
  import { computed } from 'vue'

  import BioversItem from '../components/app/BioversItem.vue';
  import BioversLayout from '../components/TheBiovers/BioversLayout.vue';

  import { useStore } from '../composables/store.js';

  const { biovers, getPinsBiovers } = useStore();

  const pins = computed(() => {
    return getPinsBiovers();
  })
</script>

<template>
  <div>
    <p v-if="biovers.length > 0" style="text-align: start">{{ $t('TheMenu.Pin') }}</p>
    <div v-for="(biover, index) in pins" :key="index">
      <BioversItem :biover="biover" />
    </div>
    <a v-if="biovers.length > 0" class="link" href="#menu">BIOVERS</a>
    <BioversLayout :biovers="biovers" />
  </div>
</template>

<style scoped>
  .link {
    display: flex;
    padding-bottom: 1rem;
  }
</style>