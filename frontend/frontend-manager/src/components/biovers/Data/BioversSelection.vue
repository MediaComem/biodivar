<script setup>
import {
  ref,
  watch,
  computed,
  onDeactivated,
  nextTick,
} from 'vue';
import { useStore } from 'vuex';

import DataTab from './DataTab.vue';
import BioverCreator from '../Dialog/BioverCreator.vue';
import World from '../../../assets/tables/world.vue';

const store = useStore();

const tree = ref(null);

const ownBiovers = computed(() => store.state.biovers.ownBiovers);
const publicBiovers = computed(() => store.state.biovers.publicBiovers);
const bioversToDisplay = computed(() => store.state.biovers.bioversToDisplay);
const currentBioversId = computed(() => store.state.biovers.currentBioversId);

const data = ref([{
  id: 0,
  label: 'Mes Biovers',
  children: [],
  disabled: true,
},
{
  id: -1,
  label: 'Biovers Publiques',
  children: [],
  disabled: true,
}]);
const showDialog = ref(false);

function addBioverToDisplay(event) {
  store.dispatch('biovers/addBioverToDisplay', event);
}

function removeBioverToDisplay(id) {
  store.dispatch('biovers/removeBioverToDisplay', id);
}

function addPoiToDisplay(id) {
  store.dispatch('biovers/addPoiToDisplay', id);
}

function addPathToDisplay(id) {
  store.dispatch('biovers/addPathToDisplay', id);
}

function addTraceToDisplay(id) {
  store.dispatch('biovers/addTraceToDisplay', id);
}

function addEventToDisplay(id) {
  store.dispatch('biovers/addEventToDisplay', id);
}

function setCurrentBiover(id) {
  store.dispatch('biovers/setCurrentBiover', id);
}

function setOpenBiovers(biovers) {
  const checked = [];
  biovers.value.forEach((val) => {
    checked.push(val.biover.id);
  });
  nextTick(() => {
    if (tree.value) {
      tree.value.setCheckedKeys(checked, false);
    }
  });
}

function selectedBiovers(event) {
  const index = bioversToDisplay.value.findIndex((biovers) => biovers.biover.id === event.id);
  if (index === -1) {
    addBioverToDisplay(event);
    addPoiToDisplay(event.id);
    addPathToDisplay(event.id);
    addTraceToDisplay(event.id);
    addEventToDisplay(event.id);
  } else {
    removeBioverToDisplay(event.id);
  }
}

function selectTab(id) {
  const tabIndex = bioversToDisplay.value.findIndex((biovers) => biovers.biover.id === id);
  if (tabIndex !== -1) {
    setCurrentBiover(bioversToDisplay.value[tabIndex].biover.id);
  } else {
    setCurrentBiover(0);
    setOpenBiovers(bioversToDisplay);
  }
}

function closeTab(id) {
  removeBioverToDisplay(id);
  setCurrentBiover(bioversToDisplay.value[bioversToDisplay.value.length - 1].biover.id);
}

watch(() => ownBiovers, (newVal) => {
  if (newVal.value.length !== data.value[0].length) {
    const diff = newVal.value.filter((x) => !data.value[0].children
      .some((child) => child.id === x.id));
    diff.forEach((element) => {
      data.value[0].children.push({
        label: element.name,
        id: element.id,
      });
    });
  }
}, { deep: true });

watch(() => publicBiovers, (newVal) => {
  if (newVal.value.length !== data.value[1].length) {
    const diff = newVal.value.filter((x) => !data.value[1].children
      .some((child) => child.id === x.id));
    diff.forEach((element) => {
      data.value[1].children.push({
        label: element.name,
        id: element.id,
      });
    });
  }
}, { deep: true });

watch(() => bioversToDisplay, (newVal) => {
  if (newVal.value.length > 0) {
    setOpenBiovers(newVal);
  }
}, { deep: true });

onDeactivated(() => {
  data.value[0].children = [];
  data.value[1].children = [];
});
</script>

<template>
  <div>
    <div style="display: flex; flex-wrap: wrap; border-bottom: 1px solid white">
      <div class="button-border-layout">
        <button class="button-layout button-selection" @click="selectTab(0)">
          <img class="text-margin" src="../../../assets/tables/biovers.svg" alt="biovers">
          <p class="text-margin">Biovers</p>
        </button>
      </div>
      <div v-for="biovers in bioversToDisplay" :key="biovers.name" class="button-border-layout" :class="{'remove-border': biovers.biover.id === currentBioversId}">
        <button
          :class="{'button-unfocus': biovers.biover.id !== currentBioversId}"
          class="button-layout button-biovers"
        >
            <World :animate="biovers.biover.id === currentBioversId" @click="selectTab(biovers.biover.id)"/>
            <p class="text-margin" @click="selectTab(biovers.biover.id)">{{ biovers.title }}</p>
            <img src="../../../assets/tables/cross.svg" alt="close" @click="closeTab(biovers.biover.id)">
        </button>
      </div>
    </div>
    <div class="border-element">
      <div v-show="currentBioversId === 0">
        <el-tree ref="tree" node-key="id" :data="data" show-checkbox @check="selectedBiovers"/>
      </div>
      <div v-for="biovers in bioversToDisplay" :key="biovers.name" class="data-layout">
        <DataTab
          v-show="currentBioversId === biovers.biover.id"
          :bioverId="biovers.biover.id" />
      </div>
    </div>
    <BioverCreator :showDialog="showDialog" @close-dialog="showDialog = false"/>
  </div>
</template>

<style scoped>
.remove-border {
  border-bottom: 1px solid black !important;
  margin-bottom: -1px;
}

.button-unfocus {
  background-color: #666666 !important;
  color: white;
}

.button-border-layout {
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: #FFFFFF;
  border-radius: 2px 2px 0px 0px;
  margin-right: 5px;
}

.button-layout {
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 0;
}

.button-selection {
  background-color: white;
  border: 0;
}

.button-biovers {
  color: white;
  background-color: black;
  border-style: solid;
  border-color: white;
}

.text-margin {
  margin-right: 8px;
}

.data-layout {
  background-color: black;
}

.border-element {
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #FFFFFF;
}
</style>
