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
    'showSymbol',

    'symbol',
    'symbolType',

    'symbolAudio',
    'symbolLoop',

    'scale',
    'positionX',
    'positionY',
    'positionRotation',
    'visible',
    'facing',
    'amplitude',

    'visibilityScope',

    'audioScope',
    'audioScopeEnabled',

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

  const mapSymbolTypeToCateg = new Map([
    ['png', 'image'],
    ['jpg', 'image'],
    ['svg', 'image'],
    ['gltf', 'gltf'],
    ['glb', 'gltf'],
  ]);

  const symbolCategory = computed(() => {
    return mapSymbolTypeToCateg.get(props.symbolType);
  });
</script>

<template>
  <a-scene
    embedded
    renderer="colorManagement: true"
    background="color: black"
  >

    <a-assets>
      <img v-if="symbolCategory === 'image'" id="symbol-image" :src="symbol" crossorigin="anonymous">
    </a-assets>

    <a-entity
      id="origin"
      arrow-helper__x="color: #FF0000; direction: 1 0 0;"
      arrow-helper__y="color: #00FF00; direction: 0 1 0;"
      arrow-helper__z="color: #0000FF; direction: 0 0 1;"
    ></a-entity>

    <a-plane
      wireframe="true"
      rotation="90 0 0"
      height="150"
      width="150"
      segments-height="150"
      segments-width="150"
      color="#444"
    ></a-plane>

    <!-- media slot-->
    <slot></slot>

    <a-entity
      v-if="visibilityScope && showSymbol"
      :ring="`radius: ${visibilityScope}; color: white;`"
      position="0 0.1 0"
    ></a-entity>

    <a-entity
      v-if="audioScopeEnabled && showSymbol"
      :ring="`radius: ${audioScope}; color: blue;`"
      position="0 0.15 0"
    ></a-entity>

    <!-- POI audio -->
    <a-entity
      v-if="symbolAudio && showSymbol"
      :rotation="`0 ${positionRotation} 0`"
    >
      <a-entity
        v-if="symbolLoop"
        :position="`${positionX} ${positionY} 0`"
        :sound="`src: url(${symbolAudio}); autoplay: true; loop: true;`"
      ></a-entity>
      <a-entity
        v-else
        :position="`${positionX} ${positionY} 0`"
        :sound="`src: url(${symbolAudio}); autoplay: true; loop: false;`"
      ></a-entity>
    </a-entity>

    <!-- POI Symbol -->
    <a-entity
      v-if="symbol && showSymbol"
      :rotation="`0 ${positionRotation} 0`"
      :poi-animator="`amplitude: ${amplitude}`"
    >

      <a-entity
        v-if="symbolCategory === 'gltf'"
        id="symbol"
        animation-mixer
        :gltf-model="symbol"
        :scale="`${scale} ${scale} ${scale}`"
        :position="`${positionX} ${positionY} 0`"
        :look-at-roll-yaw="`enabled: ${facing ? 'true' : 'false'}`"
      ></a-entity>

      <a-image
        v-if="symbolCategory === 'image'"
        src="#symbol-image"
        :scale="`${scale} ${scale} ${scale}`"
        :position="`${positionX} ${positionY} 0`"
        :look-at-roll-yaw="`enabled: ${facing ? 'true' : 'false'}`"
        material="transparent:true; opacity: 1; alphaTest: .1;"
      ></a-image>

    </a-entity>

    <a-entity :rotation="`0 ${shapeRotation} 0`" position="0 0.05">
      <a-entity
        v-if="showSymbol"
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
        :position="`${shapeX} ${shapeY} 0`"
      ></a-entity>
    </a-entity>

    <a-entity id="camera-rig">
      <a-entity id="head"  position="0 1.6 5" camera look-controls="pointerLockEnabled: true" wasd-controls camera-reset></a-entity>
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