import {ref, computed} from '@vue/reactivity';

import Home from '../pages/Home.vue';
import Biovers from '../pages/Biovers.vue';

import { useEventListener } from './event'

const routes = {
  '#home': Home,
  '#biovers': Biovers,
};

const hash = ref(window.location.hash);

window.addEventListener('hashchange', () => hash.value = window.location.hash);

const route = computed(() => routes[hash.value] ? hash.value : Object.keys(routes)[0]);
const page = computed(() => routes[route.value]);

export function useRouter() {
  return { page, route };
}