<script setup>
import {
  ref,
  defineProps,
  onMounted,
  computed,
  watch,
} from 'vue';
import { useStore } from 'vuex';

import format from '../../../utils/formatter';
import sort from '../../../utils/sort';
import PoiEdition from '../Dialog/PoiEdition.vue';

const props = defineProps({
  bioverId: Number,
});

const store = useStore();

const globalChecked = ref(true);
const poiToEdit = ref({});

const sortElement = ref('');
const orderElement = ref(0);

const getPathsByBiover = computed(() => store.getters['biovers/getPathsByBiover']);
const ownOrPublic = computed(() => store.getters['biovers/ownOrPublic']);
const bioverIsEditable = computed(() => store.getters['biovers/bioverIsEditable']);

const getData = computed(() => {
  if (ownOrPublic.value(props.bioverId) === 'own') {
    return getPathsByBiover.value(props.bioverId);
  }
  return getPathsByBiover.value(props.bioverId).filter((e) => e.element.is_public);
});

function updatePathToDisplay(path) {
  store.dispatch('biovers/updatePathToDisplay', path);
}

function selectAllPaths() {
  store.dispatch('biovers/selectAllPaths');
}

function unselectAllPaths() {
  store.dispatch('biovers/unselectAllPaths');
}

function dateFormatter(date) {
  return format.dateFormatter(date);
}

function coordinateFormatter(coordinates) {
  return format.coordinateFormatter(coordinates);
}

function selectElement(selectedPath) {
  updatePathToDisplay({
    bioverId: props.bioverId,
    path: selectedPath,
  });
}

function selectAll() {
  globalChecked.value = !globalChecked.value;
  if (globalChecked.value) {
    selectAllPaths();
  } else {
    unselectAllPaths();
  }
}

function couldUpdate(row) {
  return (ownOrPublic.value(row.element.biovers) === 'public' && !bioverIsEditable.value(row.element.biovers)) || row.import;
}

function setSort(value) {
  if (sortElement.value === value) {
    orderElement.value = !orderElement.value;
  } else {
    orderElement.value = false;
  }
  sortElement.value = value;
}

const getSortedData = computed(() => sort.sort(getData, sortElement, orderElement));
</script>

<template>
  <div class="table-layout">
    <div class="scrolling-table">
      <table>
        <tr class="tr-header">
          <th class="first-column first-column-header">
            <input type="checkbox" :checked="globalChecked" @click="selectAll">
          </th>
          <th class="column second-column">
            <div class="header-value">
              <p>#</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'id' && !orderElement}"
                src="../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('id')">
            </div>
          </th>
          <th class="column">
            <div class="header-value">
              <p>COORDONNEES</p>
              <!--img src="../../../assets/tables/sort-arrow.svg" alt="sort"-->
            </div>
          </th>
          <th class="column">
            <div class="header-value">
              <img src="../../../assets/tables/visibility.svg" alt="visibility">
              <p>VISIBILITE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'visible_from' && !orderElement}"
                src="../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('visible_from')">
            </div>
          </th>
          <th class="column">
            <div class="header-value">
              <p>CREER LE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'creation_date' && !orderElement}"
                src="../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('creation_date')">
            </div>
          </th>
          <th class="column">
            <div class="header-value">
              <img src="../../../assets/tables/architecte.svg" alt="architecte">
              <p>AUTEUR-E</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'username' && !orderElement}"
                src="../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('username')">
            </div>
          </th>
          <th class="column before-last-column">
            <div class="header-value">
              <img src="../../../assets/tables/edit.svg" alt="edit">
              <p>MODIFIER LE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'update_date' && !orderElement}"
                src="../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('update_date')">
            </div>
          </th>
          <th class="last-column last-column-header">
            <img src="../../../assets/tables/more.svg" alt="more">
          </th>
        </tr>
        <tr v-for="(path, index) in getSortedData" :key="index">
          <td class="first-column">
            <input type="checkbox" :checked="path.display" @click="selectElement(path)">
          </td>
          <td class="column second-column">{{ path.element.id }}</td>
          <td class="column">{{ coordinateFormatter(path.element.coordinate) }}</td>
          <td class="column end-align">{{ path.element.visible_from }} M</td>
          <td class="column">{{ dateFormatter(path.element.creation_date) }}</td>
          <td class="column">{{ path.element.User.username }}</td>
          <td class="column before-last-column">{{ dateFormatter(path.element.update_date) }}</td>
          <td class="last-column">
            <img src="../../../assets/tables/more.svg" alt="more">
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
@import './table.css';
</style>
