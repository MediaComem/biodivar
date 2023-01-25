<script setup>
  import { ref } from '@vue/reactivity';

  const duplicateBioverName = ref('');

  const props = defineProps({
      biover: Object,
  });

  const emit = defineEmits(['close', 'duplicate'])
</script>

<template>
  <base-dialog class="edit-element" @close="emit('close')">
  <div style="display: flex; justify-content: center;">
    <header><p class="material-symbols-sharp icon-margin-header icon-font header-icon-layout" >file_copy</p> {{ $t('TheMenu.Dialog.DuplicateHeader') }} {{ props.biover.name }}</header>
  </div>
    <p class="description">{{ $t('TheMenu.Dialog.DuplicationDescription') }} </p>
    <base-input class="dialog-input-color">
      <div style="display: flex">
        <p class="material-symbols-sharp icon-margin icon-font fill-font input" style="top: 6px; left: 8px;">short_text</p>
        <input type="text" v-model="duplicateBioverName" :placeholder="$t('TheMenu.Dialog.DuplicatePlaceholder')">
      </div>
      <base-button class="duplicate" @click="emit('duplicate', duplicateBioverName)">
        <p class="material-symbols-sharp icon-margin">done</p><p class="button-text">enregistrer</p>
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
  header {
    margin: 0;
  }

  .duplicate {
    --link-color: white;
    --highlight-color: #009FE3;
    width: 100% !important;
    margin: 0 !important;
  }

  .input {
    position: absolute;
  }

  .header-icon-layout {
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -4px;
  }

  .icon-font {
    font-size: 16px;
    display: inline-block;
    height: auto;
  }

  .icon-margin-header {
    margin: 0px;
    transform: translate(0px, 2px);
  }

  .icon-margin {
    margin: 0px;
    padding-right: 4px;
  }

  .fill-font {
    font-variation-settings: "FILL" 1;
  }

  .description-transform {
    transform: scaleY(-1);
  }

  .button-text {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-bottom: 3px;
    font-variation-settings: "wght" 149, "ital" 0;
    text-transform: uppercase;
  }

  .description {
    margin-bottom: 1.4rem;
  }
</style>