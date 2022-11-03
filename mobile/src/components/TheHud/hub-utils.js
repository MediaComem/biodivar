import { useStore } from '../../composables/store';

const { mapOpen, hubDisplay, hubDisplayTimeout } = useStore();

export function clearHubTimeout() {
    clearTimeout(hubDisplayTimeout.value);
    hubDisplayTimeout.value = null;
}

export function setHubTimeout() {
    hubDisplayTimeout.value = setTimeout(() => {
        mapOpen.value = false;
        hubDisplay.value = false;
    }, 3000)
}

