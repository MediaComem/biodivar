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
          <th v-if="getEventColumnsPreference.created_date" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">event</p>
              <p class="no-margin column-title-font">{{ $t('Event.Column.date') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'creation_date' && !orderElement}" @click="setSort('creation_date')">arrow_drop_down</p>
            </div>
          </th>
           <th v-if="getEventColumnsPreference.author" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">architecture</p>
              <p class="no-margin column-title-font">{{ $t('Event.Column.author') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'username' && !orderElement}" @click="setSort('username')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getEventColumnsPreference.gps_accuracy" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">crisis_alert</p>
              <p class="no-margin column-title-font">{{ $t('Event.Column.accuracy') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'gps_accuracy' && !orderElement}" @click="setSort('gps_accuracy')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getEventColumnsPreference.coordinate" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">my_location</p>
              <p class="no-margin column-title-font">{{ $t('Event.Column.coordinate') }}</p>
            </div>
          </th>
          <th v-if="getEventColumnsPreference.data" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">touch_app</p>
              <p class="no-margin column-title-font">{{ $t('Event.Column.action') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'data' && !orderElement}" @click="setSort('data')">arrow_drop_down</p>
            </div>
          </th>
          <th class="last-column last-column-header">
             <p class="material-symbols-sharp no-margin clickable dot-margin" @click="openMenu(0)">more_vert</p>
             <div v-if="menuState && menuState.id === 0 && menuState.state" class="menu">
                <div class="menu-element" @click="openColumnSelector()"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;">reorder</p><p>Définir colonnes</p></div>
                <div class="menu-element" :class="{'disable': !globalChecked }" @click="downloadEvents"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;">cloud_download</p><p>Exporter les actions</p></div>
                <div class="menu-element" :class="{'disable': !globalChecked }" @click="openDeletionDialog()"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;">delete_forever</p><p>Supprimer les actions</p></div>
             </div>
             <div v-if="menuState" class="overlay" @click="menuState = undefined" />
          </th>
        </tr>
        <tr v-for="(event, index) in getSortedData" :key="index" class="table-border table-background" :class="{'table-hover': getCurrentEventTabClick.includes(event.element.id)}" @mouseover="over(event.element.id)" @mouseleave="leave" @click="openPopup(event.element.id)">
          <td class="first-column">
            <input type="checkbox" :checked="event.display" @click="selectElement(event)">
          </td>
          <td class="column second-column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ event.element.id }}</td>
          <td v-if="getEventColumnsPreference.created_date" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ dateFormatter(event.element.creation_date) }}</td>
          <td v-if="getEventColumnsPreference.author" class="column text-font end-align row-height">{{ userFormatter(event.element.User) }}</td>
          <td v-if="getEventColumnsPreference.gps_accuracy" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ event.element.gps_accuracy }}</td>    
          <td v-if="getEventColumnsPreference.coordinate" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">({{ getCoordinate(event) }})</td>
          <td v-if="getEventColumnsPreference.data" class="column text-font end-align row-height">({{ event.element.data }})</td>
          <td class="last-column text-font ">
             <p class="material-symbols-sharp no-margin clickable dot-margin" @click="openMenu(event.element.id)">more_vert</p>
             <div v-if="menuState && menuState.id === event.element.id && menuState.state" class="menu">
                <div class="menu-element" @click="downloadEvent(event)"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;">cloud_download</p><p>Exporter l’action</p></div>
                <div class="menu-element" :class="{'disable': isAllowedToEdit() }" @click="openDeletionDialog(event)"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;">delete_forever</p><p>Supprimer l’action</p></div>
             </div>
             <div v-if="menuState" class="overlay" @click="menuState = undefined" />
          </td>    
        </tr>
      </table>
    </div>
  </div>
  <DeleteConfirmation v-if="deleteDialog" :dialogVisible="deleteDialog" title="Êtes-vous sûr de vouloir supprimer cette evenement utilisateur?" @closeDialog="deleteDialog = false" @validate="confirmDeletion()" />
  <EventColumnsSelector v-if="columnDialog" :showDialog="columnDialog" @close-dialog="columnDialog = false" />
</div>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import EventColumnsSelector from '../Dialog/EventColumnsSelector.vue';
import DeleteConfirmation from '../Dialog/DeleteConfirmation.vue';
import SearchBar from '../../../app/UIElement/SearchBar.vue';

import { fullDateFormatter } from '../../../../utils/formatter.js';
import sort from '../../../../utils/sort';
import { computeGeoJSONFromEvent, computeGeoJSONFromEvents } from '../../../../utils/geojson.js';

import { deleteEvent } from '../../../../utils/api.js';

export default {
  components: { EventColumnsSelector, DeleteConfirmation, SearchBar },
  props: {
    bioverId: Number,
  },
  data() {
    return {
      globalChecked: false,
      sortElement: '',
      orderElement: false,
      menuState: undefined,
      columnDialog: false,
      deleteDialog: false,
      eventToDelete: undefined,
      leaveTimeout: undefined,
      popupTimeout: undefined,
      majPress: false,
      searchFilter: '',
    }
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
      this.updateEventOver(id);
    },
    leave() {
      this.leaveTimeout = setTimeout(() => {
        this.updateEventOver(0);
      }, 300);
    },
    openPopup(id) {
      clearTimeout(this.leaveTimeout);
      if (this.majPress) {
        const startingIndex = this.getSortedData.findIndex((event) => event.element.id === this.getcurrentLastEventClick);
        const lastIndex = this.getSortedData.findIndex((event) => event.element.id === id);
        if (startingIndex < lastIndex) {
          this.addOrRemoveEventsClick(this.getSortedData.slice(startingIndex + 1, lastIndex + 1));
        } else {
          this.addOrRemoveEventsClick(this.getSortedData.slice(lastIndex, startingIndex));
        }
      } else {
        this.addOrRemoveEventClickElement(id);
      }
      this.updateLastEventClick(id);
    },
    dateFormatter(date) {
      return fullDateFormatter(date);
    },
    getCoordinate(event) {
      return event.element.coordinate ? `${event.element.coordinate.lat},${event.element.coordinate.long}` : '';
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
    selectElement(selectedEvent) {
      this.updateEventToDisplay({
        bioverId: this.bioverId,
        event: selectedEvent,
      });
      this.globalCheckAnalizer();
    },
    selectAll() {
      this.globalChecked = !this.globalChecked;
      if (this.globalChecked) {
        this.selectAllEvents(this.searchFilter);
      } else {
        this.unselectAllEvents(this.searchFilter);
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
      anchor.download = 'export_event.json';
      anchor.click();
    },
    downloadEvent(event) {
      this.download(computeGeoJSONFromEvent(event));
      this.menuState = undefined;
    },
    downloadEvents() {
      if (!this.globalChecked) return;
      this.download(computeGeoJSONFromEvents(this.getEventByBioversAndUser(this.bioverId)))
      this.menuState = undefined;
    },
    isAllowedToEdit() {
      return (this.ownOrPublic(this.getCurrentBioverId) === 'public' && !this.bioverIsEditable(this.getCurrentBioverId));
    },
    openDeletionDialog(event) {
      if ((this.isAllowedToEdit() && event) || (!this.globalChecked && event === undefined)) {
          return;
      }
      this.eventToDelete = event;
      this.deleteDialog = true;
      this.menuState = undefined;
    },
    confirmDeletion() {
      this.eventToDelete ? this.eventDeletion(this.eventToDelete) : this.eventsDeletion();
      this.deleteDialog = false;
    },
    async eventsDeletion() {
      if (!this.globalChecked) return;
      const events = this.getSortedData.filter((event) => event.display);
      for (let i = 0; i < events.length; i++ ) {
        await deleteEvent(events[i].element);
        this.removeEvent(events[i].element);
      }
      this.globalCheckAnalizer();
    },
    async eventDeletion(event) {
      await deleteEvent(event.element);
      this.removeEvent(event.element);
      this.menuState = undefined;
    },
    updateSearch(event) {
      this.searchFilter = event;
      this.globalCheckAnalizer();
    }, 
    ...mapActions('global', ['updateEventOver', 'addOrRemoveEventClickElement', 'addOrRemoveEventsClick', 'updateLastEventClick']),
    ...mapActions('biovers', ['selectAllEvents', 'unselectAllEvents', 'updateEventToDisplay', 'removeEvent']),
  },
  computed: {
    getSortedData() {
      return sort.sort(this.getEventByBioversAndUser(this.bioverId, this.searchFilter), this.sortElement, this.orderElement);
    },
    allAreUnselected() {
      return this.getSortedData.filter((event) => event.display).length === 0;
    },
    ...mapGetters('global', ['getCurrentEventTabClick', 'getcurrentLastEventClick']),
    ...mapGetters('biovers', ['getEventByBioversAndUser', 'getEventColumnsPreference', 'ownOrPublic', 'bioverIsEditable', 'getCurrentBioverId']),
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