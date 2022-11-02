<template>
  <div data-role="notification">
      <slot></slot>
  </div>
</template>

<style scoped>
  [data-role="notification"] {
    width: auto;
    background-color: #E0E0E0;
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 1rem 1rem 1rem 1rem;
  }

  [data-type="success"] {
    color: green;
    font-family: "BiodivAR Roman";
    font-variation-settings: "wght" 110, "ital" 0;
  }

  [data-type="error"] {
    color: red;
    font-family: "BiodivAR Roman";
    font-variation-settings: "wght" 110, "ital" 0;
  }
</style>