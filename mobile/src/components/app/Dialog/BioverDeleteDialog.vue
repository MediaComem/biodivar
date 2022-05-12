<script setup>
  const props = defineProps({
      biover: Object,
  });

  const emit = defineEmits(['close', 'delete'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
    <img src="../../../assets/shared/more/delete.svg" alt="aggreement">
    <header>Suppression du biover {{ props.biover.name }}</header>
    <p>Etes-vous sûr de vouloir supprimer ce biover?</p>
    <base-input class="dialog-input-color">
      <base-button class="delete" @click="emit('delete')">
        <img src="../../../assets/shared/more/delete.svg" />Save
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