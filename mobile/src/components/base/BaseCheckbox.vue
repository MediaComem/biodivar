<script setup>

</script>

<template>
  <div data-role="check">
    <slot></slot>
  </div>
</template>

<style scoped>
  [data-role="check"] {
    max-width: var(--max-width);
    align-items: center;
    display: inline-flex;
    --bg-color: #E8E8E8;
    --highlight-color: #009FE3;
  }

  form :slotted(input) {
    appearance: none;
    background-color: var(--bg-color);
    border-radius: 4px;
    height: 1rem;
    width: 1rem;
    margin: 0 0.5rem 0 0;
  }

  form :slotted(input:checked) {
    background: var(--highlight-color);
  }

  form :slotted(input:checked::after) {
    content: 'X';
    color: black;
    display: flex;
    align-content: center;
    justify-content: center;
  }

  form :slotted(label) {
    color: var(--color);
    font-family: 'BiodivAR Medium';
    font-size: 14px;
    line-height: 14px;
    margin: 1rem auto 1rem auto;
  }

  form :slotted(a) {
    color: var(--link-color);
    font-family: 'BiodivAR Medium';
    font-size: 14px;
    line-height: 14px;
    cursor: pointer;
    margin: 1rem auto 1rem auto;
  }
</style>