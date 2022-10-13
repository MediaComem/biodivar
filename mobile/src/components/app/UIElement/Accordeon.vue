<script setup>
  import { ref } from 'vue';

  const props = defineProps({
      header: String,
      length: Number,
      shouldBeOpen: Boolean,
      couldDelete: Boolean,
  })

  const emit = defineEmits(['delete'])

  const open = ref(props.shouldBeOpen);
</script>


<template>
<div>
    <div class="title">
        <div class="image transition" :class="{rotate: open}" @click="open = !open"/>
        <p class="text" @click="open = !open">{{ props.header }}</p>
        <p v-if="props.couldDelete" class="material-symbols-sharp delete-font" @click="emit('delete')">delete</p>
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
      display: flex;
      align-items: center;
  }

    .delete-font {
        padding-left: 5px;
        margin: 0px;
        display: flex;
        align-items: center;
        font-size: 17px;
    }

</style>