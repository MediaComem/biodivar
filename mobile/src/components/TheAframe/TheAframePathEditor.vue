<script setup>

  import { onMounted, defineProps, watch, ref } from '@vue/runtime-core';
  import '../aframe/poi-animator.js';
  import '../aframe/arrow-helper.js';
  import '../aframe/camera-reset.js';


  const props = defineProps([
    'visibilityScope',
    'pathWidth',
    'pathColor',
    'pathOpacity',
    'pathExtrusion',
    'pathElevation',
    'pathAmplitude',
  ]);

  onMounted(() => {
    const icon = document.createElement("p");
    icon.className = 'material-symbols-sharp';
    icon.innerHTML = 'fullscreen';
    const button = document.getElementsByClassName('a-enter-vr-button');
    if (button.length > 0) {
      button[0].appendChild(icon)
    }
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

    <a-entity
      :position="`0 ${pathElevation} 0`"
      :poi-animator="`amplitude: ${pathAmplitude}`"
    >
      <a-box
        position="0 0 0"
        width="7"
        :height="pathExtrusion"
        :depth="pathWidth"
        :material="`
          color: ${pathColor};
          transparent: true;
          opacity: ${pathOpacity/100};
        `"
      ></a-box>
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