<script setup>
import { watch, ref } from "vue";

const emit = defineEmits(['update'])

const inputValue = ref('');


watch(() => inputValue.value, () => {
  emit('update', inputValue.value)
});
</script>

<template>
  <base-input class="search">
    <p class="material-symbols-sharp icon-margin icon-font fill-font">search</p>
    <input type="text" v-model="inputValue" style="grid-area: 1 / 1 / 2 / 3" />
  </base-input>
</template>

<style scoped>
.search {
      padding-top: 0.8rem;
      padding-left: 0.8rem;
      padding-right: 0.8rem;
      width: 100%;
      margin-left: 0px !important;
      margin-right: 0px !important;
      --bg-color: #E0E0E0;
      --border-color: #000000;
      margin-bottom: -2px;
      position: inherit !important;
      display: grid;
      grid-template-columns: 46px 1fr;

  }

  .search input {
    border-color: #E0E0E0 !important;
  }

  .icon-font {
    font-size: 20px;
  }

  .icon-margin {
    margin: 0px;
    padding-top: 5px;
    padding-left: 5px;
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    z-index: 1;
  }
</style>