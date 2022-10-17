<template>
  <l-circle
    ref="circle"
    :lat-lng='[poi.element.coordinate.lat, poi.element.coordinate.long]'
    :radius="poi.element.radius - poi.element.style_stroke_width / 2"
    :weight="getWeight * 2"
    :color="poi.element.stroke_color"
    :opacity="poi.element.stroke_opacity / 100"
    :fill="true" 
    :fill-color="poi.element.fill_color"
    :fill-opacity='poi.element.fill_opacity / 100'
   >
  </l-circle>
  <l-marker 
    @click="updatePoi"
    :lat-lng='[poi.element.coordinate.lat, poi.element.coordinate.long]'
    :draggable="true" @add="uploadDone"
  >
    <l-tooltip 
      :options="{ permanent: false, direction: 'top'}">
      <p v-if="poi.element.title_is_visible">{{ poi.element.title }}</p>
      <p v-if="poi.element.subtitle_is_visible">{{ poi.element.subtitle }}</p>
    </l-tooltip>
    <l-icon 
      v-if="poi.element.symbol"
      :icon-url="iconUrl" 
    />
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

import { getIcon } from '../../../../utils/api.js';

export default {
  props: {
    poi: Object,
    meter: Number,
  },
  watch: {
    poi: {
      deep: true,
      handler() {
        this.url = getIcon(this.poi.element.symbol);
      },
    },
  },
  components: {
    LCircle,
    LMarker,
    LIcon,
    LTooltip,
  },
  emits: ['updatePoi'],
  data() {
    return {
      url: '',
      shouldDisplayTooltip: false,
    };
  },
  computed: {
    iconUrl() {
      return this.url;
    },
    iconSize() {
      return [this.poi.element.symbol.width, this.poi.element.symbol.height];
    },
    getWeight() {
      return this.poi.element.style_stroke_width / this.meter;
    },
    ...mapGetters('biovers', ['ownOrPublic', 'bioverIsEditable']),
  },
  methods: {
    updatePoi() {
      if ((this.ownOrPublic(this.poi.element.biovers) === 'public' && !this.bioverIsEditable(this.poi.element.biovers)) || this.poi.import) {
        return;
      }
      this.$emit('updatePoi', this.poi.element);
    },
    ...mapActions('biovers', ['uploadDone']),
  },
  mounted() {
    this.url = getIcon(this.poi.element.symbol);
  },
};
</script>
