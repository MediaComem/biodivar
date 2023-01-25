<script setup>
  const props = defineProps({
      biover: Object,
      pinState: Boolean
  });

  const emit = defineEmits(['close', 'pinAction'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
  <div style="display: flex; justify-content: center;">
    <header><p class="material-symbols-sharp icon-margin-header icon-font fill-font header-icon-layout">push_pin</p> {{ $t('TheMenu.Dialog.PinHeader') }} {{ props.biover.name }}</header>
  </div>
    <p class="description">{{ $t('TheMenu.Dialog.PinDescription') }}</p>
    <base-radio class="layout-radio">
      <button :class="{ 'active': pinState }" @click="pinState = !pinState">
        {{ $t('TheMenu.Dialog.PinAdd') }}
      </button>
      <button :class="{ 'active': !pinState }" @click="pinState = !pinState">
        {{ $t('TheMenu.Dialog.PinRemove') }}
      </button>
    </base-radio>
    <base-input class="dialog-input-color">
      <base-button class="editable" @click="emit('pinAction', pinState)">
        <p class="material-symbols-sharp icon-margin">done</p><p class="button-text">enregistrer</p>
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
  header {
    margin: 0;
  }
  .editable {
    --link-color: white;
    --highlight-color: #009FE3;
    width: 100% !important;
    margin: 0 !important;
  }

  .layout-radio {
    margin-left: 0px !important;
    margin-right: 0px !important;
    width: 100% !important;
    --border-color: black;
    --active-color: white;
    --active-bg-color: black;
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

  .fill-font {
    font-variation-settings: "FILL" 1;
  }

  .description-transform {
    transform: scaleY(-1);
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