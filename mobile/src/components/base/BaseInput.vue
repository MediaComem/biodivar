<script setup>

</script>

<template>
  <div data-role="input">
    <slot></slot>
  </div>
</template>

<style scoped>
  [data-role="input"] {
    min-height: 0;
  }

  [data-role="input"] :slotted(input) {
    width: calc(100% - 2rem);
    max-width: var(--max-width);
    padding: 1rem 1rem;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 3rem;
    font-size: 16px;
    background-color: var(--bg-color);
    background-image: var(--icon-link);
    background-position: 1rem 0.9rem;
    background-repeat: no-repeat;
    padding-left: 3rem;
    margin: 0 1rem 1rem 1rem;
  }

  [data-role="input"] :slotted(input::placeholder) {
    color: var(--color);
  }

  [data-role="input"] ::slotted(input::-webkit-autofill) {
    background: var( --bg-color);
  }
</style>