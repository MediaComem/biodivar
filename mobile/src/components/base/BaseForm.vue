<script setup>

</script>

<template>
  <form>
    <slot></slot>
  </form>
</template>

<style scoped>

  form {
    display: block;
    --bg-color: none;
    --color: black;
    --link-color: white;
    --highlight-color: #009FE3;
    background: var( --bg-color);
    border-radius: 1rem;
    max-width: var(--max-width);
    border: solid black 1px;
    padding: 1.2rem 0 1.2rem 0;
    margin: 0 auto;
  }

  form :slotted(button) {
    width: calc(100% - 4rem);
    border-radius: 1rem;
    border: none;
    background: var(--highlight-color);
    color: var(--link-color);
    font-size: 0.8rem;
    padding: 0.5rem;
    margin: 1rem auto 2rem auto;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  form :slotted(button>img) {
    padding-right: 0.5rem;
  }

  form :slotted(p) {
    color: var(--color);
    font-size: 1rem;
    margin: 1rem auto 1rem auto;
  }

  form :slotted(a) {
    color: var(--link-color);
    font-size: 1rem;
    cursor: pointer;
    margin: 1rem auto 1rem auto;
  }

</style>