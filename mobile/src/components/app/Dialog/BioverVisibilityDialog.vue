<script setup>  
  const props = defineProps({
      biover: Object,
      currentVisibility: Boolean,
  });

  const emit = defineEmits(['close', 'visibility'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
    <p class="material-symbols-sharp icon-margin icon-font fill-font header-icon-layout">remove_red_eye</p>
    <header>{{ $t('TheMenu.Dialog.VisibilityHeader') }} {{ props.biover.name }}</header>
    <p class="description">{{ $t('TheMenu.Dialog.VisibilityDescription') }}</p>
    <base-radio class="layout-radio">
      <button :class="{ 'active': currentVisibility }" @click="currentVisibility = !currentVisibility">
        {{ $t('TheMenu.Shared.Public') }}
      </button>
      <button :class="{ 'active': !currentVisibility }" @click="currentVisibility = !currentVisibility">
        {{ $t('TheMenu.Dialog.Private') }}
      </button>
    </base-radio>
    <base-input class="dialog-input-color">
      <base-button class="visibility" @click="emit('visibility', currentVisibility)">
       <p class="material-symbols-sharp icon-margin">done</p><p class="button-text">enregistrer</p>
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
  .visibility {
    --link-color: white;
    --highlight-color: #009FE3;
  }

  .layout-radio {
    margin-left: 16px !important;
    margin-right: 16px !important;
    width: calc(100% - 32px) !important;
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
    margin-bottom: 2rem;
  }
</style>