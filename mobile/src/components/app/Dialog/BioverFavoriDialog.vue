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
    <header>{{ $t('TheMenu.Dialog.FavoriHeader_1') }} {{ props.biover.name }} {{ $t('TheMenu.Dialog.FavoriHeader_2') }}</header>
    <p>{{ $t('TheMenu.Dialog.FavoriDescription') }}</p>
    <base-radio>
      <button :class="{ 'active': favoriState }" @click="favoriState = !favoriState">
        {{ $t('TheMenu.Dialog.FavoriAdd') }}
      </button>
      <button :class="{ 'active': !favoriState }" @click="favoriState = !favoriState">
        {{ $t('TheMenu.Dialog.FavoriRemove') }}
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