<script setup>
  import { ref, watch } from 'vue';

  const props = defineProps({
      image: String,
      header: String,
      length: Number,
      shouldBeOpen: Boolean,
      couldDelete: Boolean,
      couldUpdateHeader: Boolean,
  })

  const emit = defineEmits(['update', 'delete'])

  const open = ref(props.shouldBeOpen);
  const header = ref(props.header);

  watch(() => props.shouldBeOpen, (newVal) => {
    open.value = newVal;
  });

  watch(() => header.value, (newVal) => {
    emit('update', newVal);
  })
</script>


<template>
<div>
    <div class="title">
        <p class="material-symbols-sharp icon-margin icon-font fill-font transition" :class="{rotate: open}" @click="open = !open">{{ props.image }}</p>
        <input v-if="props.couldUpdateHeader" class="input-element" type="text" v-model="header" placeholder="Entrer nom du média">
        <p v-else class="text" @click="open = !open">{{ props.header }}</p>
        <p v-if="props.couldDelete" class="material-symbols-sharp delete-font" @click="emit('delete')">delete</p>
    </div>
  
  <div data-role="accordeon" class="transition" :style="{'max-height': open ? `${props.length * 450}px` : '0'}">
    <slot></slot>
  </div>
</div>
</template>

<style scoped>
  input {
    border: none;
  }

  [data-role="accordeon"] {
      width: 100%;
      overflow: hidden;
      display: block;
      background-color: var(--accordeon-background);
  }

  .title {
      width: 100%;
      height: 32px;
      display: flex;
      padding-left: 0;
      margin: 1rem 0.8rem 0rem var(--left-margin);
      padding-bottom: 0.9rem;
      cursor: pointer;
  }

  .icon-font {
    font-size: 20px;
  }

  .icon-margin {
    margin: 0px;
    padding-right: 0px;
    margin-top: -3px;
  }

  .fill-font {
    font-variation-settings: "FILL" 0;
  }

  .rotate {
      transform: rotate(90deg);
  }

  .transition {
      transition: all 0.25s ease;
  }

  .text {
    font-size: 16px;
    line-height: 16px;
    margin: 0;
    padding-left: 0.5rem;
    display: flex;
    align-items: center;
    margin-top: -2px;
    letter-spacing: 0.02em;
    font-variation-settings: "wght" 149, "ital" 0;
  }

  .delete-font {
    padding-left: 5px;
    margin: 0px;
    display: flex;
    align-items: center;
    font-size: 17px;
    margin-bottom: 3px;
  }

  .input-element {
    font-size: 14px;
    padding-bottom: 2px;
    padding-left: 0.5rem;
    font-family: "BiodivAR Roman";
    font-variation-settings: "wght" 149, "ital" 0;
    letter-spacing: 0.02em;
  }
</style>