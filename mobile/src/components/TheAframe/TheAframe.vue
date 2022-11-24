<script setup>
  import { useStore } from '../../composables/store.js';
  import { useEventListener } from '../../composables/event.js';

  import '../aframe/gps-position';
  import '../aframe/faces-north';
  import '../aframe/pitch-roll-look-controls';
  import '../aframe/look-at-roll-yaw';
  import '../aframe/hit-test-marker';
  import '../aframe/visible-from';
  import '../aframe/enter-ar-on-init';
  import '../aframe/poi-radius';
  import '../aframe/emit-when-near';
  import '../aframe/animation-mixer';
  import '../aframe/sound-play-stop';
  import '../aframe/listen-to';
  import '../aframe/event-set';

  import { getSymbolUrl, getSymbolAudiUrl, getMediaUrl, saveTrace, saveEvent } from '../../utils/api.js';
  import { onMounted, onUnmounted, watch } from '@vue/runtime-core';

  const { selectedBiovers, section, minDistance } = useStore();

  function isImage(str) {
    return str === 'png' ||  str === 'jpg' ||  str === 'svg';
  }

  function isGltf(str) {
    return str === 'gltf' ||  str === 'glb';
  }

  function isAudio(str) {
    return str === 'mp3' ||  str === 'wav' ||  str === 'm4a';
  }

  // auto exit AR on mobile lock or app change
  useEventListener(document, 'visibilitychange', () => {
    if (!document.hidden) return;
    section.value = 'menu';
  });

  useEventListener('[webxr]', 'exit-vr', () => {
    section.value = 'menu';
  });

  let wakeLock = null;
  let timerTrace = null;
  let position = null;
  let bioversId = selectedBiovers.value.id;

  function saveEventPoiEnter(evt) {
    if (!position) return;
    if (!evt.detail?.poiId) return
    saveEvent({
      is_public: true,
      gps_accuracy: position.coords.accuracy,
      biovers: bioversId,
      coordinate: { lat: position.coords.latitude, long: position.coords.longitude, alt: position.coords.altitude ?? 0 },
      data: 'biovers-enter-poi-' + evt.detail.poiId,
    });
  }

  function saveEventPoiExit(evt) {
    if (!position) return;
    if (!evt.detail?.poiId) return
    saveEvent({
      is_public: true,
      gps_accuracy: position.coords.accuracy,
      biovers: bioversId,
      coordinate: { lat: position.coords.latitude, long: position.coords.longitude, alt: position.coords.altitude ?? 0 },
      data: 'biovers-exit-poi-' + evt.detail.poiId,
    });
  }

  onMounted(async () => {
    wakeLock = await navigator.wakeLock.request('screen');
    let gpsFirstSet = true;

    const id = navigator.geolocation.watchPosition(
      pos => {
        position = pos;
        // Save event when user enter AR and GPS pos set
        if (!gpsFirstSet) return;
        gpsFirstSet = false;
        saveEvent({
          is_public: true,
          gps_accuracy: position.coords.accuracy,
          biovers: bioversId,
          coordinate: { lat: position.coords.latitude, long: position.coords.longitude, alt: position.coords.altitude ?? 0 },
          data: 'biovers-open',
        });
      },
      error => console.error(error),
      { enableHighAccuracy: true, enableHighAccuracy: true}
    );

    // save GPS coord of user every second
    timerTrace = setInterval(() => {
      if (!position) return;
      saveTrace({
        is_public: true,
        gps_accuracy: position.coords.accuracy,
        biovers: bioversId,
        coordinate: { lat: position.coords.latitude, long: position.coords.longitude, alt: position.coords.altitude ?? 0 },
      });
    }, 1000);

    // Save event when a user enter a POI radius
    window.addEventListener('radius-enter', saveEventPoiEnter);
    // Save event when a user exit a POI radius
    window.addEventListener('radius-exit', saveEventPoiExit);
  });

  onUnmounted(() => {
    if (wakeLock) wakeLock.release();
    if (timerTrace) clearInterval(timerTrace);
    window.removeEventListener('radius-enter', saveEventPoiEnter);
    window.removeEventListener('radius-exit', saveEventPoiExit);
    // Save event when user leave AR and GPS pos set
    if (!position) return;
    saveEvent({
      is_public: true,
      gps_accuracy: position.coords.accuracy,
      biovers: bioversId,
      coordinate: { lat: position.coords.latitude, long: position.coords.longitude, alt: position.coords.altitude ?? 0 },
      data: 'biovers-close',
    });
  });
</script>

<template>
  <a-scene
    renderer="colorManagement: true"
    :gps-position="`minAccuracy: 100; minDistance: ${minDistance}; cam3DoF: false`"
    webxr="requiredFeatures: hit-test,local-floor,dom-overlay; overlayElement: [data-role='hud']; referenceSpaceType: local-floor"
    aar-hit-test="src: assets/ar-hit-test-marker.png"
    ahit-test-marker
    vr-mode-ui="enabled: false"
    embedded
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
      <template v-for="poi of selectedBiovers.Poi" :key="`poi-${poi.id}`">
        <a-entity
          position="0 0 10000"
          :gps-position="`latitude: ${poi.coordinate.lat}; longitude: ${poi.coordinate.long}`"
          :visible-from="`distance: ${poi.scope}`"
          :listen-to__enter="`target: #poi-radius-${poi.id}; event: radius-enter; emit: gps-pos-off`"
          :listen-to__exit="`target: #poi-radius-${poi.id}; event: radius-exit; emit: gps-pos-on`"
          event-set__gpson="event: gps-pos-on; attribute: gps-position.enable; value: true"
          event-set__gpsoff="event: gps-pos-off; attribute: gps-position.enable; value: false"
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
                distanceModel: linear;
                maxDistance: ${poi.symbol.audio_distance};
              `"
              sound-play-stop="eventPlay: play-sound; eventStop: stop-sound;"
              :emit-when-near="`
                distance: ${poi.symbol.audio_distance};
                event: play-sound;
                eventFar: stop-sound;
              `"
            ></a-entity>
            <a-entity
              v-else
              :position="`${poi.symbol.position.distance} ${poi.symbol.position.elevation} 0`"
              :sound="`
                src: url(${getSymbolAudiUrl(poi.symbol.id)});
                loop: ${poi.symbol.audio_loop ? 'true' : 'false'};
                positional: false;
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
                poiId: ${poi.id};
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

          <!-- POI Medias -->
          <template v-for="m of poi.media" :key="`media-${m.id}`">
            <a-entity
              :visible="m.is_visible_in_radius ? 'false' : null"
              :listen-to__enter="`target: #poi-radius-${poi.id}; event: radius-enter; emit: media-show`"
              :listen-to__exit="`target: #poi-radius-${poi.id}; event: radius-exit; emit: media-hide`"
              event-set__show="event: media-show; attribute: visible; value: true"
              :event-set__hide="m.is_visible_in_radius ? `event: media-hide; attribute: visible; value: false` : null"
            >
              <!-- Gltf media -->
              <a-entity
                v-if="isGltf(m.media_type)"
                :rotation="`0 ${m.position.rotation} 0`"
              >
                <a-entity
                  :gltf-model="`url(${getMediaUrl(m)})`"
                  animation-mixer
                  :scale="`${m.scale} ${m.scale} ${m.scale}`"
                  :position="`${m.position.distance} ${m.position.elevation} 0`"
                  :look-at-roll-yaw="`enabled: ${m.is_facing ? 'true' : 'false'}`"
                ></a-entity>
              </a-entity>

              <!-- Image media -->
              <a-entity
                v-if="isImage(m.media_type)"
                :rotation="`0 ${m.position.rotation} 0`"
              >
                <a-image
                  :src="`url(${getMediaUrl(m)})`"
                  :scale="`${m.scale} ${m.scale} ${m.scale}`"
                  :position="`${m.position.distance} ${m.position.elevation} 0`"
                  :look-at-roll-yaw="`enabled: ${m.is_facing ? 'true' : 'false'}`"
                  material="transparent:true; opacity: 1; alphaTest: .1;"
                ></a-image>
              </a-entity>

              <!-- Text media -->
              <a-entity
                v-if="m.text"
                :rotation="`0 ${m.position.rotation} 0`"
              >
                <a-text
                  :scale="`${m.scale} ${m.scale} ${m.scale}`"
                  :position="`${m.position.distance} ${m.position.elevation} 0`"
                  :look-at-roll-yaw="`enabled: ${m.is_facing ? 'true' : 'false'}`"
                  align="center"
                  :value="m.text"
                  font="assets/biodivar-sans-Book-msdf.json"
                  font-image="assets/biodivar-sans-Book-msdf.png"
                  negate="false"
                  material="transparent:true; opacity: 1; alphaTest: 0.1;"
                  side="double"
                ></a-text>
              </a-entity>

              <!-- Audio media -->
              <a-entity
                v-if="isAudio(m.media_type)"
                :rotation="`0 ${m.position.rotation} 0`"
              >
                <a-entity
                  :position="`${m.position.distance} ${m.position.elevation} 0`"
                  :sound="`
                    src: url(${getMediaUrl(m)});
                    loop: ${m.loop ? 'true' : 'false'};
                    volume: ${m.scale};
                    ${m.autoplay ? 'distanceModel: linear;' : 'positional: false;'}
                    ${m.autoplay && m.is_visible_in_radius ? 'maxDistance: ' +  poi.radius : ''}
                    ${m.autoplay && !m.is_visible_in_radius ? 'maxDistance: ' +  poi.symbol.audio_distance : ''}
                  `"
                  sound-play-stop="eventPlay: play-sound; eventStop: stop-sound;"
                  :listen-to__enter="m.is_visible_in_radius ? `target: #poi-radius-${poi.id}; event: radius-enter; emit: play-sound` : null"
                  :listen-to__exit="m.is_visible_in_radius ? `target: #poi-radius-${poi.id}; event: radius-exit; emit: stop-sound` : null"
                  :emit-when-near="m.is_visible_in_radius ? null : `
                    distance: ${poi.symbol.audio_distance};
                    event: play-sound;
                    eventFar: stop-sound;
                  `"
                ></a-entity>

              </a-entity>
            </a-entity>
          </template>

        </a-entity>
      </template>
    </a-entity>

    <a-entity id="camera-rig" position="0 1.7 0">
      <a-entity id="head" camera pitch-roll-look-controls></a-entity>
    </a-entity>

  </a-scene>
</template>

<style scoped>

</style>