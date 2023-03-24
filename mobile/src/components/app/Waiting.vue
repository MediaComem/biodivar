<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const wait = computed(() => store.state.global.wait);
</script>

<template>
    <div v-if="wait" class="layout">
        <span class="loader"></span>
    </div>
</template>

<style scoped>
.layout {
    width: 100vw;
    height: 100vh;
    z-index: 10000000000;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
}

.loader {
    position: fixed;
    top: calc(50% - 24px);
    left: calc(50% - 24px);
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
} 
</style>