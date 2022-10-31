<script setup>

</script>

<template>
  <div data-role="message">
    <slot></slot>
  </div>
</template>

<style scoped>
  [data-role="message"] {
    font-family: 'BiodivAR Medium';
    font-size: 14px;
    letter-spacing: 0.02em;
    padding: 1rem;
  }
  [data-type="error"] {
    color: red;
  }
</style>