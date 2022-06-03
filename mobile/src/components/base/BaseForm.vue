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

  form :slotted(p) {
    font-family: 'BiodivAR Medium';
    font-size: 14px;
    line-height: 14px;
    color: var(--color);
    margin: 1rem auto 1rem auto;
  }

  form :slotted(a) {
    font-family: 'BiodivAR Medium';
    font-size: 14px;
    line-height: 14px;
    color: var(--link-color);
    cursor: pointer;
    margin: 1rem auto 1rem auto;
  }

</style>