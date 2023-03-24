<template>
<div>
<div class="table-layout">
  <SearchBar @update="updateSearch" />
    <div class="scrolling-table">
      <table>
        <tr class="tr-header">
          <th class="first-column first-column-header">
            <input type="checkbox" :checked="globalChecked" @click="selectAll">
          </th>
          <th class="column second-column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin" style="padding-right: 0px">tag</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'id' && !orderElement}" @click="setSort('id')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getTraceColumnsPreference.created_date" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">date_range</p>
              <p class="no-margin column-title-font">{{ $t('Trace.Column.date') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'creation_date' && !orderElement}" @click="setSort('creation_date')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getTraceColumnsPreference.author" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">architecture</p>
              <p class="no-margin column-title-font">{{ $t('Trace.Column.author') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'username' && !orderElement}" @click="setSort('username')">arrow_drop_down</p>
            </div>
          </th>
           <th v-if="getTraceColumnsPreference.gps_accuracy" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">crisis_alert</p>
              <p class="no-margin column-title-font">{{ $t('Trace.Column.accuracy') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'gps_accuracy' && !orderElement}" @click="setSort('gps_accuracy')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getTraceColumnsPreference.coordinate" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">my_location</p>
              <p class="no-margin column-title-font">{{ $t('Trace.Column.coordinate') }}</p>
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
        <tr v-for="(trace, index) in getSortedData" :key="index" class="table-border table-background" :class="{'table-hover': getCurrentTraceTabClick.includes(trace.element.id)}" @mouseover="over(trace.element.id)" @mouseleave="leave" @click="openPopup(trace.element.id)">
          <td class="first-column">
            <input type="checkbox" :checked="trace.display" @click="selectElement(trace)">
          </td>
          <td class="column second-column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ trace.element.id }}</td>
          <td v-if="getTraceColumnsPreference.created_date" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ dateFormatter(trace.element.creation_date) }}</td>
          <td v-if="getTraceColumnsPreference.author" class="column text-font end-align row-height">{{ userFormatter(trace.element.User) }}</td>
          <td v-if="getTraceColumnsPreference.gps_accuracy" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ trace.element.gps_accuracy }}</td>
          <td v-if="getTraceColumnsPreference.coordinate" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">({{ getCoordinate(trace) }})</td>
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
import SearchBar from '../../../app/UIElement/SearchBar.vue';

import { fullDateFormatter } from '../../../../utils/formatter.js';
import sort from '../../../../utils/sort';

import { computeGeoJSONFromTrace, computeGeoJSONFromTraces } from '../../../../utils/geojson.js';

import { deleteTrace } from '../../../../utils/api.js';

export default {
  components: { TraceColumnsSelector, DeleteConfirmation, SearchBar },
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
      majPress: false,
      searchFilter: '',
    }
  },
  computed: {
    getSortedData() {
      return sort.sort(this.getTraceByBioversAndUser(this.bioverId, this.searchFilter), this.sortElement, this.orderElement);
    },
    allAreUnselected() {
      return this.getSortedData.filter((trace) => trace.display).length === 0;
    },
    ...mapGetters('global', ['getCurrentTraceTabClick', 'getcurrentLastTraceClick']),
    ...mapGetters('biovers', ['getTraceByBioversAndUser', 'getTraceColumnsPreference', 'ownOrPublic', 'bioverIsEditable', 'getCurrentBioverId']),
  },
  methods: {
    press(event) {
      if (event.key == 'Shift') {
        this.majPress = true;
      }
    },
    releaseKeybord() {
      this.majPress = false;
    },
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
      if (this.majPress) {
        const startingIndex = this.getSortedData.findIndex((trace) => trace.element.id === this.getcurrentLastTraceClick);
        const lastIndex = this.getSortedData.findIndex((trace) => trace.element.id === id);
        if (startingIndex < lastIndex) {
          this.addOrRemoveTracesClick(this.getSortedData.slice(startingIndex + 1, lastIndex + 1));
        } else {
          this.addOrRemoveTracesClick(this.getSortedData.slice(lastIndex, startingIndex));
        }
      } else {
        this.addOrRemoveTraceClickElement(id);
      }
      this.updateLastTraceClick(id);
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
        this.selectAllTraces(this.searchFilter);
      } else {
        this.unselectAllTraces(this.searchFilter);
      }
      this.globalCheckAnalizer();
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
      if ((this.isAllowedToEdit() && trace) || (!this.globalChecked && trace === undefined)) {
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
    updateSearch(event) {
      this.searchFilter = event;
      this.globalCheckAnalizer();
    },  
    ...mapActions('global', ['updateTraceOver', 'addOrRemoveTraceClickElement', 'updateLastTraceClick', 'addOrRemoveTracesClick']),
    ...mapActions('biovers', ['selectAllTraces', 'unselectAllTraces', 'updateTraceToDisplay', 'removeTrace']),
  },
  mounted() {
    addEventListener('keydown', this.press);
    addEventListener('keyup', this.releaseKeybord);
  },
  unmounted() {
    removeEventListener('keydown', this.press);
    removeEventListener('keyup', this.releaseKeybord);
  },
};
</script>

<style scoped>
@import './table.css';
</style>