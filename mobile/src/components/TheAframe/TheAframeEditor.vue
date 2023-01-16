<script setup>
  import '../aframe/poi-radius.js';
  import '../aframe/animation-mixer.js';
  import '../aframe/look-at-roll-yaw.js';
  import '../aframe/ring.js';
  import '../aframe/poi-animator.js';
  import '../aframe/arrow-helper.js';
  import '../aframe/camera-reset.js';

  import { computed, onMounted, watchEffect } from '@vue/runtime-core';

  const props = defineProps([
    'visibilityScope',

    'shapeType',
    'shapeRadius',
    'shapeX',
    'shapeY',
    'shapeRotation',
    'shapeColor',
    'shapeOpacity',
    'shapeStrokeColor',
    'shapeStrokeWidth',
    'shapeStrokeOpacity',
    'shapeWireframe',
    'shapeExtrusion',
    'shapeAmplitude',
  ]);
</script>

<template>
  <a-scene
    embedded
    renderer="colorManagement: true"
    background="color: black"
  >
    <a-entity
      id="origin"
      arrow-helper__x="color: #FF0000; direction: 1 0 0;"
      arrow-helper__y="color: #00FF00; direction: 0 1 0;"
      arrow-helper__z="color: #0000FF; direction: 0 0 1;"
    ></a-entity>

    <a-plane
      wireframe="true"
      :rotation="`90 0 0`"
      height="150"
      width="150"
      segments-height="150"
      segments-width="150"
      color="#444"
    ></a-plane>

    <!-- media slot-->
    <slot></slot>

    <a-entity
      v-if="visibilityScope"
      :ring="`radius: ${visibilityScope}; color: white;`"
      position="0 0.1 0"
    ></a-entity>

    <a-entity :rotation="`0 0 0`" position="0 0.05">
      <a-entity
        :poi-radius="`
          radius: ${shapeRadius};
          shape: ${shapeType};
          color: ${shapeColor};
          opacity: ${shapeOpacity};
          strokeColor: ${shapeStrokeColor};
          strokeWidth: ${shapeStrokeWidth};
          strokeOpacity: ${shapeStrokeOpacity};
          wireframe: ${shapeWireframe};
          extrude: ${shapeExtrusion};
        `"
        :poi-animator="`
          amplitude: ${shapeAmplitude};
          scale: true;
          scaleAll: ${shapeType == 'circle' ? 'false' : 'true'};
        `"
        :position="`0 ${shapeY} 0`"
      ></a-entity>
    </a-entity>

    <a-entity id="camera-rig">
      <a-entity id="head"  position="0 1.7 5" camera look-controls="pointerLockEnabled: true" wasd-controls camera-reset></a-entity>
    </a-entity>

  </a-scene>
</template>

<style>
  .a-enter-ar {
    display: none;
  }
  .a-enter-vr {
    width: 30px;
    background: none !important;
  }
  .a-enter-vr-button {
    width: 30px;
    background: grey;
  }
  .a-enter-vr-button::before {
    content: '⇱⇲';
  }

</style>