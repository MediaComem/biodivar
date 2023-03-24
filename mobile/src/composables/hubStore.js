import { ref } from 'vue';

const menuOpen = ref(false);
const parameterOpen = ref(false);

export function hubStore() {

    return { menuOpen, parameterOpen };

}