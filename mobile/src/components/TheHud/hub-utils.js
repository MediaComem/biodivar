import { useStore } from '../../composables/store';
import { hubStore } from '../../composables/hubStore';

const { mapOpen, hubDisplay, hubDisplayTimeout } = useStore();
const { menuOpen, parameterOpen } = hubStore();

export function clearHubTimeout() {
    clearTimeout(hubDisplayTimeout.value);
    hubDisplayTimeout.value = null;
}

export function setHubTimeout() {
    hubDisplayTimeout.value = setTimeout(() => {
        mapOpen.value = false;
        hubDisplay.value = false;
        menuOpen.value = false;
        parameterOpen.value = false;
    }, 3000)
}

