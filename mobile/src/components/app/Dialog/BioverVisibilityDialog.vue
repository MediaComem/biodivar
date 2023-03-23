<script setup>  
  const props = defineProps({
      biover: Object,
      currentVisibility: Boolean,
  });

  const emit = defineEmits(['close', 'visibility'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
    <div class="layout-header">
      <header>
        <p class="material-symbols-sharp icon-margin-header icon-font fill-font header-icon-layout">remove_red_eye</p>
         {{ $t('TheMenu.Dialog.VisibilityHeader') }} {{ props.biover.name }}
      </header>
    </div>
    <p class="description">{{ $t('TheMenu.Dialog.VisibilityDescription') }}</p>
    <base-radio class="layout-radio">
      <button :class="{ 'active': currentVisibility }" @click="currentVisibility = !currentVisibility">
        {{ $t('TheMenu.Shared.Public') }}
      </button>
      <button :class="{ 'active': !currentVisibility }" @click="currentVisibility = !currentVisibility">
        {{ $t('TheMenu.Dialog.Private') }}
      </button>
    </base-radio>
    <base-input class="dialog-input-color">
      <base-button class="layout-button" @click="emit('visibility', currentVisibility)">
       <p class="material-symbols-sharp icon-margin">done</p><p class="button-text">{{ $t('Button.save') }}</p>
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
@import './dialog.css';
</style>