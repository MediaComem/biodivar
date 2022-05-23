<script setup>
  import { ref } from 'vue';

  const props = defineProps({
      header: String,
  })

  const open = ref(false);
</script>


<template>
<div>
    <div class="title" @click="open = !open">
        <div class="image transition" :class="{rotate: open}"/>
        <p class="text">{{ props.header }}</p>
    </div>
  
  <div data-role="accordeon" class="transition" :style="{display: open ? 'block' : 'none'}">
    <slot></slot>
  </div>
</div>
</template>

<style scoped>
  [data-role="accordeon"] {
      width: 100%;
  }

  .title {
      width: 100%;
      height: 40px;
      display: flex;
      padding-left: 0;
      margin: 1rem 1rem 0rem 1rem;
      padding-bottom: 1rem;
      cursor: pointer;
  }

  .image {
      background-image: var(--icon-link);
      width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      background-position: left center;
      transform: rotate(0deg);
  }

  .rotate {
      transform: rotate(90deg);
  }

  .transition {
      transition: all 0.5s ease;
  }

  .text {
      margin: 0;
      padding-left: 0.5rem;
  }

</style>