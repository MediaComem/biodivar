<template>
<div>
<div class="table-layout">
    <div class="scrolling-table">
      <table>
        <tr class="tr-header">
          <th class="first-column first-column-header">
            <input type="checkbox" :checked="globalChecked" @click="selectAll">
          </th>
          <th class="column second-column">
            <div class="header-value">
              <p class="no-margin">#</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'id' && !orderElement}" @click="setSort('id')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getTraceColumnsPreference.author" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">architecture</p>
              <p class="no-margin">AUTHEUR</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'username' && !orderElement}" @click="setSort('username')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getTraceColumnsPreference.created_date" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">date_range</p>
              <p class="no-margin">CREER LE</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'creation_date' && !orderElement}" @click="setSort('creation_date')">arrow_drop_down</p>
            </div>
          </th>
           <th v-if="getTraceColumnsPreference.gps_accuracy" class="column">
            <div class="header-value">
              <p class="no-margin">Précision du GPS</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'gps_accuracy' && !orderElement}" @click="setSort('gps_accuracy')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getTraceColumnsPreference.coordinate" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp">location_searching</p>
              <p class="no-margin">COORDONNEES</p>
            </div>
          </th>
          <th class="last-column last-column-header">
             <p class="material-symbols-sharp no-margin clickable" @click="openMenu(0)">more_vert</p>
             <div v-if="menuState && menuState.id === 0 && menuState.state" class="menu">
                <p class="menu-element" :class="{'disable': !globalChecked }" @click="downloadTraces">Exporter les Traces</p>
                <p class="menu-element" @click="openColumnSelector()">Définir les colonnes</p>
             </div>
             <div v-if="menuState" class="overlay" @click="menuState = undefined" />
          </th>
        </tr>
        <tr v-for="(trace, index) in getSortedData" :key="index">
          <td class="first-column">
            <input type="checkbox" :checked="trace.display" @click="selectElement(trace)">
          </td>
          <td class="column">{{ trace.element.id }}</td>
          <td v-if="getTraceColumnsPreference.author" class="column">{{ userFormatter(trace.element.User) }}</td>
          <td v-if="getTraceColumnsPreference.created_date" class="column">{{ dateFormatter(trace.element.creation_date) }}</td>
          <td v-if="getTraceColumnsPreference.gps_accuracy" class="column">{{ trace.element.gps_accuracy }}</td>
          <td v-if="getTraceColumnsPreference.coordinate" class="column">({{ getCoordinate(trace) }})</td>
          <td class="last-column">
             <p class="material-symbols-sharp no-margin clickable" @click="openMenu(trace.element.id)">more_vert</p>
             <div v-if="menuState && menuState.id === trace.element.id && menuState.state" class="menu">
                <p class="menu-element" @click="downloadTrace(trace)">Exporter l'Event</p>
             </div>
             <div v-if="menuState" class="overlay" @click="menuState = undefined" />
          </td>   
        </tr>
      </table>
    </div>
  </div>
  <TraceColumnsSelector v-if="columnDialog" :showDialog="columnDialog" @close-dialog="columnDialog = false" />
</div>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import TraceColumnsSelector from '../Dialog/TraceColumnsSelector.vue';

import { dateFormatter } from '../../../../utils/formatter.js';
import sort from '../../../../utils/sort';

import { computeGeoJSONFromTrace, computeGeoJSONFromTraces } from '../../../../utils/geojson.js';

export default {
  components: { TraceColumnsSelector },
  props: {
    bioverId: Number,
  },
  data() {
    return {
      sortElement: '',
      orderElement: false,
      globalChecked: true,
      menuState: undefined,
      columnDialog: false,
    }
  },
  computed: {
    getSortedData() {
      return sort.sort(this.getTraceByBioversAndUser(this.bioverId), this.sortElement, this.orderElement);
    },
    allAreUnselected() {
      return this.getSortedData.filter((trace) => trace.display).length === 0;
    },
    ...mapGetters('biovers', ['getTraceByBioversAndUser', 'getTraceColumnsPreference']),
  },
  methods: {
    dateFormatter(date) {
      return dateFormatter(date);
    },
    getCoordinate(poi) {
      return poi.element.coordinate ? `${poi.element.coordinate.lat},${poi.element.coordinate.long}` : '';
    },
    userFormatter(user) {
      return user && user.username ? user.username : '';
    },
    setSort(value) {
      if (this.sortElement === value) {
        this.orderElement = !this.orderElement;
      } else {
        this.orderElement = false;
      }
      this.sortElement = value;
    },
    globalCheckAnalizer() {
      if (this.allAreUnselected) {
        this.globalChecked = false;
      } else {
        this.globalChecked = true;
      }
    },
    selectElement(selectedTrace) {
      this.updateTraceToDisplay({
        bioverId: this.bioverId,
        event: selectedTrace,
      });
      this.globalCheckAnalizer();
    },
    selectAll() {
      this.globalChecked = !this.globalChecked;
      if (this.globalChecked) {
        this.selectAllTraces();
      } else {
        this.unselectAllTraces();
      }
    },
    openMenu(rowId) {
      this.menuState = {id: rowId, state: true};
    },
    openColumnSelector() {
      this.columnDialog = true;
      this.menuState = undefined;
    },
    download(file) {
      const anchor = document.createElement('a');
      anchor.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(file);
      anchor.target = '_blank';
      anchor.download = 'export_trace.json';
      anchor.click();
    },
    downloadTrace(event) {
      this.download(computeGeoJSONFromTrace(event));
      this.menuState = undefined;
    },
    downloadTraces() {
      if (!this.globalChecked) return;
      this.download(computeGeoJSONFromTraces(this.getTraceByBioversAndUser(this.bioverId)))
      this.menuState = undefined;
    },
    ...mapActions('biovers', ['selectAllTraces', 'unselectAllTraces', 'updateTraceToDisplay']),
  },
};
</script>

<style scoped>
@import './table.css';

.material-symbols-sharp {
  font-size: 15px;
}

.no-margin {
  margin: 0px;
}

.text-margin {
  padding-right: 6px;
  margin: 0px;
  margin-top: -3px;
}

.icon-font {
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.icon-margin {
  margin: 0px;
  margin-top: -3px;
}
</style>