<script setup>
import {
  ref,
  computed,
  defineProps,
  defineEmits,
  watch,
  onMounted,
} from 'vue';
import {
  LCircle,
  LMarker,
  LIcon,
  LTooltip,
} from '@vue-leaflet/vue-leaflet';
import { useStore } from 'vuex';

import Symbol from '../../../api/symbol';

const props = defineProps({
  poi: Object,
});

const emit = defineEmits(['updatePoi']);

const store = useStore();

const url = ref('');

watch(() => props.poi, () => {
  url.value = Symbol.getSymbol(props.poi.element.symbol);
}, { deep: true });

const iconUrl = computed(() => url.value);
const iconSize = computed(() => [props.poi.element.symbol.width, props.poi.element.symbol.height]);
const ownOrPublic = computed(() => store.getters['biovers/ownOrPublic']);
const bioverIsEditable = computed(() => store.getters['biovers/bioverIsEditable']);

function updatePoi() {
  if ((ownOrPublic.value(props.poi.element.biovers) === 'public' && !bioverIsEditable.value(props.poi.element.biovers)) || props.poi.import) {
    return;
  }
  emit('updatePoi', props.poi.element);
}

function uploadDone() {
  store.dispatch('biovers/uploadDone');
}

onMounted(() => {
  url.value = Symbol.getSymbol(props.poi.element.symbol);
});
</script>

<template>
  <div>
    <l-circle :lat-lng='[poi.element.coordinate.lat, poi.element.coordinate.long]'
      :radius="poi.element.radius"
      :fill="poi.element.style_fill" :fill-opacity='1'
      color="RGB(0, 231, 200, 0.5)" fill-color="RGB(205, 231, 65, 0.5)">
    </l-circle>
    <l-marker @click="updatePoi"
      :lat-lng='[poi.element.coordinate.lat, poi.element.coordinate.long]'
      :draggable="true" @add="uploadDone">
      <l-tooltip v-if="poi.element.title_is_visible || poi.element.subtitle_is_visible"
        :options="{ permanent: true, direction: 'top'}">
        <p v-if="poi.element.title_is_visible">{{ poi.element.title }}</p>
        <p v-if="poi.element.subtitle_is_visible">{{ poi.element.subtitle }}</p>
      </l-tooltip>
      <l-icon v-if="poi.element.symbol && poi.element.symbol.url !== ''"
        :icon-url="iconUrl" :icon-size="iconSize"/>
    </l-marker>
  </div>
</template>
