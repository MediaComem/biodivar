<script setup>
  import { ref, computed } from '@vue/reactivity';

  const bioverName = ref('');

  const props = defineProps({
      biover: Object,
  });

  const emit = defineEmits(['close', 'save'])

  const title = computed({
    get() {
      return props.biover.name;
    },
    set(value) {
      bioverName.value = value;
    }
  })
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
    <img src="../../../assets/shared/more/edit.svg">
    <header>{{ $t('TheMenu.Dialog.TitleHeader') }}</header>
    <base-input class="dialog-input-color">
      <input type="text" v-model="title" :placeholder="$t('TheMenu.Dialog.TitlePlaceholder')">
      <base-button class="edit" @click="emit('save', bioverName)">
        <img src="../../../assets/login/refresh.svg" />{{ $t('TheMenu.Dialog.Save') }}
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
  .edit {
    --link-color: white;
    --highlight-color: #009FE3;
  }
</style>