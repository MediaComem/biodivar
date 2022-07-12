import { ref } from '@vue/reactivity';

let map = ref(null);

export function mapStore() {

    return { map };
  
  }