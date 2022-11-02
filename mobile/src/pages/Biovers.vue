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
    <p v-if="pins.length > 0" class="font-pin" style="text-align: start">biovers épinglé·s&thinsp;:</p>
    <div v-for="(biover, index) in pins" :key="index">
      <BioversItem :biover="biover" />
    </div>
    <div class="return"><a class="link" href="#home"> <p class="material-symbols-sharp icon-font icon-margin">arrow_back</p></a><p class="text font">BIOVERS</p></div>
    <BioversLayout class="biover-layout-border" :biovers="biovers" />
  </div>
</template>

<style scoped>
  a {
    color: black;
    text-decoration: none;
  }

  .font-pin {
    font-family: 'BiodivAR Roman';
    font-variation-settings: "wght" 85, "ital" 0;
    font-size: 12px;
    line-height: 12px;
    letter-spacing: 0.04em;
  }

  .font {
    font-family: 'BiodivAR Roman';
    font-variation-settings: "wght" 110, "ital" 0;
    font-size: 18px;
    line-height: 14px;
    letter-spacing: 0.02em;
  }

  .icon-font {
    font-size: 20px;
  }

  .icon-margin {
    margin: 0px;
    padding-right: 6px;
  }

  .link {
    padding-bottom: 1rem;
  }

  .return {
    display: flex;
    height: 36px;
  }

  .text {
    margin: 0;
    padding-top: 5px;
  }

  .biover-layout-border {
    --border-radius: 2rem;
  }
</style>