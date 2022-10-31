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
    --bg-color: none;
    --highlight-color: none;
  }

  form :slotted(input) {
    appearance: none;
    background-color: var(--bg-color);
    border-radius: 4px;
    height: 1rem;
    width: 1rem;
    margin: 0 0.5rem 0 0;
    border: 1px solid black;
  }

  form :slotted(input:hover) {
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid black;
  }

  form :slotted(input:checked) {
    background: var(--highlight-color);
  }

  form :slotted(input:checked::after) {
    content: '×';
    color: black;
    position: relative;
    top: -2px;
    left: 3px;
  }

  form :slotted(label) {
    color: var(--color);
    font-family: 'BiodivAR Roman';
    font-variation-settings: "wght" 110, "ital" 0;
    font-size: 14px;
    line-height: 14px;
    margin: 1rem auto 1rem auto;
  }

  form :slotted(a) {
    color: var(--link-color);
    font-size: 14px;
    line-height: 14px;
    cursor: pointer;
    margin: 1rem auto 1rem auto;
  }
</style>