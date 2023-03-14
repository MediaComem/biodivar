<script setup>  
  const props = defineProps({
      biover: Object,
      currentEditable: Boolean,
  });

  const emit = defineEmits(['close', 'editable'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
    <div class="layout-header">
      <header>
        <p class="material-symbols-sharp icon-margin-header icon-font fill-font header-icon-layout">edit</p>
         Rendre {{ props.biover.name }} modifiable ou non modifiable
      </header>
    </div>
    <p class="description">{{ $t('TheMenu.Dialog.EditableDescription') }}</p>
    <base-radio class="layout-radio">
      <button :class="{ 'active': currentEditable }" @click="currentEditable = !currentEditable">
        {{ $t('TheMenu.Dialog.Editable') }}
      </button>
      <button :class="{ 'active': !currentEditable }" @click="currentEditable = !currentEditable">
        {{ $t('TheMenu.Dialog.NotEditable') }}
      </button>
    </base-radio>
    <base-input class="dialog-input-color">
      <base-button class="layout-button" @click="emit('editable', currentEditable)">
        <p class="material-symbols-sharp icon-margin">done</p><p class="button-text">{{ $t('Button.save') }}</p>
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
@import './dialog.css';
</style>