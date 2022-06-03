<script setup>
  const props = defineProps({
      src: String,
      title: String,
      description: String,
      link: String, 
  });
</script>

<template>
  <div class="container container-width">
    <a :href="props.link">
      <img :src="props.src">
      <h3>{{ props.title }}</h3>
      <p>{{ props.description }}</p>
    </a>
  </div>
</template>

<style scoped>
.container {
  display: block;
  text-align: center;
  min-height: 165px;
  border: solid black 1px;
  border-radius: 1rem;
  cursor: pointer;
}

@media only screen and (min-width: 20px) and (max-width: 320px) {
  .container-width {
    width: calc(100% - 0px);
  }
}

@media only screen and (min-width: 321px) and (max-width: 534px) {
  .container-width {
    width: calc((100% - 10px) / 2);
  }
}

@media only screen and (min-width: 535px) and (max-width: 709px) {
  .container-width {
     width: calc((100% - 20px) / 3);
  }
}

@media only screen and (min-width: 710px) and (max-width: 884px) {
  .container-width {
     width: calc((100% - 30px) / 4);
  }
}

@media only screen and (min-width: 885px) {
  .container-width {
    width: 165px
  }
}

img {
  margin-top: 12.5px;
  height: 80px;
  width: 80px;
}

h3 {
  font-family: 'BiodivAR Round Medium';
  font-size: 16px;
  line-height: 16px;
  margin: 0;
  max-width: 125px;
  margin-left: calc((100% - 125px) / 2);
  margin-top: 4px;
}

p {
  font-family: 'BiodivAR Round Medium';
  font-size: 8px;
  line-height: 8px;
  color: #666666;
  margin: 0;
  max-width: 125px;
  margin-left: calc((100% - 125px) / 2);
  margin-top: 2px
}

a {
  color: black;
  text-decoration: none;
}
</style>