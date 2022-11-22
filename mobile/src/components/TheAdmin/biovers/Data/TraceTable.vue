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
                <p class="menu-element" :class="{'disable': !globalChecked }" @click="openDeletionDialog()">Supprimer les traces utilisateurs</p>
                <p class="menu-element" @click="openColumnSelector()">Définir les colonnes</p>
             </div>
             <div v-if="menuState" class="overlay" @click="menuState = undefined" />
          </th>
        </tr>
        <tr v-for="(trace, index) in getSortedData" :key="index" class="table-background" :class="{'table-hover': getCurrentTraceTabClick.includes(trace.element.id)}" @mouseover="over(trace.element.id)" @mouseleave="leave" @click="openPopup(trace.element.id)">
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
                <p class="menu-element" :class="{'disable': isAllowedToEdit() }"  @click="openDeletionDialog(trace)">Supprimer la trace</p>
             </div>
             <div v-if="menuState" class="overlay" @click="menuState = undefined" />
          </td>   
        </tr>
      </table>
    </div>
  </div>
  <DeleteConfirmation v-if="deleteDialog" :dialogVisible="deleteDialog" title="Êtes-vous sûr de vouloir supprimer cette trace utilisateur?" @closeDialog="deleteDialog = false" @validate="confirmDeletion()" />
  <TraceColumnsSelector v-if="columnDialog" :showDialog="columnDialog" @close-dialog="columnDialog = false" />
</div>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import TraceColumnsSelector from '../Dialog/TraceColumnsSelector.vue';
import DeleteConfirmation from '../Dialog/DeleteConfirmation.vue';

import { fullDateFormatter } from '../../../../utils/formatter.js';
import sort from '../../../../utils/sort';

import { computeGeoJSONFromTrace, computeGeoJSONFromTraces } from '../../../../utils/geojson.js';

import { deleteTrace } from '../../../../utils/api.js';

export default {
  components: { TraceColumnsSelector, DeleteConfirmation },
  props: {
    bioverId: Number,
  },
  data() {
    return {
      sortElement: '',
      orderElement: false,
      globalChecked: false,
      menuState: undefined,
      columnDialog: false,
      deleteDialog: false,
      traceToDelete: undefined,
      leaveTimeout: undefined,
      popupTimeout: undefined,
    }
  },
  computed: {
    getSortedData() {
      return sort.sort(this.getTraceByBioversAndUser(this.bioverId), this.sortElement, this.orderElement);
    },
    allAreUnselected() {
      return this.getSortedData.filter((trace) => trace.display).length === 0;
    },
    ...mapGetters('global', ['getCurrentTraceTabClick']),
    ...mapGetters('biovers', ['getTraceByBioversAndUser', 'getTraceColumnsPreference', 'ownOrPublic', 'bioverIsEditable', 'getCurrentBioverId']),
  },
  methods: {
    over(id) {
      clearTimeout(this.leaveTimeout);
      this.updateTraceOver(id);
    },
    leave() {
      this.leaveTimeout = setTimeout(() => {
        this.updateTraceOver(0);
      }, 300);
    },
    openPopup(id) {
      clearTimeout(this.leaveTimeout);
      this.popupTimeout = setTimeout(() => {
        this.addOrRemoveTraceClickElement(id);
        this.updateLastTraceClick(id);
      }, 300);
    },
    dateFormatter(date) {
      return fullDateFormatter(date);
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
        trace: selectedTrace,
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
    isAllowedToEdit() {
      return (this.ownOrPublic(this.getCurrentBioverId) === 'public' && !this.bioverIsEditable(this.getCurrentBioverId));
    },
    openDeletionDialog(trace) {
      if (this.isAllowedToEdit()) {
          return;
      }
      this.traceToDelete = trace;
      this.deleteDialog = true;
      this.menuState = undefined;
    },
    confirmDeletion() {
      this.traceToDelete ? this.traceDeletion(this.traceToDelete) : this.tracesDeletion();
      this.deleteDialog = false;
    },
    async tracesDeletion() {
      if (!this.globalChecked) return;
      const traces = this.getSortedData.filter((trace) => trace.display);
      for (let i = 0; i < traces.length; i++ ) {
        await deleteTrace(traces[i].element);
        this.removeTrace(traces[i].element);
      }
      this.globalCheckAnalizer();
    },
    async traceDeletion(trace) {
      await deleteTrace(trace.element);
      this.removeTrace(trace.element);
      this.menuState = undefined;
    },
    ...mapActions('global', ['updateTraceOver', 'addOrRemoveTraceClickElement', 'updateLastTraceClick']),
    ...mapActions('biovers', ['selectAllTraces', 'unselectAllTraces', 'updateTraceToDisplay', 'removeTrace']),
  },
};
</script>

<style scoped>
@import './table.css';
</style>