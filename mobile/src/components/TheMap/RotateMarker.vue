<script setup>
  import { onMounted, onUnmounted } from "@vue/runtime-core";

  import { mapStore } from '../../composables/map';

  import { RotatedMarker } from './index.js';

  let { map } = mapStore();

  let rotation = 90;
  let marker = null;

  onMounted(() => {
    marker = L.rotatedMarker(map.value.getCenter(), {
        rotationAngle: rotation,
        
        draggable: true,
    }).addTo(map.value);

    setInterval(() => {
        if (marker) {
           rotation += 1;
            marker.remove();
            marker = L.rotatedMarker(map.value.getCenter(), {
            rotationAngle: rotation,
            rotationOrigin: 'bottom center',
            draggable: false,
             }).addTo(map.value); 
        } 
    }, 100);
  })

  onUnmounted(() => {
      marker.remove();
      marker = null;
  })

</script>

