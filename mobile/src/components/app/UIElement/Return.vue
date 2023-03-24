<script setup>
const props = defineProps({
    link: String,
    text: String,
})
</script>

<template>
  <div class="return">
    <a class="link" :href="props.link"
      ><p class="material-symbols-sharp icon-font icon-margin">arrow_back</p></a
    >
    <p class="text font">{{ props.text }}</p>
  </div>
</template>

<style scoped>
a {
  color: black;
  text-decoration: none;
}

.font {
  font-family: 'BiodivAR Roman';
  font-variation-settings: 'wght' 110, 'ital' 0;
  font-size: 18px;
  line-height: 14px;
  letter-spacing: 0.02em;
}
.icon-font {
  font-size: 20px;
}

.icon-margin {
  margin: 0px;
  padding-right: 6px;
}

.link {
  padding-bottom: 1rem;
}

.return {
  display: flex;
  height: 36px;
  margin-top: 12px;
}

.text {
  margin: 0;
  padding-top: 5px;
}
</style>
