<script setup>
  const emit = defineEmits(['close'])
</script>

<template>
  <dialog open>
    <div data-role="close" >
      <img src="../../assets/cross.svg" alt="cross" @click="emit('close')">
    </div>
    <slot></slot>
  </dialog>
</template>

<style scoped>
  dialog {
    border-radius: 1rem;
    border: 0;
    margin: 0;
    overflow-y: auto;
    width: calc(100% - 1rem);
    max-width: var(--max-width);
    left: calc(50% - calc(100% - 1rem) / 2);
  }

  [data-role="close"] {
    justify-content: end;
    display: flex;
  }

  dialog :slotted(header) {
    text-align: center;
    color: var(--color);
    font-size: 1.5rem;
    margin: 1rem 0 4rem 0;
  }
  
  .text-only {
    top: 5%;
    height: 90%;
    background-color: #F2F2F2;
  }

  .input {
    max-width: var(--max-width);
    top: 25%;
    height: 50%;
    background-color: #F2F2F2;
  }

  .dialog-input-color {
    --color: black;
    --bg-color: white;
  }
</style>