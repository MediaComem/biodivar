<script setup>
import {
  ref,
  defineProps,
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
const showDialog = ref(false);

const sortElement = ref('');
const orderElement = ref(false);

const getPoisByBiover = computed(() => store.getters['biovers/getPoisByBiover']);
const ownOrPublic = computed(() => store.getters['biovers/ownOrPublic']);
const bioverIsEditable = computed(() => store.getters['biovers/bioverIsEditable']);

const getData = computed(() => {
  if (ownOrPublic.value(props.bioverId) === 'own') {
    return getPoisByBiover.value(props.bioverId);
  }
  return getPoisByBiover.value(props.bioverId).filter((e) => e.element.is_public);
});

function updatePoiToDisplay(poi) {
  store.dispatch('biovers/updatePoiToDisplay', poi);
}

function resetPoisModification() {
  store.dispatch('biovers/resetPoisModification');
}

function selectAllPois() {
  store.dispatch('biovers/selectAllPois');
}

function unselectAllPois() {
  store.dispatch('biovers/unselectAllPois');
}

function dateFormatter(date) {
  return format.dateFormatter(date);
}

function selectElement(selectedPoi) {
  updatePoiToDisplay({
    bioverId: props.bioverId,
    poi: selectedPoi,
  });
}

function selectAll() {
  globalChecked.value = !globalChecked.value;
  if (globalChecked.value) {
    selectAllPois();
  } else {
    unselectAllPois();
  }
}

function couldUpdate(row) {
  return (ownOrPublic.value(row.element.biovers) === 'public' && !bioverIsEditable.value(row.element.biovers)) || row.import;
}

function handleEdit(row) {
  if (couldUpdate(row)) {
    return;
  }
  poiToEdit.value = { poi: row.element };
  showDialog.value = true;
}

function setSort(value) {
  if (sortElement.value === value) {
    orderElement.value = !orderElement.value;
  } else {
    orderElement.value = false;
  }
  sortElement.value = value;
}

function userFormatter(user) {
  return user && user.username ? user.username : '';
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
              <p>TITRE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'title' && !orderElement}"
                src="../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('title')">
            </div>
          </th>
          <th class="column">
            <div class="header-value">
              <p>SOUS-TITRE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'subtitle' && !orderElement}"
                src="../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('subtitle')">
            </div>
          </th>
          <th class="column">MEDIAS</th>
          <th class="column">
            <div class="header-value">
              <img src="../../../assets/tables/rayon.svg" alt="rayon">
              <p>RAYON</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'radius' && !orderElement}"
                src="../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('radius')">
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
        <tr v-for="(poi, index) in getSortedData" :key="index">
          <td class="first-column">
            <input type="checkbox" :checked="poi.display" @click="selectElement(poi)">
          </td>
          <td class="column second-column">{{ poi.element.id }}</td>
          <td class="column">({{ poi.element.coordinate.lat }},{{ poi.element.coordinate.long }})</td>
          <td class="column">{{ poi.element.title }}</td>
          <td class="column">{{ poi.element.subtitle }}</td>
          <td class="column">Media</td>
          <td class="column end-align">{{ poi.element.radius }} M</td>
          <td class="column end-align">{{ poi.element.visible_from }} M</td>
          <td class="column">{{ dateFormatter(poi.element.creation_date) }}</td>
          <td class="column">{{ userFormatter(poi.element.User) }}</td>
          <td class="column before-last-column">{{ dateFormatter(poi.element.update_date) }}</td>
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
