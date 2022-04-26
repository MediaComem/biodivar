import { ref } from '@vue/reactivity';
import { watchEffect } from 'vue';

// global states
const isAuth = ref(false);

const section = ref('menu');

const biovers = ref([]);

const username = ref('');

const showAggreement = ref(false);

const forgotPassword = ref(false);

export function useStore() {

  return { isAuth, section, biovers, username, showAggreement, forgotPassword };

}