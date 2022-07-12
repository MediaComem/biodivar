<script setup>
  import { onMounted } from "@vue/runtime-core";

  import { mapStore } from '../../composables/map';

  let { map } = mapStore();

  const props = defineProps({
      coordinate: Object,
  });

  onMounted(() => {
      const latlngs = [];
      props.coordinate.forEach(element => {
          latlngs.push([element.lat, element.long]);
      });
      L.polyline(latlngs, {color: 'red'}).addTo(map.value);
  })
</script>