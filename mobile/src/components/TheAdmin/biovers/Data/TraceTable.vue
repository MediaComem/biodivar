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
              <p>Précision du GPS</p>
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
              <p class="material-symbols-sharp">location_searching</p>
              <p>COORDONNEES</p>
            </div>
          </th>
        </tr>
        <tr v-for="(trace, index) in getSortedData" :key="index">
          <td class="column">{{ trace.element.id }}</td>
          <td class="column">{{ userFormatter(trace.element.User) }}</td>
          <td class="column">{{ dateFormatter(trace.element.creation_date) }}</td>
          <td class="column">{{ trace.element.gps_accuracy }}</td>
          <td class="column">({{ getCoordinate(trace) }})</td>    
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
  computed: {
    getSortedData() {
      return sort.sort(this.getTraceByBiovers(this.bioverId), this.sortElement, this.orderElement);
    },
    ...mapGetters('biovers', ['getTraceByBiovers']),
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