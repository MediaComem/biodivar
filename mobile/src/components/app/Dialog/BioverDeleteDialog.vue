<script setup>
  const props = defineProps({
      biover: Object,
  });

  const emit = defineEmits(['close', 'delete'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
  <div class="layout-header">
    <header>
      <p class="material-symbols-sharp icon-margin-header icon-font header-icon-layout" >delete</p>
       {{ $t('TheMenu.Dialog.DeleteHeader') }} {{ props.biover.name }}
    </header>
  </div>
    <p class="description">{{ $t('TheMenu.Dialog.DeleteText') }}</p>
    <base-input class="dialog-input-color">
      <base-button class="layout-delete-button" @click="emit('delete')">
        <p class="material-symbols-sharp icon-margin">delete</p><p class="button-text">{{ $t('TheMenu.Dialog.DeleteButton') }}</p>
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
@import './dialog.css';
</style>