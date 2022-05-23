<script setup>
  const props = defineProps({
      biover: Object,
      pinState: Boolean
  });

  const emit = defineEmits(['close', 'pinAction'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
    <img src="../../../assets/shared/more/push_pin_fill.svg">
    <header>{{ $t('TheMenu.Dialog.PinHeader_1') }} {{ props.biover.name }} {{ $t('TheMenu.Dialog.PinHeader_2') }}</header>
    <p>{{ $t('TheMenu.Dialog.PinDescription') }}</p>
    <base-radio>
      <button :class="{ 'active': pinState }" @click="pinState = !pinState">
        {{ $t('TheMenu.Dialog.PinAdd') }}
      </button>
      <button :class="{ 'active': !pinState }" @click="pinState = !pinState">
        {{ $t('TheMenu.Dialog.PinRemove') }}
      </button>
    </base-radio>
    <base-input class="dialog-input-color">
      <base-button class="editable" @click="emit('pinAction', pinState)">
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