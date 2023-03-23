<script setup>
  const props = defineProps({
      biover: Object,
      favoriState: Boolean
  });

  const emit = defineEmits(['close', 'favoriAction'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
    <div class="layout-header">
      <header>
        <p class="material-symbols-sharp icon-margin-header icon-font fill-font header-icon-layout">star</p>
        {{ $t('TheMenu.Dialog.FavoriHeader_1') }} {{ props.biover.name }} {{ $t('TheMenu.Dialog.FavoriHeader_2') }}
      </header>  
    </div>
    <p class="description">{{ $t('TheMenu.Dialog.FavoriDescription') }}</p>
    <base-radio class="layout-radio">
      <button :class="{ 'active': favoriState }" @click="favoriState = !favoriState">
        {{ $t('TheMenu.Dialog.FavoriAdd') }}
      </button>
      <button :class="{ 'active': !favoriState }" @click="favoriState = !favoriState">
        {{ $t('TheMenu.Dialog.FavoriRemove') }}
      </button>
    </base-radio>
    <base-input class="dialog-input-color">
      <base-button class="layout-button" @click="emit('favoriAction', favoriState)">
         <p class="material-symbols-sharp icon-margin">done</p><p class="button-text">{{ $t('Button.save') }}</p>
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
@import './dialog.css';
</style>