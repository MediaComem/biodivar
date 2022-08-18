<template>
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
    <l-icon v-if="poi.element.symbol"
    :icon-url="iconUrl" :icon-size="iconSize"/>
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

import Symbol from '../../../api/symbol';

export default {
  props: {
    poi: Object,
  },
  watch: {
    poi: {
      deep: true,
      handler() {
        this.url = Symbol.getSymbol(this.poi.element.symbol);
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
    };
  },
  computed: {
    iconUrl() {
      return this.url;
    },
    iconSize() {
      return [this.poi.element.symbol.width, this.poi.element.symbol.height];
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
    this.url = Symbol.getSymbol(this.poi.element.symbol);
  },
};
</script>
