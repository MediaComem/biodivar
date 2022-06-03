<script setup>
  import { ref } from 'vue';

  const props = defineProps({
      header: String,
      length: Number,
  })

  const open = ref(false);
</script>


<template>
<div>
    <div class="title" @click="open = !open">
        <div class="image transition" :class="{rotate: open}"/>
        <p class="text">{{ props.header }}</p>
    </div>
  
  <div data-role="accordeon" class="transition" :style="{'max-height': open ? `${props.length * 450}px` : '0'}">
    <slot></slot>
  </div>
</div>
</template>

<style scoped>
  [data-role="accordeon"] {
      width: 100%;
      overflow: hidden;
      display: block;
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
      transition: all 0.25s ease;
  }

  .text {
      font-family: 'BiodivAR Medium';
      font-size: 14px;
      line-height: 14px;
      margin: 0;
      padding-left: 0.5rem;
  }

</style>