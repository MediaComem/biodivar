<script setup>  
  const props = defineProps({
      biover: Object,
      currentEditable: Boolean,
  });

  const emit = defineEmits(['close', 'editable'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
    <img src="../../../assets/shared/more/edit.svg" alt="aggreement">
    <header>Changer le droit de modification du biover {{ props.biover.name }}</header>
    <base-radio>
      <button :class="{ 'active': currentEditable }" @click="currentEditable = !currentEditable">
        Editable
      </button>
      <button :class="{ 'active': !currentEditable }" @click="currentEditable = !currentEditable">
        Non-Editable
      </button>
    </base-radio>
    <base-input class="dialog-input-color">
      <base-button class="editable" @click="emit('editable', currentEditable)">
        <img src="../../../assets/shared/more/edit.svg" />Update
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
  .editable {
    --link-color: white;
    --highlight-color: #009FE3;
  }
</style>