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
    min-height: 100%;
    background: rgb(147,191,112);
    background: linear-gradient(90deg, rgba(147,191,112,1) 41%, rgba(61,136,69,1) 100%);
    padding: 2rem;
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