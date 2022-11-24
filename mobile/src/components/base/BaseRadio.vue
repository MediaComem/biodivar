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
    height: 40px;
    max-width: var(--max-width);
    margin-bottom: 2rem;
    border: solid var(--border-color) 1px;
    margin: 0 auto 1rem auto;
    border-radius: 20px;
    display: flex;
  }

  [data-role="radio"] :slotted(button) {
    font-family: 'BiodivAR Roman';
    font-size: 14px;
    line-height: 14px;
    font-variation-settings: "wght" 110, "ital" 0;
    width: 50%;
    height: 34px;
    border-radius: 17px;
    border: none;
    background: var(--highlight-color);
    color: var(--bg-color);
    padding: 8px;
    cursor: pointer;
    margin: 2px;
    letter-spacing: 0.02em;
  }

  [data-role="radio"] :slotted(.active) {
    font-family: 'BiodivAR Roman';
    font-size: 14px;
    line-height: 14px;
    font-variation-settings: "wght" 149, "ital" 0;
    background: var(--active-bg-color);
    color: var(--active-color);
    letter-spacing: 0.02em;
  }
</style>