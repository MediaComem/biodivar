<script setup>
  const props = defineProps({
      biover: Object,
      pinState: Boolean
  });

  const emit = defineEmits(['close', 'pinAction'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
  <div class="layout-header">
    <header>
      <p class="material-symbols-sharp icon-margin-header icon-font fill-font header-icon-layout">push_pin</p>
       {{ $t('TheMenu.Dialog.PinHeader') }} {{ props.biover.name }}
    </header>
  </div>
    <p class="description">{{ $t('TheMenu.Dialog.PinDescription') }}</p>
    <base-radio class="layout-radio">
      <button :class="{ 'active': pinState }" @click="pinState = !pinState">
        {{ $t('TheMenu.Dialog.PinAdd') }}
      </button>
      <button :class="{ 'active': !pinState }" @click="pinState = !pinState">
        {{ $t('TheMenu.Dialog.PinRemove') }}
      </button>
    </base-radio>
    <base-input class="dialog-input-color">
      <base-button class="layout-button" @click="emit('pinAction', pinState)">
        <p class="material-symbols-sharp icon-margin">done</p><p class="button-text">{{ $t('Button.save') }}</p>
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
@import './dialog.css';
</style>