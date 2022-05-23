<script setup>
  import { ref, onMounted } from 'vue'

  import BioversItem from '../components/app/BioversItem.vue';
  import BioversLayout from '../components/TheBiovers/BioversLayout.vue';

  import { getBiovers } from '../utils/api.js';

  const biovers = ref([]);

  onMounted(() => {
    getBiovers().then((resp) => {
      resp.data.forEach((biover) => {
        biovers.value.push(biover);
      })
    })
  });
</script>

<template>
  <div>
    <p v-if="biovers.length > 0" style="text-align: start">{{ $t('TheMenu.Pin') }}</p>
    <div v-for="(biover, index) in biovers" :key="index">
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