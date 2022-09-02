<template>
  <l-polyline
    v-if="path.element.coordinate"
    :lat-lngs="[path.element.coordinate.map((c) => [c.lat,c.long])]"
    color="green"
    @add="uploadDone"
  ></l-polyline>
</template>

<script>
import {
  LPolyline,
} from '@vue-leaflet/vue-leaflet';
import { mapActions } from 'vuex';

export default {
  components: {
    LPolyline,
  },
  props: {
    path: Object,
  },
  methods: {
    ...mapActions('biovers', ['uploadDone']),
  },
};
</script>
