<script setup>  
const emit = defineEmits(['close'])

const props = defineProps({
    logo: String,
    title: String,
});
</script>

<template>
    <div class="layout">
        <p class="material-symbols-sharp symbol-location">{{ props.logo }}</p>
        <p class="title">{{ props.title }}</p>
        <p class="material-symbols-sharp symbol-close" @click="emit('close')">close</p>
    </div>
</template>

<style scoped>
.layout {
    display: grid;
    grid-template-columns: 20px auto 20px;
    grid-template-rows: 30px;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width: 100%;
}

.symbol-location {
    grid-area: 1 / 1 / 2 / 2;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    color: black
}

.title {
    grid-area: 1 / 2 / 2 / 3;
    font-size: 16px;
    letter-spacing: 0.02em;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    text-transform: uppercase;
    font-family: "BiodivAR Roman";
    font-variation-settings: "wght" 149, "ital" 0;
    padding-top: 3px;
}

.symbol-close {
    grid-area: 1 / 3 / 2 / 4;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    cursor: pointer;
}
</style>
