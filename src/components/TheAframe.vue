<script setup>
  import './aframe/gps-position';
  import './aframe/faces-north';
  import './aframe/pitch-roll-look-controls';
  import './aframe/look-at-roll-yaw';
  import './aframe/hit-test-marker';
</script>

<template>
  <a-scene
    renderer="colorManagement: true"
    gps-position="minAccuracy: 100; minDistance: 2; cam3DoF: true"
    webxr="requiredFeatures: hit-test,unbounded,dom-overlay; overlayElement: [data-role='hud']; referenceSpaceType: unbounded"
    ar-hit-test
    hit-test-marker
    vr-mode-ui="enabled: false"
  >
    <a-assets>
      <a-asset-item id="marker-1" src="assets/marker1.gltf"></a-asset-item>
      <a-asset-item id="marker-2" src="assets/marker2.gltf"></a-asset-item>
      <a-mixin id="marker" gltf-model="#marker-1" look-at-roll-yaw></a-mixin>
    </a-assets>

    <a-entity faces-north>

      <a-entity
        position="0 1 -3"
        mixin="marker"
      ></a-entity>

      <a-entity
        position="2 1 -5"
        mixin="marker"
      ></a-entity>

      <a-entity
        gps-position="latitude: 46.260020; longitude: 6.149050"
        mixin="marker"
      ></a-entity>

      <a-entity
        gps-position="latitude: 46.780761; longitude: 6.648570"
        mixin="marker"
        scale="10 10 10"
      ></a-entity>

      <a-entity
        gps-position="latitude: 46.55470184333333; longitude: 6.63291133"
        mixin="marker"
      ></a-entity>

    </a-entity>

    <a-sphere id="origin" radius="0.3" color="green"></a-sphere>

    <a-entity id="camera-rig" position="0 1.6 0">
      <a-entity id="head" camera pitch-roll-look-controls></a-entity>
    </a-entity>

  </a-scene>
</template>

<style scoped>

</style>