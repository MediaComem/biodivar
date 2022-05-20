<script setup>
  const props = defineProps({
      biover: Object,
      favoriState: Boolean
  });

  const emit = defineEmits(['close', 'favoriAction'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
    <img src="../../../assets/shared/more/edit.svg">
    <header>Ajouter le {{ props.biover.name }} au favori</header>
    <base-radio>
      <button :class="{ 'active': favoriState }" @click="favoriState = !favoriState">
        Ajouter au favori
      </button>
      <button :class="{ 'active': !favoriState }" @click="favoriState = !favoriState">
        Retirer des favori
      </button>
    </base-radio>
    <base-input class="dialog-input-color">
      <base-button class="editable" @click="emit('favoriAction', favoriState)">
        <img style="width:25px; height:25px" src="../../../assets/shared/more/save_alt.svg" />{{ $t('TheMenu.Dialog.Update') }}
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