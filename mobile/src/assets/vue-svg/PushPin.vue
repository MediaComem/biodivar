<script setup>
  const props = defineProps({
      color: String,
  }) 
</script>


<template>
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.66659 5V1.66666H8.99992V0.333328H0.999919V1.66666H2.33325V5C2.33325 6.10666 1.43992 7 0.333252 7V8.33333H4.31325V13L4.97992 13.6667L5.64659 13V8.33333H9.66659V7C8.55992 7 7.66659 6.10666 7.66659 5Z" :fill="props.color"/>
    </svg>
</template>



