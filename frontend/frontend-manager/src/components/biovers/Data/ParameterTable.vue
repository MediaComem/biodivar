<script setup>
import {
  computed,
  onMounted,
  ref,
  defineProps,
} from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  bioverId: Number,
});

const store = useStore();

const getBioversById = computed(() => store.getters['biovers/getBioversById']);
const biovers = ref({});
const title = ref('');
const description = ref('');

onMounted(() => {
  biovers.value = getBioversById.value(props.bioverId);
  title.value = biovers.value.title;
  if (!biovers.value.biover.description) biovers.value.biover.description = '';
  description.value = biovers.value.biover.description;
});
</script>

<template>
  <div class="parameter-layout">
    <div class="input-layout">
      <label class="input-layout-label" for="title">Titre du biovers</label>
      <input class="input-layout-input" type="text" name="title" id="title" v-model="title">
    </div>
    <div class="separator input-layout">
      <label class="input-layout-label" for="title">Description du biovers</label>
      <input class="input-layout-input" type="text" name="title" id="title" v-model="description">
    </div>
    <div class="separator input-layout">
      <label class="input-layout-label" for="title">Emplacement du biovers</label>
      <input class="input-layout-input" type="text" name="title" id="title">
    </div>
  </div>
</template>

<style scoped>
.parameter-layout {
 border-left: 1px solid white;
 border-bottom: 1px solid white;
 border-right: 1px solid white;
 margin-left: 8px;
 margin-right: 8px;
 padding-top: 8px;
 padding-bottom: 8px;
}

.separator {
  margin-top: 15px;
}

.input-layout {
  display: grid;
  padding-left: 8px;
}

.input-layout-label {
  display: flex;
  color: white;
}

.input-layout-input {
  display: flex;
  max-width: 600px;
  height: 30px;
  background-color: black;
  color: white;
  border: 1px solid white;
}
</style>
