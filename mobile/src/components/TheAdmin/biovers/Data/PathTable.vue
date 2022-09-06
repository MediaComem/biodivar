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
          <th class="column">
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
          <th class="column">
            <div class="header-value">
               <p class="material-symbols-sharp text-margin">architecture</p>
              <p>DERNIER CONTRIBUTEUR-TRICE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'contributor' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('contributor')">
            </div>
          </th>
          <th class="column">
            <div class="header-value">
              <p>STYLE ELEVATION</p>
            </div>
          </th>
          <th class="column">
            <div class="header-value">
              <p>STYLE ELEVATION GROUND</p>
            </div>
          </th>
          <th class="column">
            <div class="header-value">
              <p>STYLE NOISE</p>
            </div>
          </th>
          <th class="column">
            <div class="header-value">
              <p>STYLE STOKE WIDTH</p>
            </div>
          </th>
          <th class="column">
            <div class="header-value">
              <p>STYLE TYPE</p>
            </div>
          </th>
          <th class="column before-last-column">
            <div class="header-value">
              <p>COORDONNEES</p>
            </div>
          </th>
          <th class="last-column last-column-header">
             <p class="material-symbols-sharp no-margin">more_vert</p>
          </th>
        </tr>
        <tr v-for="(path, index) in getSortedData" :key="index">
          <td class="first-column">
            <input type="checkbox" :checked="path.display" @click="selectElement(path)">
          </td>
          <td class="column column-max-width second-column">{{ path.element.id }}</td>
          <td class="column column-max-width end-align">{{ path.element.visible_from }} M</td>
          <td class="column column-max-width">{{ dateFormatter(path.element.creation_date) }}</td>
          <td class="column column-max-width">{{ userFormatter(path.element.User) }}</td>
          <td class="column column-max-width">{{ dateFormatter(path.element.update_date) }}</td>
          <td class="column column-max-width">{{ userFormatter(path.element.last_contributor_fk) }}</td>
          <td class="column column-max-width end-align">{{ path.element.style_elevation }}</td>
          <td class="column column-max-width end-align">{{ path.element.style_elevation_ground }}</td>
          <td class="column column-max-width end-align">{{ path.element.style_noise }}</td>
          <td class="column column-max-width end-align">{{ path.element.style_stroke_width }}</td>
          <td class="column column-max-width">{{ path.element.style_type }}</td>
          <td class="column column-max-width before-last-column">{{ getCoordinate(path.element.coordinate) }}</td>
          <td class="last-column">
             <p class="material-symbols-sharp no-margin">more_vert</p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { dateFormatter, coordinateFormatter } from '../../../../utils/formatter.js';
import sort from '../../../../utils/sort';

export default {
  props: {
    bioverId: Number,
  },
  data() {
    return {
      globalChecked: true,
      sortElement: '',
      orderElement: false,
    }
  },
  computed: {
    getData() {
      if (this.ownOrPublic(this.bioverId) === 'own') {
        return this.getPathsByBiover(this.bioverId);
      }
      return this.getPathsByBiover(this.bioverId).filter((e) => e.element.is_public);
    },
    getSortedData() {
      return sort.sort(this.getData, this.sortElement, this.orderElement);
    },
    allAreUnselected() {
      return this.getData.filter((poi) => poi.display).length === 0;
    },
    ...mapGetters('biovers', ['getPathsByBiover', 'ownOrPublic', 'bioverIsEditable']),
  },
  methods: {
    dateFormatter(date) {
      return dateFormatter(date);
    },
    getCoordinate(coordinates) {
      return coordinateFormatter(coordinates);
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
    selectElement(selectedPath) {
      this.updatePathToDisplay({
        bioverId: this.bioverId,
        path: selectedPath,
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
        this.selectAllPaths();
      } else {
        this.unselectAllPaths();
      }
    },
    ...mapActions('biovers', ['updatePathToDisplay', 'selectAllPaths', 'unselectAllPaths', 'resetPathsModification']),
  },
};
</script>

<style scoped>
@import './table.css';

.material-symbols-sharp {
  font-size: 15px;
}

.column-max-width {
  max-width: 500px;
  overflow-x: auto;
}

.no-margin {
  margin: 0px;
}
</style>
