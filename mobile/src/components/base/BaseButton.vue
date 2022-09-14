<script setup>

</script>

<template>
  <button data-role="button">
    <slot></slot>
  </button>
</template>

<style scoped>
  [data-role="button"] {
    font-family: 'BiodivAR Bold';
    font-size: 16px;
    line-height: 16px;
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
    align-items: center;
    justify-content: center;
  }

  [data-role="button"] :slotted(img) {
    padding-right: 0.5rem;
  }
</style>