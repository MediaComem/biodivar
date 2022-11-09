import { ref } from 'vue';

const menuOpen = ref(false);

export function hubStore() {

    return { menuOpen };

}