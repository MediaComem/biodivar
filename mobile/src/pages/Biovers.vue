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
    <p v-if="pins.length > 0" style="text-align: start">{{ $t('TheMenu.Pin') }}</p>
    <div v-for="(biover, index) in pins" :key="index">
      <BioversItem :biover="biover" />
    </div>
    <div class="return"><a v-if="biovers.length > 0" class="link" href="#menu"><img src="../assets/shared/arrow_back.svg"/></a><p class="text">BIOVERS</p></div>
    <BioversLayout class="biover-layout-border" :biovers="biovers" />
  </div>
</template>

<style scoped>
  a {
    color: black;
    text-decoration: none;
  }

  p {
    font-family: 'BiodivAR Medium';
    font-size: 14px;
    line-height: 14px;
  }

  img {
    padding-right: 1rem;
  }

  .link {
    padding-bottom: 1rem;
  }

  .return {
    display: flex;
  }

  .text {
    margin: 0;
  }

  .biover-layout-border {
    --border-radius: 2rem;
  }
</style>