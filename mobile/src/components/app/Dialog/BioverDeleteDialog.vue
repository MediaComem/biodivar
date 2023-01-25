<script setup>
  const props = defineProps({
      biover: Object,
  });

  const emit = defineEmits(['close', 'delete'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
  <div style="display: flex; justify-content: center;">
    <header><p class="material-symbols-sharp icon-margin-header icon-font header-icon-layout" >delete</p> {{ $t('TheMenu.Dialog.DeleteHeader') }} {{ props.biover.name }}</header>
  </div>
    <p class="description">{{ $t('TheMenu.Dialog.DeleteText') }}</p>
    <base-input class="dialog-input-color">
      <base-button class="delete" @click="emit('delete')">
        <p class="material-symbols-sharp icon-margin">delete</p><p class="button-text">{{ $t('TheMenu.Dialog.DeleteButton') }}</p>
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
  header {
    margin: 0;
  }

  .delete {
    --link-color: white;
    --highlight-color: rgb(255, 0, 0);
    width: 100% !important;
    margin: 0 !important;
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