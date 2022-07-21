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
import PoiEdition from '../Dialog/PoiEdition.vue';

const props = defineProps({
  bioverId: Number,
});

const store = useStore();

const globalChecked = ref(true);
const poiToEdit = ref({});
const showDialog = ref(false);

const poisModification = computed(() => store.state.biovers.poisModification);
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
</script>

<template>
  <div class="table-layout">
    <div class="scrolling-table">
      <table>
        <tr class="tr-header">
          <th class="first-column first-column-header">
            <input type="checkbox" :checked="globalChecked" @click="selectAll">
          </th>
          <th class="column second-column">#</th>
          <th class="column">COORDONNEES</th>
          <th class="column">TITRE</th>
          <th class="column">SOUS-TITRE</th>
          <th class="column">MEDIAS</th>
          <th class="column">RAYON</th>
          <th class="column">VISIBILITE</th>
          <th class="column">CREER LE</th>
          <th class="column">AUTEUR-E</th>
          <th class="column before-last-column">MODIFIER LE</th>
          <th class="last-column last-column-header">
            <img src="../../../assets/tables/more.svg" alt="more">
          </th>
        </tr>
        <tr v-for="(poi, index) in getData" :key="index">
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
          <td class="column">{{ poi.element.User.username }}</td>
          <td class="column before-last-column">{{ dateFormatter(poi.element.update_date) }}</td>
          <td class="last-column">
            <img src="../../../assets/tables/more.svg" alt="more">
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style>
table {
  border-collapse: collapse;
  margin-left: 8px;
  margin-right: 8px;
  color: white;
}

.tr-header {
  border-bottom: 1px solid white;
  margin-left: 40px;
  margin-right: 40px;
}

.column {
  border-right: 1px solid white;
  padding-left: 8px;
  padding-right: 8px;
  white-space: nowrap;
}

.end-align {
  text-align: end;
}

.table-layout {
  margin-left: 8px;
  margin-right: 8px;
  padding-top: 9px;
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: white;
}

.scrolling-table {
  margin-left: 40px;
  width: calc(100% - 95px);
  overflow-x: scroll;
  padding-bottom: 8px;
}

.first-column-header {
  padding-bottom: 1px;
  border-bottom: 1px solid white;
}

.first-column {
  position: absolute;
  width: 22px;
  left: 38px;
  top: auto;
  border-right: 1px solid white;
  padding-right: 5px;
}

.second-column {
  padding-left: 8px;
}

.before-last-column {
  border: 0;
}

.last-column-header {
  padding-bottom: 1px;
  border-bottom: 1px solid white;
}

.last-column {
  position: absolute;
  width: 40px;
  right: 40px;
  top: auto;
  border-left: 1px solid white;
  height: 22px;
}
</style>
