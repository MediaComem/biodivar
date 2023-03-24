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
  <div class="layout-header">
    <header>
      <p class="material-symbols-sharp icon-margin-header icon-font header-icon-layout" >file_copy</p>
       {{ $t('TheMenu.Dialog.DuplicateHeader') }} {{ props.biover.name }}
    </header>
  </div>
    <p class="description">{{ $t('TheMenu.Dialog.DuplicationDescription') }} </p>
    <base-input class="dialog-input-color">
      <div style="display: flex">
        <p class="material-symbols-sharp icon-margin icon-font fill-font input" style="top: 6px; left: 8px;">short_text</p>
        <input type="text" v-model="duplicateBioverName" :placeholder="$t('TheMenu.Dialog.DuplicatePlaceholder')">
      </div>
      <base-button class="layout-button" @click="emit('duplicate', duplicateBioverName)">
        <p class="material-symbols-sharp icon-margin">done</p><p class="button-text">{{ $t('Button.save') }}</p>
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
@import './dialog.css';

.input {
  position: absolute;
}
</style>