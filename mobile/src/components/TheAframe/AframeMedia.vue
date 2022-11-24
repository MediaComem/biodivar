<script setup>
  import { computed, watchEffect } from '@vue/runtime-core';
  import '../aframe/look-at-roll-yaw.js';

  const props = defineProps([
    'showMedia',
    'media',
    'mediaType',
    'mediaLoop',
    'scale',
    'positionX',
    'positionY',
    'positionRotation',
    'facing',
    'isVisibleInRadius',
    'text',
  ]);

  const mapMediaTypeToCateg = new Map([
    ['png', 'image'],
    ['jpg', 'image'],
    ['svg', 'image'],
    // ['jpeg', 'image'], todo ?
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
  <a-entity v-if="showMedia">

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
        :look-at-roll-yaw="`enabled: ${facing ? 'true' : 'false'}`"
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
        :look-at-roll-yaw="`enabled: ${facing ? 'true' : 'false'}`"
        material="transparent:true; opacity: 1; alphaTest: .1;"
      ></a-image>
    </a-entity>

    <!-- AUDIO -->
    <a-entity
      v-if="mediaCategory === 'audio'"
      :rotation="`0 ${positionRotation} 0`"
    >
      <a-entity
        v-if="mediaLoop"
        :position="`${positionX} ${positionY} 0`"
        :sound="`src: url(${media}); autoplay: true; loop: true; volume: ${scale}`"
      ></a-entity>
      <a-entity
        v-else
        :position="`${positionX} ${positionY} 0`"
        :sound="`src: url(${media}); autoplay: true; loop: false; volume: ${scale}`"
      ></a-entity>
      <!-- audio marker -->
      <a-image
        src="assets/note.png"
        scale="0.5 0.5 0.5"
        :position="`${positionX} ${positionY} 0`"
        material="transparent:true; opacity: 1; alphaTest: 0.1;"
        look-at-roll-yaw
      ></a-image>
    </a-entity>

    <a-entity
      v-if="text"
      :rotation="`0 ${positionRotation} 0`"
    >
      <a-text
        :scale="`${scale} ${scale} ${scale}`"
        :position="`${positionX} ${positionY} 0`"
        :look-at-roll-yaw="`enabled: ${facing ? 'true' : 'false'}`"
        align="center"
        :value="text"
        font="assets/biodivar-sans-Book-msdf.json"
        font-image="assets/biodivar-sans-Book-msdf.png"
        negate="false"
        material="transparent:true; opacity: 1; alphaTest: 0.1;"
        side="double"
      ></a-text>
    </a-entity>
  </a-entity>

</template>

<style scoped>

</style>