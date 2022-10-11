<script setup>
import { computed } from 'vue';

const props = defineProps({
    mode: Boolean,
});

const title = computed(() => {
    return props.mode ? "éditer point d'intérêt" : "nouveau point d'intérêt";
})
</script>

<template>
    <div class="layout">
        <p class="material-symbols-sharp symbol-location">add_location_alt</p>
        <p class="title">{{ title }}</p>
        <p class="material-symbols-sharp symbol-close">close</p>
    </div>
</template>

<style scoped>
.layout {
    display: grid;
    grid-template-columns: 20px auto 20px;
    grid-template-rows: 35px;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 100%;
    margin-bottom: 10px;
}

.symbol-location {
    grid-area: 1 / 1 / 2 / 2;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
}

.title {
    grid-area: 1 / 2 / 2 / 3;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    text-transform: uppercase;
}

.symbol-close {
    grid-area: 1 / 3 / 2 / 4;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
}
</style>
