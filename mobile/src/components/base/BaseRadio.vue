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
    display: flex;
  }

  [data-role="radio"] :slotted(button) {
    font-family: 'BiodivAR Medium';
    font-size: 14px;
    line-height: 14px;
    width: 49%;
    border-radius: 1rem;
    border: none;
    background: var(--highlight-color);
    color: var(--bg-color);
    padding: 0.5rem;
    cursor: pointer;
    margin: 0.5%;
  }

  [data-role="radio"] :slotted(.active) {
    font-family: 'BiodivAR Bold';
    font-size: 14px;
    line-height: 14px;
    background: black;
    color: white;
  }
</style>