<script setup>
  import { computed, watchEffect } from '@vue/runtime-core';
  import '../aframe/look-at-roll-yaw.js';
  import '../aframe/poi-animator.js';
  import '../aframe/distance-to-volume';
  import { previewMode, isInRadius, isInVisibility } from '../../store/aframe-store.js';

  const props = defineProps([
    'media',
    'mediaType',
    'mediaLoop',
    'scale',
    'positionX',
    'positionY',
    'positionRotation',
    'positionOrientation',
    'facing',
    'isVisibleInRadius',
    'isVisibleOutRadius',
    'autoplay',
    'text',
    'amplitude',
    'poiScope',
  ]);

  const mapMediaTypeToCateg = new Map([
    ['png', 'image'],
    ['jpg', 'image'],
    ['svg', 'image'],
    // ['gif', 'image'], todo ?

    ['mp3', 'audio'],
    ['m4a', 'audio'],
    ['wav', 'audio'],

    ['gltf', 'gltf'],
    ['glb', 'gltf'],
  ]);

  const mediaCategory = computed(() => {
    return mapMediaTypeToCateg.get(props.mediaType);
  });

  const uid = Math.round(Math.random()*100000);
</script>

<template>
  <a-assets>
    <img v-if="mediaCategory === 'image'" :id="`the-image-${uid}`" :src="media" crossorigin="anonymous">
  </a-assets>
  <a-entity v-if="(previewMode && isInVisibility) || !previewMode">

    <!-- GLTF -->
    <a-entity
      v-if="mediaCategory === 'gltf'"
      :rotation="`0 ${positionRotation} 0`"
    >
      <a-entity
        :gltf-model="media"
        animation-mixer
        :scale="`${scale} ${scale} ${scale}`"
        :position="`${positionX} ${positionY} 0`"
        :rotation="`0 ${positionOrientation} 0`"
        :look-at-roll-yaw="`enabled: ${facing ? 'true' : 'false'}`"
        :poi-animator="`amplitude: ${amplitude}`"
        :visible="(isVisibleInRadius && previewMode && isInRadius) || (isVisibleOutRadius && previewMode && !isInRadius) || !previewMode"
      ></a-entity>
    </a-entity>

    <!-- IMAGE -->
    <a-entity
      v-if="mediaCategory === 'image'"
      :rotation="`0 ${positionRotation} 0`"
    >
      <a-image
        :src="`#the-image-${uid}`"
        :scale="`${scale} ${scale} ${scale}`"
        :position="`${positionX} ${positionY} 0`"
        :rotation="`0 ${positionOrientation} 0`"
        :look-at-roll-yaw="`enabled: ${facing ? 'true' : 'false'}`"
        material="transparent:true; opacity: 1; alphaTest: .1;"
        :poi-animator="`amplitude: ${amplitude}`"
        :visible="(isVisibleInRadius && previewMode && isInRadius) || (isVisibleOutRadius && previewMode && !isInRadius) || !previewMode"
      ></a-image>
    </a-entity>

    <!-- AUDIO -->
    <a-entity
      :rotation="`0 ${positionRotation} 0`"
      v-if="mediaCategory === 'audio' && ((isVisibleInRadius && previewMode && isInRadius) || (isVisibleOutRadius && previewMode && !isInRadius) || !previewMode)"
    >
      <a-entity
        :position="`${positionX} ${positionY} 0`"
        :sound="`
          src: url(${media});
          autoplay: true;
          loop: ${mediaLoop ? 'true' : 'false'};
          volume: ${scale};
          positional: false;
        `"
        :distance-to-volume="autoplay ? `
          volume: ${scale};
          distance: ${poiScope};
        `: null"
      ></a-entity>
      <!-- audio marker -->
      <a-image
        src="assets/note.png"
        :position="`${positionX} ${positionY} 0`"
        material="transparent:true; opacity: 1; alphaTest: 0.1;"
        look-at-roll-yaw
        :scale="`${scale/2} ${scale/2} ${scale/2}`"
        :visible="!previewMode"
      ></a-image>
    </a-entity>

    <!-- TEXTE -->
    <a-entity
      v-if="text"
      :rotation="`0 ${positionRotation} 0`"
    >
      <a-text
        :scale="`${scale} ${scale} ${scale}`"
        :position="`${positionX} ${positionY} 0`"
        :rotation="`0 ${positionOrientation} 0`"
        :look-at-roll-yaw="`enabled: ${facing ? 'true' : 'false'}`"
        align="center"
        :value="text"
        font="assets/biodivar-sans-Book-msdf.json"
        font-image="assets/biodivar-sans-Book-msdf.png"
        negate="false"
        material="transparent:true; opacity: 1; alphaTest: 0.1;"
        side="double"
        :poi-animator="`amplitude: ${amplitude}`"
        :visible="(isVisibleInRadius && previewMode && isInRadius) || (isVisibleOutRadius && previewMode && !isInRadius) || !previewMode"
      ></a-text>
    </a-entity>
  </a-entity>

</template>

<style scoped>

</style>