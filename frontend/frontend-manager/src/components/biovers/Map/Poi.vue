<template>
  <l-circle :lat-lng='[poi.element.coordinate.lat, poi.element.coordinate.long]'
  :radius="poi.element.radius"
  :fill="poi.element.style_fill" :fill-opacity='1'
  color="RGB(0, 231, 200, 0.5)" fill-color="RGB(205, 231, 65, 0.5)">
  </l-circle>
  <l-marker @click="updatePoi"
  :lat-lng='[poi.element.coordinate.lat, poi.element.coordinate.long]'
  :draggable="true" @dragstart="test" @dragend="test" @add="uploadDone">
    <l-tooltip v-if="poi.element.title_is_visible || poi.element.subtitle_is_visible"
    :options="{ permanent: true, direction: 'top'}">
      <p v-if="poi.element.title_is_visible">{{ poi.element.title }}</p>
      <p v-if="poi.element.subtitle_is_visible">{{ poi.element.subtitle }}</p>
    </l-tooltip>
    <l-icon :icon-url="iconUrl" :icon-size="iconSize"/>
  </l-marker>
</template>

<script>
import {
  LCircle,
  LMarker,
  LIcon,
  LTooltip,
} from '@vue-leaflet/vue-leaflet';
import { mapActions, mapGetters } from 'vuex';

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
    LTooltip,
  },
  emits: ['updatePoi'],
  computed: {
    iconUrl() {
      return `${this.icon}/${this.iconWidth}/${this.iconHeight}`;
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
    ...mapGetters('biovers', ['ownOrPublic']),
  },
  methods: {
    updatePoi() {
      if (this.ownOrPublic(this.poi.element.biovers) === 'public' && !this.poi.element.is_editable) {
        return;
      }
      this.$emit('updatePoi', this.poi.element);
    },
    ...mapActions('biovers', ['uploadDone']),
    test() {
      console.log(this.poi);
    },
  },
};
</script>
