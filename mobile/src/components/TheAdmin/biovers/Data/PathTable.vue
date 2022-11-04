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
          <th v-if="getPathColumnsPreference.scope" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">visibility</p>
              <p class="no-margin">VISIBILITE</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'visible_from' && !orderElement}" @click="setSort('visible_from')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.created_date" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">date_range</p>
              <p class="no-margin">CREER LE</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'creation_date' && !orderElement}" @click="setSort('creation_date')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.author" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">architecture</p>
              <p class="no-margin">AUTEUR-E</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'username' && !orderElement}" @click="setSort('username')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.updated_date" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">edit</p>
              <p class="no-margin">MODIFIER LE</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'update_date' && !orderElement}" @click="setSort('update_date')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.contributor" class="column">
            <div class="header-value">
               <p class="material-symbols-sharp text-margin">architecture</p>
              <p class="no-margin">DERNIER CONTRIBUTEUR-TRICE</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'contributor' && !orderElement}" @click="setSort('contributor')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.elevation" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">north</p>
              <p class="no-margin">STYLE ELEVATION</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.animation" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">animation</p>
              <p class="no-margin">ANIMATION</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.stroke_width" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">line_weight</p>
              <p class="no-margin">STYLE STOKE WIDTH</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.style_type" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">circle</p>
              <p class="no-margin">STYLE TYPE</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.coordinate" class="column before-last-column">
            <div class="header-value">
              <p class="material-symbols-sharp">location_searching</p>
              <p class="no-margin">COORDONNEES</p>
            </div>
          </th>
          <th class="last-column last-column-header">
             <p class="material-symbols-sharp no-margin clickable" @click="openMenu(0)">more_vert</p>
             <div v-if="menuState && menuState.id === 0 && menuState.state" class="menu">
                <p class="menu-element" :class="{'disable': !globalChecked }" @click="downloadPaths">Exporter les PATHs</p>
                <p class="menu-element" :class="{'disable': !globalChecked }" @click="copies()">Copier les PATHs</p>
                <p class="menu-element" :class="{'disable': couldPaste }" @click="paste()">Coller les PATHs</p>
                <p class="menu-element" :class="{'disable': !globalChecked }" @click="openDeletionDialog()">Supprimer les PATHs</p>
                <p class="menu-element" @click="openColumnSelector()">Définir les colonnes</p>
             </div>
             <div v-if="menuState" class="overlay" @click="menuState = undefined" />
          </th>
        </tr>
        <tr v-for="(path, index) in getSortedData" :key="index" class="table-background">
          <td class="first-column">
            <input type="checkbox" :checked="path.display" @click="selectElement(path)">
          </td>
          <td class="column column-max-width second-column">{{ path.element.id }}</td>
          <td v-if="getPathColumnsPreference.scope" class="column column-max-width end-align">{{ path.element.scope }} M</td>
          <td v-if="getPathColumnsPreference.created_date" class="column column-max-width">{{ dateFormatter(path.element.creation_date) }}</td>
          <td v-if="getPathColumnsPreference.author" class="column column-max-width">{{ userFormatter(path.element.User) }}</td>
          <td v-if="getPathColumnsPreference.updated_date" class="column column-max-width">{{ dateFormatter(path.element.update_date) }}</td>
          <td v-if="getPathColumnsPreference.contributor" class="column column-max-width">{{ userFormatter(path.element.last_contributor_fk) }}</td>
          <td v-if="getPathColumnsPreference.elevation" class="column column-max-width end-align">{{ path.element.style_elevation }}</td>
          <td v-if="getPathColumnsPreference.animation" class="column column-max-width end-align">{{ path.element.amplitude }}</td>
          <td v-if="getPathColumnsPreference.stroke_width" class="column column-max-width end-align">{{ path.element.style_stroke_width }}</td>
          <td v-if="getPathColumnsPreference.style_type" class="column column-max-width">{{ path.element.style_type }}</td>
          <td v-if="getPathColumnsPreference.coordinate" class="column column-max-width before-last-column">{{ getCoordinate(path.element.coordinate) }}</td>
          <td class="last-column">
             <p class="material-symbols-sharp no-margin clickable" @click="openMenu(path.element.id)">more_vert</p>
             <div v-if="menuState && menuState.id === path.element.id && menuState.state" class="menu">
                <p class="menu-element" @click="downloadPath(path)">Exporter le PATH</p>
                <p class="menu-element" @click="copy(path)">Copier le PATH</p>
                <p class="menu-element" @click="openDeletionDialog(path)">Supprimer le PATH</p>
             </div>
             <div v-if="menuState" class="overlay" @click="menuState = undefined" />
          </td>
        </tr>
      </table>
    </div>
  </div>
  <DeleteConfirmation v-if="deleteDialog" :dialogVisible="deleteDialog" title="Êtes-vous sûr de vouloir supprimer ces chemins?" @closeDialog="deleteDialog = false" @validate="confirmDeletion()" />
  <PathColumnsSelector v-if="columnDialog" :showDialog="columnDialog" @close-dialog="columnDialog = false" />
</div>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import PathColumnsSelector from '../Dialog/PathColumnsSelector.vue';
import DeleteConfirmation from '../Dialog/DeleteConfirmation.vue';

import { dateFormatter, coordinateFormatter } from '../../../../utils/formatter.js';
import { computeGeoJSONFromPATH, computeGeoJSONFromPATHs } from '../../../../utils/geojson.js';
import sort from '../../../../utils/sort';

import { savePath, deletePath } from '../../../../utils/api.js';

export default {
  components: { PathColumnsSelector, DeleteConfirmation },
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
      pathToDelete: undefined,
    }
  },
  computed: {
    getData() {
      return this.getPathsByBiover(this.bioverId);
    },
    getSortedData() {
      return sort.sort(this.getData, this.sortElement, this.orderElement);
    },
    allAreUnselected() {
      return this.getData.filter((poi) => poi.display).length === 0;
    },
    couldPaste() {
      const value = this.getCopyElement;
      if (value && value.type === 'PATH') return false;
      return true;
    },
    ...mapGetters('biovers', ['getPathsByBiover', 'ownOrPublic', 'bioverIsEditable', 'getPathColumnsPreference', 'getCopyElement']),
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
    globalCheckAnalizer() {
      if (this.allAreUnselected) {
        this.globalChecked = false;
      } else {
        this.globalChecked = true;
      }
    },
    selectElement(selectedPath) {
      this.updatePathToDisplay({
        bioverId: this.bioverId,
        path: selectedPath,
      });
      this.globalCheckAnalizer();
    },
    selectAll() {
      this.globalChecked = !this.globalChecked;
      if (this.globalChecked) {
        this.selectAllPaths();
      } else {
        this.unselectAllPaths();
      }
    },
    openMenu(rowId) {
      this.menuState = {id: rowId, state: true};
    },
    openColumnSelector() {
      this.columnDialog = true;
      this.menuState = undefined;
    },
    async setupCopyPath(path) {
      path.biovers = this.bioverId;
      if (path.coordinate) {
        for (let i = 0; i < path.coordinate.length; i++){
          delete path.coordinate[i].id;
          delete path.coordinate[i].path_id;
        }
      }
      delete path.id;
      const newPath = await savePath(path);
      this.addNewPath(newPath.data);
    },
    download(file) {
      const anchor = document.createElement('a');
      anchor.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(file);
      anchor.target = '_blank';
      anchor.download = 'export_path.json';
      anchor.click();
    },
    downloadPath(path) {
      this.download(computeGeoJSONFromPATH(path));
      this.menuState = undefined;
    },
    downloadPaths() {
      if (!this.globalChecked) return;
      this.download(computeGeoJSONFromPATHs(this.getPathsByBiover(this.bioverId)))
      this.menuState = undefined;
    },
    copy(path) {
      this.copyPath(path);
      this.menuState = undefined;
    },
    copies() {
      if (!this.globalChecked) return;
      const paths = this.getData.filter((path) => path.display);
      this.copyPath(paths);
      this.menuState = undefined;
    },
    async paste() {
      if (this.couldPaste) return;
      if (Array.isArray(this.getCopyElement.element)) {
        const paths = this.getCopyElement.element;
        for (let i = 0; i < paths.length; i++ ) {
          const path = JSON.parse(JSON.stringify(paths[i].element));
          await this.setupCopyPath(path);
        };
      } else {
        const path = JSON.parse(JSON.stringify(this.getCopyElement.element.element));
        await this.setupCopyPath(path);
      }
      this.menuState = undefined;
      this.globalCheckAnalizer();
    },
    openDeletionDialog(path) {
      this.pathToDelete = path;
      this.deleteDialog = true;
      this.menuState = undefined;
    },
    confirmDeletion() {
      this.pathToDelete ? this.pathDeletion(this.pathToDelete) : this.pathsDeletion();
      this.deleteDialog = false;
    },
    async pathDeletion(path) {
      await deletePath(path.element);
      this.removePath(path.element);
      this.menuState = undefined;
    },
    async pathsDeletion() {
      if (!this.globalChecked) return;
      const paths = this.getData.filter((path) => path.display);
      for (let i = 0; i < paths.length; i++ ) {
        await deletePath(paths[i].element);
        this.removePath(paths[i].element);
      }
      this.deleteDialog = false;
      this.globalCheckAnalizer();
    },
    ...mapActions('biovers', ['updatePathToDisplay', 'selectAllPaths', 'unselectAllPaths', 'resetPathsModification', 'copyPath', 'addNewPath', 'removePath']),
  },
};
</script>

<style scoped>
@import './table.css';

.column-max-width {
  max-width: 500px;
  overflow-x: auto;
}
</style>
