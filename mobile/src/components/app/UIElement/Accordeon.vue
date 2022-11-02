<script setup>
  import { ref, watch } from 'vue';

  const props = defineProps({
      image: String,
      header: String,
      length: Number,
      shouldBeOpen: Boolean,
      couldDelete: Boolean,
  })

  const emit = defineEmits(['delete'])

  const open = ref(props.shouldBeOpen);

  watch(() => props.shouldBeOpen, (newVal) => {
    open.value = newVal;
  });
</script>


<template>
<div>
    <div class="title">
        <p class="material-symbols-sharp icon-margin icon-font fill-font transition" :class="{rotate: open}" @click="open = !open">{{ props.image }}</p>
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
      height: 32px;
      display: flex;
      padding-left: 0;
      margin: 1rem 1rem 0rem 1rem;
      padding-bottom: 0.9rem;
      cursor: pointer;
  }

  .icon-font {
    font-size: 20px;
  }

  .icon-margin {
    margin: 0px;
    padding-right: 0px;
    margin-top: -4px;
  }

  .fill-font {
    font-variation-settings: "FILL" 1;
  }

  .rotate {
      transform: rotate(90deg);
  }

  .transition {
      transition: all 0.25s ease;
  }

  .text {
      font-size: 14px;
      line-height: 14px;
      margin: 0;
      padding-left: 0.5rem;
      display: flex;
      align-items: center;
      margin-top: -4px;
      letter-spacing: 0.02em;
  }

    .delete-font {
        padding-left: 5px;
        margin: 0px;
        display: flex;
        align-items: center;
        font-size: 17px;
    }

</style>