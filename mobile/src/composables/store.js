import { ref } from '@vue/reactivity';
import { watchEffect } from 'vue';

// global states
const isAuth = ref(false);

const section = ref('menu');

const biovers = ref([]);

const username = ref('');

export function useStore() {

  return { isAuth, section, biovers, username };

}