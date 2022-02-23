<template>
  <l-circle :lat-lng='poi.coordinate' :radius='poi.element.radius'
  :fill="poi.element.style_fill" :fill-opacity='1'
  color="RGB(0, 231, 200, 0.5)" fill-color="RGB(205, 231, 65, 0.5)">
  </l-circle>
  <l-marker @click="$emit('updatePoi', this.poi)" :lat-lng='poi.coordinate'>
    <l-icon :icon-url="iconUrl" :icon-size="iconSize" />
  </l-marker>
</template>

<script>
import {
  LCircle,
  LMarker,
  LIcon,
} from '@vue-leaflet/vue-leaflet';

export default {
  props: {
    icon: String,
    iconWidth: Number,
    iconHeight: Number,
    poi: Object,
  },
  components: {
    LCircle,
    LMarker,
    LIcon,
  },
  emits: ['updatePoi'],
  computed: {
    iconUrl() {
      return `${this.icon}/${this.iconWidth}/${this.iconHeight}`;
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
  },
};
</script>
