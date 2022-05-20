import { ref } from '@vue/reactivity';
import { watch } from "@vue/runtime-core";

import { storage } from './localStorage.js';

const { storeFavori, getFavori } = storage();

// global states
const isAuth = ref(false);

const section = ref('menu');

const biovers = ref([]);

const username = ref('');

const showAggreement = ref(false);

const forgotPassword = ref(false);

const send = ref(false);

const selectedBiovers = ref(new Object);

const isMobileOrTablet = ref(AFRAME.utils.device.isMobile() || AFRAME.utils.device.isTablet());
const isIOS = ref(AFRAME.utils.device.isIOS());
const isWebXRAvailable = ref(AFRAME.utils.device.isWebXRAvailable);

const favori = ref(getFavori());

watch(favori, (val) => {
  storeFavori(favori.value);
}, { deep: true } );

const isInFavori = (id) => { 
  return favori.value.find((f) => f === id) ? true : false;
};

export function useStore() {

  return { isAuth, section, biovers, username, showAggreement, forgotPassword, send, isMobileOrTablet, isIOS, isWebXRAvailable, selectedBiovers, favori, isInFavori };

}