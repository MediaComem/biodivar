<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

function storeData(data) {
    if (data && data.detail) {
        data.detail.forEach((poi) => {
            store.dispatch('biovers/addNewPoi', poi);
        });
    }
}

onMounted(() => {
    window.addEventListener('custom-upload-control-from-zip', storeData);
})

onUnmounted(() => {
    window.removeEventListener('custom-upload-control-from-zip', storeData);
})
</script>

<template>
</template>

<style scoped>
</style>
