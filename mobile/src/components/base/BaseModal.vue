<script setup>

</script>

<template>
  <div id="modal" data-role="modal">
    <slot></slot>
  </div>
</template>

<style scoped>
  [data-role="modal"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    background: #8DC26F;;
    overflow-x: hidden;
  }

  [data-role="modal"] :slotted(.dialog) {
    background-color: black;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
</style>