<script setup>
  const emit = defineEmits(['close'])
</script>

<template>
  <dialog open>
    <div data-role="close" >
      <img src="../../assets/shared/cross.svg" alt="cross" @click="emit('close')">
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
    position: fixed;
  }

  [data-role="close"] {
    justify-content: end;
    display: flex;
  }

  [data-role="slot"] {
    overflow-y: auto;
  }

  dialog :slotted(header) {
    font-family: 'BiodivAR Roman';
    font-variation-settings: "wght" 149, "ital" 0;
    text-align: center;
    color: var(--color);
    font-size: 16px;
    line-height: 16px;
    margin: 1rem 0 2rem 0;
  }

  dialog :slotted(p) {
    font-variation-settings: "wght" 85, "ital" 0;
    font-size: 12px;
    line-height: 12px;
  }

  dialog :slotted(img.sent-margin) {
    margin: 1rem 0 3rem 0;
  }
  dialog :slotted(p.sent-margin) {
    font-family: 'BiodivAR Roman';
    font-variation-settings: "wght" 149, "ital" 0;
    font-size: 16px;
    line-height: 16px;
    margin: 1rem 0 5rem 0;
  }
  
  .text-only {
    top: 5%;
    height: 90%;
    background-color: #F2F2F2;
    text-align: center;
  }

  .edit-element{
    top: 25%;
    background-color: #F2F2F2;
    text-align: center;
    z-index: 10000;
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
    --border-color: #000000;
  }
</style>