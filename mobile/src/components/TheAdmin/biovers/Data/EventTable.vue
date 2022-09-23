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
              <p>#</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'id' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('id')">
            </div>
          </th>
          <th v-if="getEventColumnsPreference.created_date" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">date_range</p>
              <p>CREER LE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'creation_date' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('creation_date')">
            </div>
          </th>
           <th v-if="getEventColumnsPreference.author" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">architecture</p>
              <p>AUTHEUR</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'subtitle' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('subtitle')">
            </div>
          </th>
          <th v-if="getEventColumnsPreference.gps_accuracy" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">crisis_alert</p>
              <p>PRECISION DU GPS</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'gps_accuracy' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('gps_accuracy')">
            </div>
          </th>
          <th v-if="getEventColumnsPreference.coordinate" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">location_searching</p>
              <p>COORDONNEES</p>
            </div>
          </th>
          <th v-if="getEventColumnsPreference.data" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">database</p>
              <p>EVENT</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'data' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('data')">
            </div>
          </th>
          <th class="last-column last-column-header">
             <p class="material-symbols-sharp no-margin clickable" @click="openMenu(0)">more_vert</p>
             <div v-if="menuState && menuState.id === 0 && menuState.state" class="menu">
                <p class="menu-element" :class="{'disable': !globalChecked }" @click="downloadEvents">Exporter les Events</p>
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
             <p class="material-symbols-sharp no-margin clickable" @click="openMenu(event.element.id)">more_vert</p>
             <div v-if="menuState && menuState.id === event.element.id && menuState.state" class="menu">
                <p class="menu-element" @click="downloadEvent(event)">Exporter l'Event</p>
             </div>
             <div v-if="menuState" class="overlay" @click="menuState = undefined" />
          </td>    
        </tr>
      </table>
    </div>
  </div>
  <EventColumnsSelector v-if="columnDialog" :showDialog="columnDialog" @close-dialog="columnDialog = false" />
</div>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import EventColumnsSelector from '../Dialog/EventColumnsSelector.vue';

import { dateFormatter } from '../../../../utils/formatter.js';
import sort from '../../../../utils/sort';
import { computeGeoJSONFromEvent, computeGeoJSONFromEvents } from '../../../../utils/geojson.js';


export default {
  components: { EventColumnsSelector },
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
      this.download(computeGeoJSONFromEvents(this.getEventByBiovers(this.bioverId)))
      this.menuState = undefined;
    },
    ...mapActions('biovers', ['selectAllEvents', 'unselectAllEvents', 'updateEventToDisplay']),
  },
  computed: {
    getSortedData() {
      return sort.sort(this.getEventByBiovers(this.bioverId), this.sortElement, this.orderElement);
    },
    allAreUnselected() {
      return this.getSortedData.filter((event) => event.display).length === 0;
    },
    ...mapGetters('biovers', ['getEventByBiovers', 'getEventColumnsPreference']),
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
}
</style>