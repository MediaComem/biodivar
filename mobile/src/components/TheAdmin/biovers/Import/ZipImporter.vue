<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const importFailure = ref(false);

function storeData(response) {
    if (response.detail.statusCode == 403) {
        importFailure.value = true
        setTimeout(() => {
            importFailure.value = false
        }, 2000)

    }
    else if (response.detail.data && response.detail.data) {
        response.detail.data.forEach((poi) => {
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
    <div class="action-layout" :class="{'margin-layout': importFailure}">
      <template v-if="importFailure">
        <el-alert :title="$t('import.failure')" type="error" />
      </template>
    </div>
  </template>

<style scoped>

.action-layout {
    display: flex;
    flex-wrap: wrap;
}

.margin-layout {
    margin-bottom: 1rem;
}

</style>
