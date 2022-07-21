<script setup>
import { ref, defineProps, computed } from 'vue';
import { useStore } from 'vuex';

import PoiTable from './PoiTable.vue';
import PathTable from './PathTable.vue';
import TraceTable from './TraceTable.vue';
import EventTable from './EventTable.vue';

const props = defineProps({
  bioverId: Number,
});

const store = useStore();

const getPoisByBiover = computed(() => store.getters['biovers/getPoisByBiover']);
const getPathsByBiover = computed(() => store.getters['biovers/getPathsByBiover']);

const currentTab = ref(1);

function selectTab(tabId) {
  currentTab.value = tabId;
}
</script>

<template>
  <div>
    <div class="layout">
      <button
        @click="selectTab(1)"
        :class="{'button-focus': currentTab === 1}"
      >
        <img class="text-margin" src="../../../assets/tables/poi.svg" alt="poi">
        <p>points d'intérêt [{{ getPoisByBiover(props.bioverId).length }}]</p>
      </button>
      <button
        @click="selectTab(2)"
        :class="{'button-focus': currentTab === 2}"
      >
        <img class="text-margin" src="../../../assets/tables/path.svg" alt="path">
        <p>traces [{{ getPathsByBiover(props.bioverId).length }}]</p>
      </button>
      <button
        @click="selectTab(3)"
        :class="{'button-focus': currentTab === 3}"
      >
        <img class="text-margin" src="../../../assets/tables/settings.svg" alt="settings">
        <p>paramètres</p>
      </button>
      <button
        @click="selectTab(4)"
        :class="{'button-focus': currentTab === 4}"
      >
        <img class="text-margin" src="../../../assets/tables/metadata.svg" alt="metadata">
        <p>metadata</p>
      </button>
    </div>

    <div class="data-table-layout">
      <PoiTable v-show="currentTab === 1" :bioverId="props.bioverId" />
      <PathTable v-show="currentTab === 2" :bioverId="props.bioverId" />
      <TraceTable v-show="currentTab === 3" :bioverId="props.bioverId" />
      <EventTable v-show="currentTab === 4" :bioverId="props.bioverId" />
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-wrap: wrap;
  padding-top: 8px;
  margin-left: 8px;
  margin-right: 8px;
  border-bottom: 1px solid white;
  height: 29px;
}

.data-table-layout {
  padding-bottom: 8px;
}

button {
  color: white;
  background-color: #666666;
  border-width: 1px 1px 1px 1px;
  border-style: solid;
  border-color: white;
  border-radius: 2px 2px 0px 0px;
  margin-right: 8px;
  cursor: pointer;
  width: auto;
  height: 30px;
  display: flex;
  align-items: center;
}

.button-focus {
  background-color: black;
  border-bottom: 1px solid black;
}

img {
  padding-right: 8px;
}

p {
  padding-right: 8px;
}
</style>
