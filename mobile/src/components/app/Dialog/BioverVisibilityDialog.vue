<script setup>  
  const props = defineProps({
      biover: Object,
      currentVisibility: Boolean,
  });

  const emit = defineEmits(['close', 'visibility'])
</script>

<template>
  <base-dialog class="edit-element"  @close="emit('close')">
    <img src="../../../assets/shared/more/remove_red_eye.svg">
    <header>{{ $t('TheMenu.Dialog.VisibilityHeader') }} {{ props.biover.name }}</header>
    <p>{{ $t('TheMenu.Dialog.VisibilityDescription') }}</p>
    <base-radio>
      <button :class="{ 'active': currentVisibility }" @click="currentVisibility = !currentVisibility">
        {{ $t('TheMenu.Shared.Public') }}
      </button>
      <button :class="{ 'active': !currentVisibility }" @click="currentVisibility = !currentVisibility">
        {{ $t('TheMenu.Dialog.Private') }}
      </button>
    </base-radio>
    <base-input class="dialog-input-color">
      <base-button class="visibility" @click="emit('visibility', currentVisibility)">
        <img style="width:25px; height:25px" src="../../../assets/shared/more/save_alt.svg" />{{ $t('TheMenu.Dialog.Update') }}
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