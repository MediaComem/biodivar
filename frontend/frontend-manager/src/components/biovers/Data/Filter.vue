<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const filterInput = ref('');

function filter(key) {
  store.dispatch('biovers/filter', key);
}

function filtering() {
  filter(filterInput.value);
}
</script>

<template>
  <el-input
    v-model="filterInput"
    placeholder="Filter"
    @input="filtering"
    clearable
  />
</template>
