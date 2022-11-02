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
    <p class="material-symbols-sharp icon-margin icon-font fill-font header-icon-layout">edit</p>
    <header>{{ $t('TheMenu.Dialog.TitleHeader') }}</header>
    <p class="description">{{ $t('TheMenu.Dialog.TitleDescription') }}</p>
    <base-input class="dialog-input-color">
      <div style="display: flex">
        <p class="material-symbols-sharp icon-margin icon-font fill-font input" style="top: 4px; left: 25px;">short_text</p>
        <input type="text" v-model="bioverName" :placeholder="$t('TheMenu.Dialog.TitlePlaceholder')">
      </div>
      <div style="display: flex">
        <p class="material-symbols-sharp icon-margin icon-font fill-font input description-transform" style="top: 51px; left: 25px;">short_text</p>
        <input type="text" v-model="bioverDescription" :placeholder="$t('TheMenu.Dialog.DescriptionPlaceholder')">
      </div>
      <div style="display: flex">
        <p class="material-symbols-sharp icon-margin icon-font fill-font input" style="top: 97px; left: 25px;">my_location</p>
        <input type="text" v-model="bioversLocation" placeholder="emplacement du biovers">
      </div>
      <base-button class="edit" @click="emit('save', { title: bioverName, description: bioverDescription, location: bioversLocation })">
       <p class="material-symbols-sharp icon-margin">done</p><p class="button-text">enregistrer</p>
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
  .edit {
    --link-color: white;
    --highlight-color: #009FE3;
  }

  .input {
    position: absolute;
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