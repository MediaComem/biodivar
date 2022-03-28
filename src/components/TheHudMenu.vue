<script setup>
  import { ref } from "@vue/reactivity";
  import { watch } from "@vue/runtime-core";

  const count= ref(0);
  watch(count, (val, oldVal) => {
    console.log(`${oldVal} => ${val}`);
  });

</script>

<template>
  <svg
    @click="count++"
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 40 40"
    style="enable-background:new 0 0 40 40;"
    xml:space="preserve"
  >
    <g>
      <path d="M20,0C9,0,0,9,0,20s9,20,20,20s20-9,20-20S31,0,20,0z M30,30H10c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2 C32,29.1,31.1,30,30,30z M30,22H10c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2C32,21.1,31.1,22,30,22z M30,14H10 c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2C32,13.1,31.1,14,30,14z">
      </path>
    </g>
  </svg>
</template>

<style>

</style>