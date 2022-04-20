<script setup>

</script>

<template>
  <div data-role="radio">
    <slot></slot>
  </div>
</template>

<style scoped>
  [data-role="radio"] {
    width: 100%;
    max-width: var(--max-width);
    margin-bottom: 2rem;
    border: solid black 1px;
    margin: 0 auto 1rem auto;
    border-radius: 1rem;
  }

  [data-role="radio"] :slotted(button) {
    width: 49%;
    border-radius: 1rem;
    border: none;
    background: var(--highlight-color);
    color: var(--bg-color);
    font-size: 0.8rem;
    padding: 0.5rem;
    cursor: pointer;
    margin: 0.5%;
  }

  [data-role="radio"] :slotted(.active) {
    background: black;
    color: white;
  }
</style>