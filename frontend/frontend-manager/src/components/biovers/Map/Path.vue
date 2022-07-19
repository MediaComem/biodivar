<script setup>
import { defineProps } from 'vue';
import {
  LPolyline,
} from '@vue-leaflet/vue-leaflet';
import { useStore } from 'vuex';

const props = defineProps({
  path: Object,
});

const store = useStore();

function uploadDone() {
  store.dispatch('biovers/uploadDone');
}
</script>

<template>
  <l-polyline
    v-if="props.path.element.coordinate"
    :lat-lngs="[props.path.element.coordinate.map((c) => [c.lat,c.long])]"
    color="green"
    @add="uploadDone"
  ></l-polyline>
</template>
