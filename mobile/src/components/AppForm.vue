<script setup>

</script>

<template>
  <fieldset>
    <slot></slot>
  </fieldset>
</template>

<style scoped>

  fieldset {
    --bg-color: white;
    --color: #999;
    --color-sec: #ccc;
    --highlight-color: #009FE3;
    background: var(--bg-color);
    border-radius: 1rem;
    max-width: var(--max-width);
    border: none;
    padding: 0;
    margin: 0 auto;
  }

  fieldset :slotted(header) {
    color: var(--color);
    font-size: 1.1rem;
    display: block;
    text-align: center;
    text-transform: uppercase;
    border-bottom: solid 1px var(--color-sec);
    padding: 0.8rem;
    margin: 0 0 1.3rem 0;
  }

  fieldset :slotted(input) {
    display: block;
    width: calc(100% - 4rem);
    font-size: 1rem;
    border: solid var(--color) 1px;
    padding: 0.3rem;
    margin: 0 auto 1rem auto;
  }

  fieldset :slotted(input::placeholder) {
    color: var(--color-sec);
  }

  fieldset :slotted(button) {
    width: calc(100% - 4rem);
    border-radius: 1rem;
    border: none;
    background: var(--highlight-color);
    color: var(--bg-color);
    font-size: 0.8rem;
    padding: 0.5rem;
    margin: 1rem auto 2rem auto;
    text-transform: uppercase;
    cursor: pointer;
  }

</style>