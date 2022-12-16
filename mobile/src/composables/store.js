import { ref } from '@vue/reactivity';
import { watch } from "@vue/runtime-core";

import { storage } from './localStorage.js';

const { storeFavori, getFavori, getPins, storePins, getMinDistance, storeMinDistance } = storage();

// global states
const isAuth = ref(false);

const section = ref('menu');

const biovers = ref([]);

const username = ref('');

const showAggreement = ref(false);

const forgotPassword = ref(false);

const send = ref(false);

const selectedBiovers = ref(null);

const isMobileOrTablet = ref(true);
const isIOS = ref(false);

const favori = ref(getFavori());

const pins = ref(getPins());

const mapOpen = ref(false);

const hubDisplay = ref(true);

const hubDisplayTimeout = ref(null);

const registerValidated = ref(false);

const minDistance = ref(getMinDistance());

const arMode = ref('unbound');

watch(favori, (val) => {
  storeFavori(favori.value);
}, { deep: true } );

const isInFavori = (id) => {
  return favori.value.find((f) => f === id) ? true : false;
};

watch(pins, (val) => {
  storePins(pins.value);
}, { deep: true } );

const isInPins = (id) => {
  return pins.value.find((p) => p === id) ? true : false;
};

const getPinsBiovers = () => {
  const result = [];
  pins.value.forEach(p => {
    const element = biovers.value.find((b) => b.id === p);
    if (element) {
      result.push(element);
    }
  })
  return result;
}

const addPoiInBiovers = (newPoi) => {
  const bioversIndex = biovers.value.findIndex((b) => b.id === newPoi.biovers);
  biovers.value[bioversIndex].Poi.push(newPoi);

  if (selectedBiovers.value) {
    selectedBiovers.value.Poi.push(newPoi);
  }
}

const updatePoiInBiovers = (newPoi) => {
  const bioversIndex = biovers.value.findIndex((b) => b.id === newPoi.biovers);
  const poiIndex = biovers.value[bioversIndex].Poi.findIndex((p) => p.id === newPoi.id)
  biovers.value[bioversIndex].Poi[poiIndex] = newPoi;

  if (selectedBiovers.value) {
    const selectedPoiIndex = selectedBiovers.value.Poi.findIndex((p) => p.id === newPoi.id)
    selectedBiovers.value.Poi[selectedPoiIndex] = newPoi;
  }
}

const updatePathInBiovers = (newPath) => {
  const bioversIndex = biovers.value.findIndex((b) => b.id === newPath.biovers);
  const pathIndex = biovers.value[bioversIndex].Path.findIndex((p) => p.id === newPath.id)
  biovers.value[bioversIndex].Path[pathIndex] = newPath;

  if (selectedBiovers.value) {
    const selectedPathIndex = selectedBiovers.value.Path.findIndex((p) => p.id === newPath.id)
    selectedBiovers.value.Path[selectedPathIndex] = newPath;
  }
}

const resetSelectedBiovers = () => {
  selectedBiovers.value = null;
}

watch(minDistance, (distance) => {
  storeMinDistance(distance);
}, { deep: true } );

export function useStore() {

  return { isAuth, section, biovers, username, showAggreement, forgotPassword, send, isMobileOrTablet, isIOS, selectedBiovers, pins, mapOpen, favori, hubDisplay, hubDisplayTimeout, registerValidated, minDistance, arMode, isInFavori, isInPins, getPinsBiovers, addPoiInBiovers, updatePoiInBiovers, updatePathInBiovers, resetSelectedBiovers };

}