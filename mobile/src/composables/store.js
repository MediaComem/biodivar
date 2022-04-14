import { ref } from '@vue/reactivity';

// global states
const isAuth = ref(false);

const section = ref('menu');

const biovers = ref([]);


export function useStore() {

  return { isAuth, section, biovers };

}