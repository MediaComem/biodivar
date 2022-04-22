<script setup>

</script>

<template>
  <div data-role="input">
    <slot></slot>
  </div>
</template>

<style scoped>
  [data-role="input"] :slotted(input) {
    display: block;
    width: calc(100% - 4rem);
    font-size: 1rem;
    border: solid var(--color) 1px;
    border-radius: 1rem;
    padding: 0.3rem;
    margin: 0 auto 1rem auto;
    background: var(--bg-color);
    padding-left: 1rem;
  }

  [data-role="input"] :slotted(input::placeholder) {
    color: var(--color);
  }

  [data-role="input"] ::slotted(input::-webkit-autofill) {
    background: var( --bg-color);
  }
</style>