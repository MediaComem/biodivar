<script setup>  
  const props = defineProps({
      biover: Object,
      currentVisibility: Boolean,
  });

  const emit = defineEmits(['close', 'visibility'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
    <img src="../../../assets/shared/more/remove_red_eye.svg" alt="aggreement">
    <header>Changer la visibilité du biover {{ props.biover.name }}</header>
    <base-radio>
      <button :class="{ 'active': currentVisibility }" @click="currentVisibility = !currentVisibility">
        Public
      </button>
      <button :class="{ 'active': !currentVisibility }" @click="currentVisibility = !currentVisibility">
        Privé
      </button>
    </base-radio>
    <base-input class="dialog-input-color">
      <base-button class="visibility" @click="emit('visibility', currentVisibility)">
        <img src="../../../assets/shared/more/remove_red_eye_white.svg" />Update
      </base-button>
    </base-input>
  </base-dialog>
</template>

<style scoped>
  .visibility {
    --link-color: white;
    --highlight-color: #009FE3;
  }
</style>