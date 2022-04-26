<script setup>
  const emit = defineEmits(['close'])
</script>

<template>
  <dialog open>
    <div data-role="close" >
      <img src="../../assets/cross.svg" alt="cross" @click="emit('close')">
    </div>
    <div data-role="slot">
      <slot></slot>
    </div>
  </dialog>
</template>

<style scoped>
  dialog {
    border-radius: 1rem;
    border: 0;
    overflow-y: auto;
    width: calc(100% - 1rem);
    max-width: 640px;
  }

  [data-role="close"] {
    justify-content: end;
    display: flex;
  }

  [data-role="slot"] {
    max-height: 95%;
    overflow-y: auto;
  }

  dialog :slotted(header) {
    text-align: center;
    color: var(--color);
    font-size: 1.5rem;
    margin: 1rem 0 4rem 0;
  }

  dialog :slotted(span) {
    color: var(--color);
    font-size: 0.7rem;
    position: absolute;
    width: 100%;
    height: 5%;
    left: 0;
    bottom: 0;
    background-color: rgba(237, 47, 47, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .text-only {
    top: 5%;
    height: 90%;
    background-color: #F2F2F2;
    text-align: center;
  }

  .input {
    top: 25%;
    height: 50%;
    background-color: #F2F2F2;
    text-align: center;
  }

  .result {
    top: 25%;
    height: 50%;
    background: rgb(147,191,112);
    text-align: center;
  }

  .dialog-input-color {
    --color: black;
    --bg-color: white;
  }
</style>