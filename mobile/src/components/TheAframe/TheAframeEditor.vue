<script setup>
  import '../aframe/poi-radius.js';
  import '../aframe/animation-mixer.js';
  import '../aframe/look-at-roll-yaw.js';
  import '../aframe/ring.js';
  import '../aframe/poi-animator.js';
  import '../aframe/arrow-helper.js';
  import '../aframe/camera-reset.js';
  import '../aframe/grid-helper.js';
  import '../aframe/emit-when-near';

  import { onMounted } from '@vue/runtime-core';
  import { previewMode, isInRadius, isInVisibility } from '../../store/aframe-store.js';

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

  onMounted(() => {
    const icon = document.createElement("p");
    icon.className = 'material-symbols-sharp';
    icon.innerHTML = 'fullscreen';
    const button = document.getElementsByClassName('a-enter-vr-button');
    if (button.length > 0) {
      button[0].appendChild(icon)
    }
    // detecting change in preview mode
    const sceneEl = document.querySelector('a-scene');
    sceneEl.addEventListener('enter-vr', () => {
      previewMode.value = true;
    });
    sceneEl.addEventListener('exit-vr', () => {
      previewMode.value = false;
    });

    window.addEventListener('radius-enter', () => isInRadius.value = true);
    window.addEventListener('radius-exit', () => isInRadius.value = false);
    window.addEventListener('visibility-enter', () => isInVisibility.value = true);
    window.addEventListener('visibility-exit', () => isInVisibility.value = false);
  })
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
      :visible="!previewMode"
    ></a-entity>

    <a-entity
      grid-helper="color: #111;"
      :visible="!previewMode"
    ></a-entity>

    <a-plane
      rotation="-90 0 0"
      height="128"
      width="128"
      color="#567D46"
      :visible="previewMode"
    ></a-plane>

    <!-- media slot-->
    <slot></slot>

    <a-entity
      v-if="visibilityScope"
      :ring="`radius: ${visibilityScope}; color: red;`"
      position="0 0.1 0"
      :visible="!previewMode"
      :emit-when-near="`
          distance: ${visibilityScope};
          event: visibility-enter;
          eventFar: visibility-exit;
          poiId: 0;
        `"
    ></a-entity>

    <a-entity rotation="0 0 0" position="0 0.05 0">
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
        :emit-when-near="`
          distance: ${shapeRadius};
          event: radius-enter;
          eventFar: radius-exit;
          poiId: 0;
        `"
        :poi-animator="`
          amplitude: ${shapeAmplitude};
          scale: true;
          scaleAll: ${shapeType == 'circle' ? 'false' : 'true'};
        `"
        :position="`0 ${shapeY} 0`"
        :visible="isInVisibility || !previewMode"
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
    background-color: #2F80ED;
    background-image: url('assets/fullscreen-white.svg');
    height: 38px;
    width: 38px;
    border-radius: 19px;
    min-width: 38px
  }

  .a-enter-vr-button:hover {
    opacity: 0.8;
    background-color: #2F80ED;
  }

  .a-enter-vr-button::before {
    content: '';
  }
</style>