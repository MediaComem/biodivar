<template>
  <l-polyline
    :lat-lngs="path.coordinate"
    color="green"
  ></l-polyline>
</template>

<script>
import {
  LPolyline,
} from '@vue-leaflet/vue-leaflet';

export default {
  components: {
    LPolyline,
  },
  props: {
    path: Object,
  },
};
</script>
