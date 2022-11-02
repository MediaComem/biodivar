<script setup>
  const props = defineProps({
      biover: Object,
  });

  const emit = defineEmits(['close', 'delete'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
    <p class="material-symbols-sharp icon-margin icon-font header-icon-layout" >delete</p>
    <header>{{ $t('TheMenu.Dialog.DeleteHeader') }} {{ props.biover.name }}</header>
    <p class="description">{{ $t('TheMenu.Dialog.DeleteText') }}</p>
    <base-input class="dialog-input-color">
      <base-button class="delete" @click="emit('delete')">
        <p class="material-symbols-sharp icon-margin icon-font">delete</p><p class="button-text">{{ $t('TheMenu.Dialog.DeleteButton') }}</p>
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
  .delete {
    --link-color: white;
    --highlight-color: rgb(255, 0, 0);
  }

  .header-icon-layout {
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon-font {
    font-size: 20px;
  }

  .icon-margin {
    margin: 0px;
    padding-right: 6px;
  }

  .button-text {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-bottom: 0px;
    font-variation-settings: "wght" 149, "ital" 0;
    text-transform: uppercase;
  }

  .description {
    margin-bottom: 2rem;
  }
</style>