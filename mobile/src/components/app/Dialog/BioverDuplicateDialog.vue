<script setup>
  import { ref } from '@vue/reactivity';

  const duplicateBioverName = ref('');

  const props = defineProps({
      biover: Object,
  });

  const emit = defineEmits(['close', 'duplicate'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
    <img src="../../../assets/shared/more/file_copy.svg">
    <header>{{ $t('TheMenu.Dialog.DuplicateHeader') }} {{ props.biover.name }}</header>
    <base-input class="dialog-input-color">
      <input type="text" v-model="duplicateBioverName" :placeholder="$t('TheMenu.Dialog.DuplicatePlaceholder')">
      <base-button class="duplicate" @click="emit('duplicate', duplicateBioverName)">
        <img src="../../../assets/shared/more/file_copy.svg" />{{ $t('TheMenu.Dialog.DuplicateButton') }}
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
  .duplicate {
    --link-color: white;
    --highlight-color: #009FE3;
  }
</style>