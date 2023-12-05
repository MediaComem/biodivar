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
          <th v-if="getPathColumnsPreference.created_date" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">event</p>
              <p class="no-margin column-title-font">{{ $t('Path.Column.date') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'creation_date' && !orderElement}" @click="setSort('creation_date')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.author" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">architecture</p>
              <p class="no-margin column-title-font">{{ $t('Path.Column.author') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'username' && !orderElement}" @click="setSort('username')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.coordinate" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">my_location</p>
              <p class="no-margin column-title-font">{{ $t('Path.Column.coordinate') }}</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.scope" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">visibility</p>
              <p class="no-margin column-title-font">{{ $t('Path.Column.visibility') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'visible_from' && !orderElement}" @click="setSort('visible_from')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.stroke_width" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">line_weight</p>
              <p class="no-margin column-title-font">{{ $t('Path.Column.style_stroke_width') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'style_stroke_width' && !orderElement}" @click="setSort('style_stroke_width')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.stroke_color" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">colorize</p>
              <p class="no-margin column-title-font">{{ $t('Path.Column.style_color') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'stroke_color' && !orderElement}" @click="setSort('stroke_color')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.stroke_opacity" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">opacity</p>
              <p class="no-margin column-title-font">{{ $t('Path.Column.style_stroke_opacity') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'stroke_opacity' && !orderElement}" @click="setSort('stroke_opacity')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.extrusion" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">expand</p>
              <p class="no-margin column-title-font">{{ $t('Path.Column.extrusion') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'extrusion' && !orderElement}" @click="setSort('extrusion')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.elevation" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">north</p>
              <p class="no-margin column-title-font">{{ $t('Path.Column.style_elevation') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'elevation' && !orderElement}" @click="setSort('elevation')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.animation" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">animation</p>
              <p class="no-margin column-title-font">{{ $t('Path.Column.animation') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'amplitude' && !orderElement}" @click="setSort('amplitude')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.metadata" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">database</p>
              <p class="no-margin column-title-font">{{ $t('Path.Column.metadata') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'metadata' && !orderElement}" @click="setSort('metadata')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.updated_date" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">edit</p>
              <p class="no-margin column-title-font">{{ $t('Path.Column.update_date') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'update_date' && !orderElement}" @click="setSort('update_date')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPathColumnsPreference.contributor" class="column">
            <div class="header-value">
               <p class="material-symbols-sharp text-margin">architecture</p>
              <p class="no-margin column-title-font">{{ $t('Path.Column.last_contributor') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'contributor' && !orderElement}" @click="setSort('contributor')">arrow_drop_down</p>
            </div>
          </th>
          <th class="last-column last-column-header">
             <p class="material-symbols-sharp no-margin clickable" @click="openMenu(0)">more_vert</p>
             <div v-if="menuState && menuState.id === 0 && menuState.state" class="menu">
                <div class="menu-element" @click="openColumnSelector()"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;" >reorder</p><p>Définir colonnes</p></div>
                <div class="menu-element" :class="{'disable': !globalChecked }" @click="copies()"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;" >file_copy</p><p>Copier les lignes</p></div>
                <div class="menu-element" :class="{'disable': !couldPaste }" @click="paste()"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;" >content_paste_go</p><p>Coller les lignes</p></div>
                <div class="menu-element" :class="{'disable': !globalChecked }" @click="downloadPaths"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;" >cloud_download</p><p>Exporter les lignes</p></div>
                <div class="menu-element" :class="{'disable': !globalChecked || isAllowedToEdit() }" @click="openDeletionDialog()"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;">delete_forever</p><p>Supprimer les lignes</p></div>
             </div>
             <div v-if="menuState" class="overlay" @click="menuState = undefined" />
          </th>
        </tr>
        <tr v-for="(path, index) in getSortedData" :key="index" class="table-border table-background">
          <td class="first-column">
            <input type="checkbox" :checked="path.display" @click="selectElement(path)">
          </td>
          <td class="column second-column column-max-width text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ path.element.id }}</td>
          <td v-if="getPathColumnsPreference.created_date" class="column column-max-width text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ dateFormatter(path.element.creation_date) }}</td>
          <td v-if="getPathColumnsPreference.author" class="column column-max-width text-font end-align row-height">{{ userFormatter(path.element.User) }}</td>
          <td v-if="getPathColumnsPreference.coordinate" class="column column-max-width before-last-column  text-font end-align row-height column-coordinate" style="font-variant-numeric: tabular-nums;">{{ getCoordinate(path.element.coordinate) }}</td>
          <td v-if="getPathColumnsPreference.scope" class="column column-max-width text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ path.element.scope }}&thinsp;m</td>
          <td v-if="getPathColumnsPreference.stroke_width" class="column column-max-width text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ path.element.style_stroke_width }}&thinsp;m</td>
          <td v-if="getPathColumnsPreference.stroke_color" class="column column-max-width text-font end-align row-height" style="text-transform: uppercase;">{{ path.element.stroke_color }}</td>
          <td v-if="getPathColumnsPreference.stroke_opacity" class="column column-max-width text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ path.element.stroke_opacity }}&thinsp;%</td>
          <td v-if="getPathColumnsPreference.extrusion" class="column column-max-width text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ path.element.extrusion }}&thinsp;m</td>
          <td v-if="getPathColumnsPreference.elevation" class="column column-max-width text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ path.element.elevation }}&thinsp;m</td>
          <td v-if="getPathColumnsPreference.animation" class="column column-max-width text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ path.element.amplitude }}</td>
          <td v-if="getPathColumnsPreference.metadata" class="column column-max-width text-font end-align row-height column-coordinate">{{ path.element.metadata }}</td>
          <td v-if="getPathColumnsPreference.updated_date" class="column column-max-width text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ dateFormatter(path.element.update_date) }}</td>
          <td v-if="getPathColumnsPreference.contributor" class="column column-max-width text-font end-align row-height">{{ userFormatter(path.element.last_contributor_fk) }}</td>
          <td class="last-column">
             <p class="material-symbols-sharp no-margin clickable" @click="openMenu(path.element.id)">more_vert</p>
             <div v-if="menuState && menuState.id === path.element.id && menuState.state" class="menu">
                <div class="menu-element" @click="copy(path)"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;" >file_copy</p><p>Copier la ligne</p></div>
                <div class="menu-element" :class="{'disable': isAllowedToEdit() }" @click="openEdition(path)"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;">timeline</p><p>Modifier la ligne</p></div>
                <div class="menu-element" @click="downloadPath(path)"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;" >cloud_download</p><p>Exporter la ligne</p></div>
                <div class="menu-element" :class="{'disable': isAllowedToEdit() }"  @click="openDeletionDialog(path)"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;" >delete_forever</p><p>Supprimer la ligne</p></div>
             </div>
             <div v-if="menuState" class="overlay" @click="menuState = undefined" />
          </td>
        </tr>
      </table>
    </div>
  </div>
  <DeleteConfirmation v-if="deleteDialog" :dialogVisible="deleteDialog" title="Êtes-vous sûr de vouloir supprimer ces chemins?" @closeDialog="deleteDialog = false" @validate="confirmDeletion()" />
  <PathColumnsSelector v-if="columnDialog" :showDialog="columnDialog" @close-dialog="columnDialog = false" />
  <ThePathEditor :path="pathToUpdate" :showDialog="showEditionDialog" @close-dialog="showEditionDialog = false" @close-after-save="showEditionDialog = false"/>
</div>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import PathColumnsSelector from '../Dialog/PathColumnsSelector.vue';
import DeleteConfirmation from '../Dialog/DeleteConfirmation.vue';
import ThePathEditor from '../Dialog/ThePathEditor.vue';
import SearchBar from '../../../app/UIElement/SearchBar.vue';

import { fullDateFormatter, coordinateFormatter } from '../../../../utils/formatter.js';
import { computeGeoJSONFromPATH, computeGeoJSONFromPATHs } from '../../../../utils/geojson.js';
import sort from '../../../../utils/sort';

import { useStore } from '../../../../composables/store.js';

import { savePath, deletePath } from '../../../../utils/api.js';

export default {
  components: { PathColumnsSelector, DeleteConfirmation, ThePathEditor, SearchBar },
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
      pathToUpdate: {},
      showEditionDialog: false,
      searchFilter: '',
    }
  },
  computed: {
    getData() {
      return this.getPathsByBiover(this.bioverId, this.searchFilter);
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
    ...mapGetters('biovers', ['getPathsByBiover', 'ownOrPublic', 'bioverIsEditable', 'getPathColumnsPreference', 'getCopyElement', 'getCurrentBioverId']),
  },
  methods: {
    dateFormatter(date) {
      return fullDateFormatter(date);
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
    isAllowedToEdit() {
      return (this.ownOrPublic(this.getCurrentBioverId) === 'public' && !this.bioverIsEditable(this.getCurrentBioverId));
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
        this.selectAllPaths(this.searchFilter);
      } else {
        this.unselectAllPaths(this.searchFilter);
      }
      this.globalCheckAnalizer();
    },
    openMenu(rowId) {
      this.menuState = {id: rowId, state: true};
    },
    openEdition(path) {
      if (this.isAllowedToEdit()) {
          return;
      }
      this.updateWait(true);
      this.pathToUpdate = { path: path.element };
      this.showEditionDialog = true;
      this.menuState = undefined;
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
      useStore().addPathInBiovers(newPath.data);
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
      if ((this.isAllowedToEdit() && path) || (!this.globalChecked && path === undefined)) {
          return;
      }
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
    updateSearch(event) {
      this.searchFilter = event;
      this.globalCheckAnalizer();
    },  
    ...mapActions('global', ['updateWait']),
    ...mapActions('biovers', ['updatePathToDisplay', 'selectAllPaths', 'unselectAllPaths', 'resetPathsModification', 'copyPath', 'addNewPath', 'removePath']),
  },
};
</script>

<style scoped>
@import './table.css';

.column-max-width {
  max-width: 250px;
  overflow-x: auto;
}

.column-coordinate {
  display: inline-block;
  padding-top: 5px;
  width: 250px;
}
</style>
