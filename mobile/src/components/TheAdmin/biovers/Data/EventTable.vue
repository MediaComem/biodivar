<template>
  <div class="table-layout">
    <div class="scrolling-table">
      <table>
        <tr class="tr-header">
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
          <th class="column">
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
           <th class="column">
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
          <th class="column">
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
          <th class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">location_searching</p>
              <p>COORDONNEES</p>
            </div>
          </th>
          <th class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">database</p>
              <p>Event</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'data' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('data')">
            </div>
          </th>
        </tr>
        <tr v-for="(event, index) in getSortedData" :key="index">
          <td class="column">{{ event.element.id }}</td>
          <td class="column">{{ dateFormatter(event.element.creation_date) }}</td>
          <td class="column">{{ userFormatter(event.element.User) }}</td>
          <td class="column">{{ event.element.gps_accuracy }}</td>    
          <td class="column">({{ getCoordinate(event) }})</td>
          <td class="column">({{ event.element.data }})</td>    
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { dateFormatter } from '../../../../utils/formatter.js';
import sort from '../../../../utils/sort';

export default {
  props: {
    bioverId: Number,
  },
  data() {
    return {
      sortElement: '',
      orderElement: false,
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
  },
  computed: {
    getSortedData() {
      return sort.sort(this.getEventByBiovers(this.bioverId), this.sortElement, this.orderElement);
    },
    ...mapGetters('biovers', ['getEventByBiovers']),
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