<script setup>
  import { useStore } from '../../composables/store.js';

  import '../aframe/gps-position';
  import '../aframe/faces-north';
  import '../aframe/pitch-roll-look-controls';
  import '../aframe/look-at-roll-yaw';
  import '../aframe/hit-test-marker';
  import '../aframe/visible-from';
  import '../aframe/enter-ar-on-init';
  import { getSymbolUrl } from '../../utils/api.js';

  const { selectedBiovers } = useStore();

  console.log(selectedBiovers.value);

</script>

<template>
  <a-scene
    renderer="colorManagement: true"
    gps-position="minAccuracy: 100; minDistance: 2; cam3DoF: true"
    webxr="requiredFeatures: hit-test,unbounded,dom-overlay; overlayElement: [data-role='hud']; referenceSpaceType: unbounded"
    ar-hit-test="src: assets/ar-hit-test-marker.png"
    hit-test-marker
    vr-mode-ui="enabled: false"
    enter-ar-on-init
  >
    <!-- PRELOAD OR NOT ?<a-assets>
      <a-asset-item id="marker-1" src="assets/marker1.gltf"></a-asset-item>
      <a-asset-item id="marker-2" src="assets/marker2.gltf"></a-asset-item>
    </a-assets> -->

    <a-entity faces-north>
      <template v-for="poi of selectedBiovers.Poi">
        <a-entity
          :gps-position="`latitude: ${poi.coordinate.lat}; longitude: ${poi.coordinate.long}`"
          :visible-from="`distance: ${poi.visible_from}`"
          :gltf-model="`url(${getSymbolUrl(poi.symbol.id)})`"
          :look-at-roll-yaw="`enabled: ${poi.symbol.is_facing_user ? 'true' : 'false'}`"
        ></a-entity>
      </template>
    </a-entity>

    <a-sphere id="origin" radius="0.3" color="green"></a-sphere>

    <a-entity id="camera-rig" position="0 1.6 0">
      <a-entity id="head" camera pitch-roll-look-controls></a-entity>
    </a-entity>

  </a-scene>
</template>

<style scoped>

</style>