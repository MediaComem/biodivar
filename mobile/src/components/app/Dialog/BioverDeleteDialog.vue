<script setup>
  const props = defineProps({
      biover: Object,
  });

  const emit = defineEmits(['close', 'delete'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
    <img src="../../../assets/shared/more/delete.svg">
    <header>{{ $t('TheMenu.Dialog.DeleteHeader') }} {{ props.biover.name }}</header>
    <p>{{ $t('TheMenu.Dialog.DeleteText') }}</p>
    <base-input class="dialog-input-color">
      <base-button class="delete" @click="emit('delete')">
        <img src="../../../assets/shared/more/delete_white.svg" />{{ $t('TheMenu.Dialog.DeleteButton')}}
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
  .delete {
    --link-color: white;
    --highlight-color: rgba(255, 0, 0, 0.5);
  }
</style>