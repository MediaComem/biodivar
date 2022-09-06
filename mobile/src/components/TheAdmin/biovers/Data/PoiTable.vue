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
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('id')">
            </div>
          </th>
          <th class="column">
            <div class="header-value">
              <p>COORDONNEES</p>
            </div>
          </th>
          <th class="column">
            <div class="header-value">
              <p>TITRE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'title' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
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
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('subtitle')">
            </div>
          </th>
          <th class="column">MEDIAS</th>
          <th class="column">
            <div class="header-value">
               <p class="material-symbols-sharp text-margin">track_changes</p>
              <p>RAYON</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'radius' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('radius')">
            </div>
          </th>
          <th class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">visibility</p>
              <p>VISIBILITE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'visible_from' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
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
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('creation_date')">
            </div>
          </th>
          <th class="column">
            <div class="header-value">
               <p class="material-symbols-sharp text-margin">architecture</p>
              <p>AUTEUR-E</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'username' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('username')">
            </div>
          </th>
          <th class="column before-last-column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">edit</p>
              <p>MODIFIER LE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'update_date' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('update_date')">
            </div>
          </th>
          <th class="last-column last-column-header">
             <p class="material-symbols-sharp no-margin">more_vert</p>
          </th>
        </tr>
        <tr v-for="(poi, index) in getSortedData" :key="index">
          <td class="first-column">
            <input type="checkbox" :checked="poi.display" @click="selectElement(poi)">
          </td>
          <td class="column second-column">{{ poi.element.id }}</td>
          <td class="column">({{ getCoordinate(poi) }})</td>
          <td class="column">{{ poi.element.title }}</td>
          <td class="column">{{ poi.element.subtitle }}</td>
          <td class="column">Media</td>
          <td class="column end-align">{{ poi.element.radius }} M</td>
          <td class="column end-align">{{ poi.element.visible_from }} M</td>
          <td class="column">{{ dateFormatter(poi.element.creation_date) }}</td>
          <td class="column">{{ userFormatter(poi.element.User) }}</td>
          <td class="column before-last-column">{{ dateFormatter(poi.element.update_date) }}</td>
          <td class="last-column">
             <p class="material-symbols-sharp no-margin">more_vert</p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { dateFormatter } from '../../../../utils/formatter.js';
import sort from '../../../../utils/sort';

export default {
  props: {
    bioverId: Number,
  },
  data() {
    return {
      globalChecked: true,
      showDialog: false,
      sortElement: '',
      orderElement: false,
    };
  },
  computed: {
    getData() {
      if (this.ownOrPublic(this.bioverId) === 'own') {
        return this.getPoisByBiover(this.bioverId);
      }
      return this.getPoisByBiover(this.bioverId).filter((e) => e.element.is_public);
    },
    getSortedData() {
      return sort.sort(this.getData, this.sortElement, this.orderElement);
    },
    allAreUnselected() {
      return this.getData.filter((poi) => poi.display).length === 0;
    },
    ...mapGetters('biovers', ['getPoisByBiover', 'ownOrPublic', 'bioverIsEditable']),
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
    selectElement(selectedPoi) {
      this.updatePoiToDisplay({
        bioverId: this.bioverId,
        poi: selectedPoi,
      });
      if (this.allAreUnselected) {
        this.globalChecked = false;
      } else {
        this.globalChecked = true;
      }
    },
    selectAll() {
      this.globalChecked = !this.globalChecked;
        if (this.globalChecked) {
          this.selectAllPois();
        } else {
          this.unselectAllPois();
        }
    },
    ...mapActions('biovers', ['updatePoiToDisplay', 'resetPoisModification', 'selectAllPois', 'unselectAllPois']),
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
</style>
