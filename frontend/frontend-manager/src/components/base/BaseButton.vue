<script setup></script>

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
    width: auto;
    border-radius: 1rem;
    border: none;
    background: var(--highlight-color);
    margin: 1rem 1rem 1rem 1rem;
    color: var(--link-color);
    padding: 0.5rem;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-right: 1rem;
  }

  [data-role="button"] :slotted(img) {
    padding-right: 0.5rem;
  }
</style>
