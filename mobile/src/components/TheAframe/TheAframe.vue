<script setup>
  import { useStore } from '../../composables/store.js';

  import '../aframe/gps-position';
  import '../aframe/faces-north';
  import '../aframe/pitch-roll-look-controls';
  import '../aframe/look-at-roll-yaw';
  import '../aframe/hit-test-marker';
  import '../aframe/visible-from';
  import '../aframe/invisible-from';
  import '../aframe/enter-ar-on-init';
  import '../aframe/poi-radius';
  import '../aframe/emit-when-near';
  import '../aframe/animation-mixer';
  import '../aframe/sound-play-stop';
  import '../aframe/listen-to';
  import '../aframe/event-set';

  import { getSymbolUrl, getSymbolAudiUrl, getMediaUrl } from '../../utils/api.js';

  const { selectedBiovers } = useStore();

  function isImage(str) {
    return str === 'png' ||  str === 'jpg' ||  str === 'svg';
  }

  function isGltf(str) {
    return str === 'gltf' ||  str === 'glb';
  }

  function isAudio(str) {
    return str === 'mp3' ||  str === 'wav' ||  str === 'm4a';
  }

  console.log(selectedBiovers.value);

</script>

<template>
  <a-scene
    renderer="colorManagement: true"
    gps-position="minAccuracy: 100; minDistance: 2; cam3DoF: true"
    webxr="requiredFeatures: hit-test,local-floor,dom-overlay; overlayElement: [data-role='hud']; referenceSpaceType: local-floor"
    aar-hit-test="src: assets/ar-hit-test-marker.png"
    ahit-test-marker
    vr-mode-ui="enabled: false"
    enter-ar-on-init
  >

    <a-assets>
      <template v-for="poi of selectedBiovers.Poi">
        <img
          v-if="isImage(poi.symbol.media_type_ar)"
          :id="`the-symbol-image-${poi.symbol.id}`"
          :src="getSymbolUrl(poi.symbol.id)"
        >
      </template>
    </a-assets>

    <a-entity faces-north>
      <template v-for="poi of selectedBiovers.Poi">
        <a-entity
          position="0 0 10000"
          :gps-position="`latitude: ${poi.coordinate.lat}; longitude: ${poi.coordinate.long}`"
          :visible-from="`distance: ${poi.scope}`"
        >

          <!-- POI Symbol -->
          <a-entity
            v-if="poi.symbol.media_type_ar"
            :rotation="`0 ${poi.symbol.position.rotation} 0`"
            :poi-animator="`amplitude: ${poi.symbol.amplitude}`"
            :listen-to__enter="`target: #poi-radius-${poi.id}; event: radius-enter; emit: radius-enter`"
            :listen-to__exit="`target: #poi-radius-${poi.id}; event: radius-exit; emit: radius-exit`"
            event-set__enter="event: radius-enter; attribute: visible; value: false"
            event-set__exit="event: radius-exit; attribute: visible; value: true"
          >
            <!-- gltf or glb symbol -->
            <a-entity
              v-if="isGltf(poi.symbol.media_type_ar)"
              animation-mixer
              :gltf-model="`url(${getSymbolUrl(poi.symbol.id)})`"
              :scale="`${poi.symbol.scale} ${poi.symbol.scale} ${poi.symbol.scale}`"
              :position="`${poi.symbol.position.distance} ${poi.symbol.position.elevation} 0`"
              :look-at-roll-yaw="`enabled: ${poi.symbol.is_facing_user ? 'true' : 'false'}`"
            ></a-entity>
            <!-- image symbol -->
            <a-image
              v-if="isImage(poi.symbol.media_type_ar)"
              :src="`#the-symbol-image-${poi.symbol.id}`"
              :scale="`${poi.symbol.scale} ${poi.symbol.scale} ${poi.symbol.scale}`"
              :position="`${poi.symbol.position.distance} ${poi.symbol.position.elevation} 0`"
              :look-at-roll-yaw="`enabled: ${poi.symbol.is_facing_user ? 'true' : 'false'}`"
              material="transparent:true; opacity: 1; alphaTest: .1;"
            ></a-image>
          </a-entity>

          <!-- POI audio -->
          <a-entity
            v-if="isAudio(poi.symbol.media_type_audio)"
            :rotation="`0 ${poi.symbol.position.rotation} 0`"
          >
            <a-entity
              v-if="poi.symbol.audio_autoplay"
              :position="`${poi.symbol.position.distance} ${poi.symbol.position.elevation} 0`"
              :sound="`
                src: url(${getSymbolAudiUrl(poi.symbol.id)});
                loop: ${poi.symbol.audio_loop ? 'true' : 'false'};
              `"
              sound-play-stop="eventPlay: play-sound; eventStop: stop-sound;"
              :emit-when-near="`
                distance: ${poi.symbol.audio_distance};
                event: play-sound;
                eventFar: stop-sound;
                throttle: 250;
              `"
            ></a-entity>
            <a-entity
              v-else
              :position="`${poi.symbol.position.distance} ${poi.symbol.position.elevation} 0`"
              :sound="`
                src: url(${getSymbolAudiUrl(poi.symbol.id)});
                loop: ${poi.symbol.audio_loop ? 'true' : 'false'};
              `"
              sound-play-stop="eventPlay: play-sound; eventStop: stop-sound;"
              :listen-to__enter="`target: #poi-radius-${poi.id}; event: radius-enter; emit: play-sound`"
              :listen-to__exit="`target: #poi-radius-${poi.id}; event: radius-exit; emit: stop-sound`"
            ></a-entity>

          </a-entity>

          <!-- POI Radius -->
          <a-entity :rotation="`0 ${poi.position.rotation} 0`">
            <a-entity
              :id="`poi-radius-${poi.id}`"
              :emit-when-near="`
                distance: ${poi.radius};
                event: radius-enter;
                eventFar: radius-exit;
                throttle: 250;
              `"
              :poi-radius="`
                radius: ${poi.radius};
                shape: ${poi.style_type};
                color: ${poi.fill_color};
                opacity: ${poi.fill_opacity};
                strokeColor: ${poi.stroke_color};
                strokeWidth: ${poi.style_stroke_width};
                strokeOpacity: ${poi.stroke_opacity};
                wireframe: ${poi.wireframe};
                extrude: ${poi.extrusion};
              `"
              :poi-animator="`
                amplitude: ${poi.amplitude};
                scale: true;
                scaleAll: ${poi.style_type == 'circle' ? 'false' : 'true'};
              `"
              :position="`${poi.position.distance} ${poi.position.elevation} 0`"
            ></a-entity>
          </a-entity>

          <!-- todo handle other media -->
          <!--template v-for="media of poi.media">
            <a-entity
              :sound="`src: url(${getMediaUrl(media)}); on: click; positional: false;`"
              :emit-when-near="`distance: ${poi.radius};`"
              :position="`0 ${poi.media.position.y} 0`"
            ></a-entity>
          </template-->

        </a-entity>
      </template>
    </a-entity>

    <a-entity id="camera-rig" position="0 1.6 0">
      <a-entity id="head" camera pitch-roll-look-controls></a-entity>
    </a-entity>

  </a-scene>
</template>

<style scoped>

</style>