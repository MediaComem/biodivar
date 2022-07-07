import { ref } from '@vue/reactivity';
import { watch } from "@vue/runtime-core";

import { storage } from './localStorage.js';

const { storeFavori, getFavori, getPins, storePins } = storage();

// global states
const isAuth = ref(false);

const section = ref('menu');

const biovers = ref([]);

const username = ref('');

const showAggreement = ref(false);

const forgotPassword = ref(false);

const send = ref(false);

const selectedBiovers = ref(new Object);

const isMobileOrTablet = ref(true);
const isIOS = ref(false);

const favori = ref(getFavori());

const pins = ref(getPins());

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

export function useStore() {

  return { isAuth, section, biovers, username, showAggreement, forgotPassword, send, isMobileOrTablet, isIOS, selectedBiovers, pins, favori, isInFavori, isInPins, getPinsBiovers };

}