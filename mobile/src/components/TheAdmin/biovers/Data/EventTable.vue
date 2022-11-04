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
          <th v-if="getEventColumnsPreference.created_date" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">date_range</p>
              <p class="no-margin">CREER LE</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'creation_date' && !orderElement}" @click="setSort('creation_date')">arrow_drop_down</p>
            </div>
          </th>
           <th v-if="getEventColumnsPreference.author" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">architecture</p>
              <p class="no-margin">AUTHEUR</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'username' && !orderElement}" @click="setSort('username')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getEventColumnsPreference.gps_accuracy" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">crisis_alert</p>
              <p class="no-margin">PRECISION DU GPS</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'gps_accuracy' && !orderElement}" @click="setSort('gps_accuracy')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getEventColumnsPreference.coordinate" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">location_searching</p>
              <p class="no-margin">COORDONNEES</p>
            </div>
          </th>
          <th v-if="getEventColumnsPreference.data" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">database</p>
              <p class="no-margin">EVENT</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'data' && !orderElement}" @click="setSort('data')">arrow_drop_down</p>
            </div>
          </th>
          <th class="last-column last-column-header">
             <p class="material-symbols-sharp no-margin clickable dot-margin" @click="openMenu(0)">more_vert</p>
             <div v-if="menuState && menuState.id === 0 && menuState.state" class="menu">
                <p class="menu-element" :class="{'disable': !globalChecked }" @click="downloadEvents">Exporter les Events</p>
                <p class="menu-element" :class="{'disable': !globalChecked }" @click="openDeletionDialog()">Supprimer les évenements</p>
                <p class="menu-element" @click="openColumnSelector()">Définir les colonnes</p>
             </div>
             <div v-if="menuState" class="overlay" @click="menuState = undefined" />
          </th>
        </tr>
        <tr v-for="(event, index) in getSortedData" :key="index">
          <td class="first-column">
            <input type="checkbox" :checked="event.display" @click="selectElement(event)">
          </td>
          <td class="column">{{ event.element.id }}</td>
          <td v-if="getEventColumnsPreference.created_date" class="column">{{ dateFormatter(event.element.creation_date) }}</td>
          <td v-if="getEventColumnsPreference.author" class="column">{{ userFormatter(event.element.User) }}</td>
          <td v-if="getEventColumnsPreference.gps_accuracy" class="column">{{ event.element.gps_accuracy }}</td>    
          <td v-if="getEventColumnsPreference.coordinate" class="column">({{ getCoordinate(event) }})</td>
          <td v-if="getEventColumnsPreference.data" class="column">({{ event.element.data }})</td>
          <td class="last-column">
             <p class="material-symbols-sharp no-margin clickable dot-margin" @click="openMenu(event.element.id)">more_vert</p>
             <div v-if="menuState && menuState.id === event.element.id && menuState.state" class="menu">
                <p class="menu-element" @click="downloadEvent(event)">Exporter l'Event</p>
                <p class="menu-element" :class="{'disable': isAllowedToEdit() }"  @click="openDeletionDialog(event)">Supprimer l'évenement</p>
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

import { dateFormatter } from '../../../../utils/formatter.js';
import sort from '../../../../utils/sort';
import { computeGeoJSONFromEvent, computeGeoJSONFromEvents } from '../../../../utils/geojson.js';

import { deleteEvent } from '../../../../utils/api.js';

export default {
  components: { EventColumnsSelector, DeleteConfirmation },
  props: {
    bioverId: Number,
  },
  data() {
    return {
      globalChecked: true,
      sortElement: '',
      orderElement: false,
      menuState: undefined,
      columnDialog: false,
      deleteDialog: false,
      eventToDelete: undefined,
    }
  },
  methods: {
    dateFormatter(date) {
      return dateFormatter(date);
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
        this.selectAllEvents();
      } else {
        this.unselectAllEvents();
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
    openDeletionDialog(trace) {
      if (this.isAllowedToEdit()) {
          return;
      }
      this.eventToDelete = trace;
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
    ...mapActions('biovers', ['selectAllEvents', 'unselectAllEvents', 'updateEventToDisplay', 'removeEvent']),
  },
  computed: {
    getSortedData() {
      return sort.sort(this.getEventByBioversAndUser(this.bioverId), this.sortElement, this.orderElement);
    },
    allAreUnselected() {
      return this.getSortedData.filter((event) => event.display).length === 0;
    },
    ...mapGetters('biovers', ['getEventByBioversAndUser', 'getEventColumnsPreference', 'ownOrPublic', 'bioverIsEditable', 'getCurrentBioverId']),
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

.dot-margin {
  margin-top: 2px;
}
</style>