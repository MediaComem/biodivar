<script setup>

</script>

<template>
  <div data-role="input">
    <slot></slot>
  </div>
</template>

<style scoped>
  .dialog-input-color {
    --color: black;
    --bg-color: none;
    --border-color: #000000;
  }

  [data-role="input"] {
    min-height: 0;
    position: relative;
  }

  [data-role="input"] :slotted(input) {
    font-family: 'BiodivAR Medium';
    font-size: 14px;
    line-height: 14px;
    width: calc(100% - 2rem);
    max-width: var(--max-width);
    padding: 1rem 1rem;
    box-sizing: border-box;
    border: 1px solid var(--border-color);
    border-radius: 3rem;
    background-color: var(--bg-color);
    background-image: var(--icon-link);
    background-position: 1rem 0.7rem;
    background-repeat: no-repeat;
    padding-left: 3rem;
    margin: 0 1rem 1rem 1rem;
    color: var(--color);
  }

  [data-role="input"] :slotted(input::placeholder) {
    color: var(--color);
  }

  [data-role="input"] ::slotted(input::-webkit-autofill) {
    background: var( --bg-color);
  }

  [data-role="input"] :slotted(span) {
    display: block;
    position: absolute;
    right: 35px;
    top: 20%;
  }
</style>