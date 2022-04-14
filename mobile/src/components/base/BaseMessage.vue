<script setup>

</script>

<template>
  <div data-role="message">
    <slot></slot>
  </div>
</template>

<style scoped>
  [data-role="message"] {
    padding: 1rem;
  }
  [data-type="error"] {
    color: red;
  }
</style>