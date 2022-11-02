<script setup>

</script>

<template>
  <div data-role="message">
    <slot></slot>
  </div>
</template>

<style scoped>
  [data-role="message"] {
    font-family: 'BiodivAR Roman';
    font-variation-settings: "wght" 149, "ital" 0;
    font-size: 14px;
    letter-spacing: 0.02em;
    padding: 1rem;
  }
  [data-type="error"] {
    color: red;
  }
</style>