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
    <img src="../../../assets/shared/more/edit.svg">
    <header>{{ $t('TheMenu.Dialog.TitleHeader') }}</header>
    <p>{{ $t('TheMenu.Dialog.TitleDescription') }}</p>
    <base-input class="dialog-input-color">
      <input type="text" v-model="bioverName" :placeholder="$t('TheMenu.Dialog.TitlePlaceholder')">
      <input type="text" v-model="bioverDescription" :placeholder="$t('TheMenu.Dialog.DescriptionPlaceholder')">
      <input type="text" v-model="bioversLocation" placeholder="Emplacement du biovers">
      <base-button class="edit" @click="emit('save', { title: bioverName, description: bioverDescription, location: bioversLocation })">
        <img style="width:25px; height:25px" src="../../../assets/shared/more/save_alt.svg" />{{ $t('TheMenu.Dialog.Save') }}
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