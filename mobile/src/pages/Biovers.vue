<script setup>
  import { computed } from 'vue'

  import BioversItem from '../components/app/BioversItem.vue';
  import BioversLayout from '../components/TheBiovers/BioversLayout.vue';
  import BioverPin from '../components/app/UIElement/BioversPin.vue';
  import Return from '../components/app/UIElement/Return.vue';

  import { useStore } from '../composables/store.js';

  const { biovers, getPinsBiovers } = useStore();

  const pins = computed(() => {
    return getPinsBiovers();
  })
</script>

<template>
  <div>
    <BioverPin />
    <div v-for="(biover, index) in pins" :key="index">
      <BioversItem :biover="biover" />
    </div>
    <Return link="#home" text="BIOVERS" />
    <BioversLayout :biovers="biovers" />
  </div>
</template>