<script setup>
  import { onMounted } from 'vue';
  import { ref } from '@vue/reactivity';

  const bioverName = ref('');
  const bioverDescription = ref('');
  const bioversLocation = ref('');

  const props = defineProps({
      biover: Object,
  });

  const emit = defineEmits(['close', 'save'])

  onMounted(() => {
    bioverName.value = props.biover.name;
    bioverDescription.value = props.biover.description;
    bioversLocation.value = props.biover.location;
  })
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
    <div style="display:flex; justify-content: center;">
      <header><p class="material-symbols-sharp icon-margin icon-font fill-font header-icon-layout">tune</p> {{ $t('TheMenu.Dialog.TitleHeader') }}</header>
    </div>
    <p class="description">{{ $t('TheMenu.Dialog.TitleDescription') }}</p>
    <base-input class="dialog-input-color">
      <div style="display: flex">
        <p class="material-symbols-sharp icon-margin icon-font fill-font input" style="top: 8px; left: 8px;">short_text</p>
        <input type="text" v-model="bioverName" :placeholder="$t('TheMenu.Dialog.TitlePlaceholder')">
      </div>
      <div style="display: flex">
        <p class="material-symbols-sharp icon-margin icon-font fill-font input description-transform" style="top: 55px; left: 8px;">short_text</p>
        <input type="text" v-model="bioverDescription" :placeholder="$t('TheMenu.Dialog.DescriptionPlaceholder')">
      </div>
      <div style="display: flex">
        <p class="material-symbols-sharp icon-margin icon-font input" style="top: 104px; left: 8px;">my_location</p>
        <input type="text" v-model="bioversLocation" placeholder="Emplacement">
      </div>
      <base-button class="edit" @click="emit('save', { title: bioverName, description: bioverDescription, location: bioversLocation })">
       <p class="material-symbols-sharp icon-margin">done</p><p class="button-text">enregistrer</p>
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
  header {
    margin: 0;
  }

  input {
    padding-top: 8px !important;
  }

  .edit {
    --link-color: white;
    --highlight-color: #009FE3;
    width: 100% !important;
    margin: 0 !important;
  }

  .input {
    position: absolute;
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

  .dialog-input-color {
    --border-color: white !important;
    margin-left: 0px !important;
  }
</style>