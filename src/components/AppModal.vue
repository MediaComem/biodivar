<script setup>

</script>

<template>
  <div data-role="modal">
    <slot></slot>
  </div>
</template>

<style scoped>
  [data-role="modal"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #FFE7BA;
    display: grid;
    place-content: center;
  }
</style>