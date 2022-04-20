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
  }

  form :slotted(input) {
    border: solid lightblue 1px;
    height: 1rem;
    width: 1rem;
  }

  form :slotted(label) {
    color: var(--color);
    font-size: 1rem;
    margin: 1rem auto 1rem auto;
  }

  form :slotted(a) {
    color: var(--link-color);
    font-size: 1rem;
    cursor: pointer;
    margin: 1rem auto 1rem auto;
  }
</style>