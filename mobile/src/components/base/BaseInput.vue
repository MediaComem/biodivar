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
    font-family: 'BiodivAR Roman';
    font-size: 14px;
    line-height: 14px;
    font-variation-settings: "wght" 110, "ital" 0;
    width: calc(100% - 2rem);
    max-width: var(--max-width);
    padding: 1rem 1rem;
    box-sizing: border-box;
    border: 1px solid var(--border-color);
    background-color: var(--bg-color);
    padding-left: 2.3rem;
    margin: 0 1rem 1rem 1rem;
    color: var(--color);
    letter-spacing: 0.02em;
    padding-top: 6px;
    padding-bottom: 6px;
  }

  [data-role="input"] :slotted(input::placeholder) {
    color: var(--color);
    opacity:  1;
  }

  [data-role="input"] ::slotted(input::-webkit-autofill) {
    background: var( --bg-color);
  }

  [data-role="input"] :slotted(span) {
    display: block;
    position: absolute;
    right: 25px;
    top: 10%;
  }
</style>