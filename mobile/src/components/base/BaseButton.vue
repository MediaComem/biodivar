<script setup>

</script>

<template>
  <button data-role="button">
    <slot></slot>
  </button>
</template>

<style scoped>
  [data-role="button"] {
    font-family: 'BiodivAR Roman';
    font-size: 16px;
    line-height: 16px;
    font-variation-settings: "wght" 149, "ital" 0;
    width: calc(100% - 2rem);
    border-radius: 1rem;
    border: none;
    background: var(--highlight-color);
    color: var(--link-color);
    padding: 0.5rem;
    margin: 1rem auto 1rem auto;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: end;
    justify-content: center;
    height: var(--height);
    letter-spacing: 0.02em;
  }

  [data-role="button"] :slotted(img) {
    padding-right: 0.5rem;
  }
</style>