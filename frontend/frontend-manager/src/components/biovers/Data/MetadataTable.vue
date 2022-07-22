<script setup>
import {
  ref,
  computed,
  onMounted,
  defineProps,
} from 'vue';
import { useStore } from 'vuex';

import format from '../../../utils/formatter';

const props = defineProps({
  bioverId: Number,
});

const getData = ref([]);

const store = useStore();
const getEventByBiovers = computed(() => store.getters['biovers/getEventByBiovers']);
const getTraceByBiovers = computed(() => store.getters['biovers/getTraceByBiovers']);

function creationDate(date) {
  return format.dateFormatter(date);
}

onMounted(() => {
  const events = getEventByBiovers.value(props.bioverId);
  const traces = getTraceByBiovers.value(props.bioverId);

  if (events && traces) getData.value = events.concat(traces);
  if (events && !traces) getData.value = events;
  if (!events && traces) getData.value = events;
});
</script>

<template>
<div></div>
</template>

<style scoped>
@import './table.css';
</style>
