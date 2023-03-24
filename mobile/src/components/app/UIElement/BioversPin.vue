<script setup>
import { computed } from 'vue';
import { useStore } from '../../../composables/store.js';

const { getPinsBiovers } = useStore();

const pins = computed(() => {
  return getPinsBiovers();
});
</script>

<template>
  <div v-if="pins.length > 0" style="display: flex">
    <p class="material-symbols-sharp font-symbol">push_pin</p>
    <p class="font-pin">biovers épinglé·s&thinsp;:</p>
  </div>
</template>

<style scoped>
.font-pin {
  font-family: 'BiodivAR Roman';
  font-variation-settings: 'wght' 85, 'ital' 0;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.04em;
  align-items: center;
  display: flex;
  text-align: start;
}

.font-symbol {
  font-variation-settings: 'FILL' 0;
  font-size: 16px;
  line-height: 12px;
  letter-spacing: 0.04em;
  padding-right: 4px;

}
</style>
