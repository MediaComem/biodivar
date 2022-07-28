<script setup>
  import { useStore } from '../../composables/store.js';

  import '../aframe/gps-position';
  import '../aframe/faces-north';
  import '../aframe/pitch-roll-look-controls';
  import '../aframe/look-at-roll-yaw';
  import '../aframe/hit-test-marker';
  import '../aframe/visible-from';
  import '../aframe/enter-ar-on-init';
  import '../aframe/poi-radius';
  import '../aframe/emit-when-near';

  import { getSymbolUrl, getMediaUrl } from '../../utils/api.js';

  const { selectedBiovers } = useStore();

  console.log(selectedBiovers.value);

</script>

<template>
  <a-scene
    renderer="colorManagement: true"
    gps-position="minAccuracy: 100; minDistance: 2; cam3DoF: true"
    webxr="requiredFeatures: hit-test,local-floor,dom-overlay; overlayElement: [data-role='hud']; referenceSpaceType: local-floor"
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
          position="0 0 -5"
          :gps-position="`latitude: ${poi.coordinate.lat}; longitude: ${poi.coordinate.long}`"
          :visible-from="`distance: ${poi.visible_from}`"
          :poi-radius="`
            radius: ${poi.radius};
            shape: ${poi.style_type};
            fill: ${poi.style_fill};
            visible: ${poi.style_is_visible};
            groundElevation: ${poi.style_elevation_ground};
          `"
          animation="property: position.z; dur: 4000; to: -2; easing: linear"
        >

          <a-entity
            :look-at-roll-yaw="`enabled: ${poi.symbol.is_facing_user ? 'true' : 'false'}`"
            :gltf-model="`url(${getSymbolUrl(poi.symbol.id)})`"
            :position="`0 ${poi.symbol.elevation_ground} 0`"
            :visible="`${poi.symbol.is_visible ? 'true' : 'false'}`"
          ></a-entity>

          <!-- todo handle other media -->
          <template v-for="media of poi.media">
            <a-entity
              :sound="`src: url(${getMediaUrl(media)}); on: click;`"
              :emit-when-near="`distance: ${poi.radius};`"
              :position="`0 ${poi.symbol.elevation_ground} 0`"
            ></a-entity>
          </template>

        </a-entity>
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