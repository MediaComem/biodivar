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
          <th v-if="getPoiColumnsPreference.created_date" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">event</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.date') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'creation_date' && !orderElement}" @click="setSort('creation_date')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.author" class="column">
            <div class="header-value">
               <p class="material-symbols-sharp text-margin">architecture</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.author') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'username' && !orderElement}" @click="setSort('username')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.coordinate" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">my_location</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.coordinate') }}</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.title" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">short_text</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.title') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'title' && !orderElement}" @click="setSort('title')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.subtitle" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp description-transform text-margin">short_text</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.subtitle') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'subtitle' && !orderElement}" @click="setSort('subtitle')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.symbol_map_name" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">map</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.symbol_map_name') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'trigger_mode' && !orderElement}" @click="setSort('trigger_mode')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.scope" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">visibility</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.visibility') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'scope' && !orderElement}" @click="setSort('scope')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.style_type" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">circle</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.style_type') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'style_type' && !orderElement}" @click="setSort('style_type')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.elevation" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">north</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.style_elevation') }}</p> 
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'elevation' && !orderElement}" @click="setSort('elevation')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.extrusion" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">expand</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.extrusion') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'extrusion' && !orderElement}" @click="setSort('extrusion')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.radius" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">share_location</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.radius') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'radius' && !orderElement}" @click="setSort('radius')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.stroke_width" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">line_weight</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.style_stroke_width') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'style_stroke_width' && !orderElement}" @click="setSort('style_stroke_width')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.stroke_color" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">colorize</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.style_color') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'stroke_color' && !orderElement}" @click="setSort('stroke_color')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.stroke_opacity" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">opacity</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.style_stroke_opacity') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'stroke_opacity' && !orderElement}" @click="setSort('stroke_opacity')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.wireframe" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">grid_4x4</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.wireframe') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'wireframe' && !orderElement}" @click="setSort('wireframe')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.fill_color" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">colorize</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.fill_color') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'fill_color' && !orderElement}" @click="setSort('fill_color')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.fill_opacity" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">opacity</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.fill_opacity') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'fill_opacity' && !orderElement}" @click="setSort('fill_opacity')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.animation" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">animation</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.animation') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'amplitude' && !orderElement}" @click="setSort('amplitude')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.metadata" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">database</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.metadata') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'metadata' && !orderElement}" @click="setSort('metadata')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.updated_date" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">edit</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.update_date') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'update_date' && !orderElement}" @click="setSort('update_date')">arrow_drop_down</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.contributor" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">architecture</p>
              <p class="no-margin column-title-font">{{ $t('Poi.Column.last_contributor') }}</p>
              <p class="material-symbols-sharp icon-margin icon-font transition" :class="{'change-icon': sortElement === 'contributor' && !orderElement}" @click="setSort('contributor')">arrow_drop_down</p>
            </div>
          </th>
          <th class="last-column last-column-header">
             <p class="material-symbols-sharp no-margin clickable dot-margin" @click="openMenu(0)">more_vert</p>
             <div v-if="menuState && menuState.id === 0 && menuState.state" class="menu">
                <div class="menu-element" @click="openColumnSelector()"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;" >reorder</p><p>Définir colonnes</p></div>
                <div class="menu-element" :class="{'disable': !globalChecked }" @click="copies()"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;">file_copy</p><p>Copier les points</p></div>
                <div class="menu-element" :class="{'disable': couldPaste }" @click="paste()"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;">content_paste_go</p><p>Coller les points</p></div>
                <div class="menu-element" :class="{'disable': !globalChecked }" @click="downloadPois"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;">cloud_download</p><p style="margin: 0px;">Exporter les points</p></div>
                <div class="menu-element" :class="{'disable': !globalChecked }" @click="openDeletionDialog()"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;">wrong_location</p><p>Supprimer les points</p></div>
             </div>
             <div v-if="menuState" class="overlay" @click="menuState = undefined" />
          </th>
        </tr>
        <tr :ref="`poi-${poi.element.id}`" v-for="(poi, index) in getSortedData" :key="index" class="table-border table-background" :class="{'table-hover': getCurrentTabClick.includes(poi.element.id)}" @mouseover="over(poi.element.id)" @mouseleave="leave" @click="openPopup(poi.element.id)">
          <td class="first-column">
            <input type="checkbox" :checked="poi.display" @click="selectElement(poi)">
          </td>
          <td class="column second-column text-font end-align row-height">{{ poi.element.id }}</td>
          <td v-if="getPoiColumnsPreference.created_date" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ dateFormatter(poi.element.creation_date) }}</td>
          <td v-if="getPoiColumnsPreference.author" class="column text-font end-align row-height">{{ userFormatter(poi.element.User) }}</td>
          <td v-if="getPoiColumnsPreference.coordinate" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">({{ getCoordinate(poi) }})</td>
          <td v-if="getPoiColumnsPreference.title" class="column text-font end-align row-height">{{ poi.element.title }}</td>
          <td v-if="getPoiColumnsPreference.subtitle" class="column text-font end-align row-height">{{ poi.element.subtitle }}</td>
          <td v-if="getPoiColumnsPreference.symbol_map_name" class="column text-font end-align row-height">{{ poi.element.map_url.replace(/^.*[\\\/]/, '') }}</td>
          <td v-if="getPoiColumnsPreference.scope" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ poi.element.scope }}&thinsp;m</td>
          <td v-if="getPoiColumnsPreference.style_type" class="column text-font end-align row-height">{{ styleFormatter(poi.element.style_type) }}</td>
          <td v-if="getPoiColumnsPreference.elevation" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ poi.element.elevation }}&thinsp;m</td>
          <td v-if="getPoiColumnsPreference.extrusion" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ poi.element.extrusion }}&thinsp;m</td>
          <td v-if="getPoiColumnsPreference.radius" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ poi.element.radius }}&thinsp;m</td>
          <td v-if="getPoiColumnsPreference.stroke_width" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ poi.element.style_stroke_width }}&thinsp;m</td>
          <td v-if="getPoiColumnsPreference.stroke_color" class="column text-font end-align row-height" style="text-transform: uppercase;">{{ poi.element.stroke_color }}</td>
          <td v-if="getPoiColumnsPreference.stroke_opacity" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ poi.element.stroke_opacity }}&thinsp;%</td>
          <td v-if="getPoiColumnsPreference.wireframe" class="column text-font end-align row-height">{{ poi.element.wireframe ? $t('Poi.Column.true') : $t('Poi.Column.false') }}</td>
          <td v-if="getPoiColumnsPreference.fill_color" class="column text-font end-align row-height" style="text-transform: uppercase;">{{ poi.element.fill_color }}</td>
          <td v-if="getPoiColumnsPreference.fill_opacity" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ poi.element.fill_opacity }}&thinsp;%</td>
          <td v-if="getPoiColumnsPreference.animation" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ poi.element.amplitude }}</td>
          <td v-if="getPoiColumnsPreference.metadata" class="column text-font end-align row-height">{{ poi.element.metadata }}</td>
          <td v-if="getPoiColumnsPreference.updated_date" class="column text-font end-align row-height" style="font-variant-numeric: tabular-nums;">{{ dateFormatter(poi.element.update_date) }}</td>
          <td v-if="getPoiColumnsPreference.contributor" class="column text-font end-align row-height">{{ userFormatter(poi.element.last_contributor_fk) }}</td>
          <td class="last-column">
             <p class="material-symbols-sharp no-margin clickable dot-margin" @click="openMenu(poi.element.id)">more_vert</p>
             <div v-if="menuState && menuState.id === poi.element.id && menuState.state" class="menu">
                <div class="menu-element" @click="copy(poi)"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;" >file_copy</p><p>Copier le point</p></div>
                <div class="menu-element" :class="{'disable': isAllowedToEdit() }" @click="openEdition(poi)"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;">edit_location_alt</p><p>Modifier le point</p></div>
                <div class="menu-element" @click="downloadPoi(poi)"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;" >cloud_download</p><p>Exporter le point</p></div>
                <div class="menu-element" :class="{'disable': isAllowedToEdit() }"  @click="openDeletionDialog(poi)"><p class="material-symbols-sharp font-icon" style="padding-left: 0.5rem;padding-right: 0.5rem;" >wrong_location</p><p>Supprimer le point</p></div>
             </div>
             <div v-if="menuState" class="overlay" @click="menuState = undefined" />
          </td>
        </tr>
      </table>
    </div>
  </div>
  <DeleteConfirmation v-if="deleteDialog" :dialogVisible="deleteDialog" title="Êtes-vous sûr de vouloir supprimer ces point d'intérêts?" @closeDialog="deleteDialog = false" @validate="confirmDeletion()" />
  <PoiColumnsSelection v-if="columnDialog" :showDialog="columnDialog" @close-dialog="columnDialog = false"/>
  <ThePoiEditor :poi="poiToUpdate" :showDialog="showEditionDialog" @close-dialog="showEditionDialog = false" @close-after-save="showEditionDialog = false"/>
</div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import PoiColumnsSelection from '../Dialog/PoiColumnsSelection.vue';
import ThePoiEditor from '../Dialog/ThePoiEditor.vue';
import DeleteConfirmation from '../Dialog/DeleteConfirmation.vue';
import SearchBar from '../../../app/UIElement/SearchBar.vue';

import { fullDateFormatter } from '../../../../utils/formatter.js';
import sort from '../../../../utils/sort';
import { computeGeoJSONFromPOI, computeGeoJSONFromPOIs } from '../../../../utils/geojson.js';

import { useStore } from '../../../../composables/store.js';

import { savePoi, deletePoi } from '../../../../utils/api.js';

export default {
  components: { PoiColumnsSelection, DeleteConfirmation, ThePoiEditor, SearchBar },
  props: {
    bioverId: Number,
  },
  watch: {
    getCurrentTabClick: {
      handler(newVal) {
        if (this.clickOnThisView) {
          this.clickOnThisView = false;
        }  /*else {
          const rect = this.$refs[`poi-${newVal[newVal.length - 1]}`][0].getBoundingClientRect();
         window.scrollTo({
            left: 0,
            top: rect.top,
            behavior: "smooth",
          });
        }*/
      },
      deep: true,
    },
  },
  data() {
    return {
      globalChecked: true,
      showDialog: false,
      sortElement: '',
      orderElement: false,
      isSymbol: false,
      menuState: undefined,
      columnDialog: false,
      deleteDialog: false,
      showEditionDialog: false,
      poiToUpdate: {},
      leaveTimeout: undefined,
      clickOnThisView: false,
      popupTimeout: undefined,
      poiToDelete: undefined,
      majPress: false,
      searchFilter: '',
    };
  },
  computed: {
    getData() {
      return this.getPoisByBiover(this.bioverId, this.searchFilter);
    },
    getSortedData() {
      return sort.sort(this.getData, this.sortElement, this.orderElement, this.isSymbol);
    },
    allAreUnselected() {
      return this.getData.filter((poi) => poi.display).length === 0;
    },
    couldPaste() {
      const value = this.getCopyElement;
      if (value && value.type === 'POI') return false;
      return true;
    },
    ...mapGetters('global', ['getCurrentTabClick', 'getcurrentLastPoiClick']),
    ...mapGetters('biovers', ['getPoisByBiover', 'ownOrPublic', 'bioverIsEditable', 'getCopyElement', 'getPoiColumnsPreference', 'getCurrentBioverId']),
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
      this.updateOver(id);
    },
    leave() {
      this.leaveTimeout = setTimeout(() => {
        this.updateOver(0);
      }, 300);
    },
    openPopup(id) {
      this.clickOnThisView = true;
      clearTimeout(this.leaveTimeout);
      let newSelections = [];
      if (this.majPress) {
        const startingIndex = this.getSortedData.findIndex((poi) => poi.element.id === this.getcurrentLastPoiClick);
        const lastIndex = this.getSortedData.findIndex((poi) => poi.element.id === id);
        if (startingIndex < lastIndex) {
          newSelections = this.getSortedData.slice(startingIndex + 1, lastIndex + 1);
        } else {
          newSelections = this.getSortedData.slice(lastIndex, startingIndex);
        }
      }
      this.popupTimeout = setTimeout(() => {
        if (newSelections.length > 0) {
          this.addOrRemovePoisClick(newSelections);
        } else {
          this.addOrRemoveClickElement(id);
        }
        this.updateLastPoiClick(id);
      }, 300);
    },
    isAllowedToEdit() {
      return (this.ownOrPublic(this.getCurrentBioverId) === 'public' && !this.bioverIsEditable(this.getCurrentBioverId));
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
    styleFormatter(style) {
      switch(style) {
        case 'circle': return 'Cercle';
        case 'sphere': return 'Sphère';
        case 'hemisphere': return 'Demi-sphère';
      }
    },
    globalCheckAnalizer() {
      if (this.allAreUnselected) {
        this.globalChecked = false;
      } else {
        this.globalChecked = true;
      }
    },
    setSort(value, isSymbol = false) {
      this.isSymbol = isSymbol;
      if (this.sortElement === value) {
        this.orderElement = !this.orderElement;
      } else {
        this.orderElement = false;
      }
      this.sortElement = value;
    },
    selectElement(selectedPoi) {
      setTimeout(() => {
        clearInterval(this.popupTimeout);
        this.popupTimeout = undefined;
      }, 150)
      this.updatePoiToDisplay({
        bioverId: this.bioverId,
        poi: selectedPoi,
      });
      this.globalCheckAnalizer();
    },
    selectAll() {
      this.globalChecked = !this.globalChecked;
      if (this.globalChecked) {
        this.selectAllPois(this.searchFilter);
      } else {
        this.unselectAllPois(this.searchFilter);
      }
      this.globalCheckAnalizer();
    },
    openMenu(rowId) {
      setTimeout(() => {
        clearInterval(this.popupTimeout);
        this.popupTimeout = undefined;
      }, 150)
      this.menuState = {id: rowId, state: true};
    },
    download(file) {
      const anchor = document.createElement('a');
      anchor.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(file);
      anchor.target = '_blank';
      anchor.download = 'export_poi.json';
      anchor.click();
    },
    downloadPoi(poi) {
      this.download(computeGeoJSONFromPOI(poi));
      this.menuState = undefined;
    },
    downloadPois() {
      if (!this.globalChecked) return;
      this.download(computeGeoJSONFromPOIs(this.getPoisByBiover(this.bioverId)))
      this.menuState = undefined;
    },
    async setupCopyPoi(poi) {
      poi.biovers = this.bioverId;
      if (poi.coordinate) {
        delete poi.coordinate.id;
        delete poi.coordinate.poi_id;
      }
      if (poi.media && poi.media.length > 0) {
        for (let i = 0; i < poi.media.length; i++) {
          delete poi.media[i].id;
          delete poi.media[i].poi_id;
          if (poi.media[i].position) {
            delete poi.media[i].position.id;
          }
          if (!poi.media[i].metadata) {
            poi.media[i].metadata = [];
          } else {
            poi.media[i].metadata = JSON.parse(poi.media[i].metadata);
          }
        }
      }
      if (poi.position == null) {
        poi.position = undefined;
      } else {
        delete poi.position.id;
        delete poi.position.poi_id;
      }
      if (!poi.metadata) {
        poi.metadata = [];
      } else {
        poi.metadata = (JSON.parse(poi.metadata));
      }
      delete poi.id;
      const newPoi = await savePoi(poi);
      this.addNewPoi(newPoi.data);
      useStore().addPoiInBiovers(newPoi.data);
    },
    copy(poi) {
      this.copyPoi(poi);
      this.menuState = undefined;
    },
    copies() {
      if (!this.globalChecked) return;
      const pois = this.getData.filter((poi) => poi.display);
      this.copyPoi(pois);
      this.menuState = undefined;
    },
    async paste() {
      if (this.couldPaste) return;
      if (Array.isArray(this.getCopyElement.element)) {
        const pois = this.getCopyElement.element;
        for (let i = 0; i < pois.length; i++ ) {
          const poi = JSON.parse(JSON.stringify(pois[i].element));
          await this.setupCopyPoi(poi);
        };
      } else {
        const poi = JSON.parse(JSON.stringify(this.getCopyElement.element.element));
        await this.setupCopyPoi(poi);
      }
      this.menuState = undefined;
      this.globalCheckAnalizer();
    },
    openEdition(poi) {
      if (this.isAllowedToEdit()) {
          return;
      }
      this.updateWait(true);
      this.poiToUpdate = { poi: poi.element };
      this.showEditionDialog = true;
      this.menuState = undefined;
    },
    openDeletionDialog(poi) {
      if ((this.isAllowedToEdit() && poi) || (!this.globalChecked && poi === undefined)) {
          return;
      }
      this.poiToDelete = poi;
      this.deleteDialog = true;
      this.menuState = undefined;
    },
    confirmDeletion() {
      this.poiToDelete ? this.poiDeletion(this.poiToDelete) : this.poisDeletion();
      this.deleteDialog = false;
    },
    async poisDeletion() {
      if (!this.globalChecked) return;
      const pois = this.getData.filter((poi) => poi.display);
      for (let i = 0; i < pois.length; i++ ) {
        await deletePoi(pois[i].element);
        this.removePoi(pois[i].element);
      }
      this.globalCheckAnalizer();
    },
    async poiDeletion(poi) {
      await deletePoi(poi.element);
      this.removePoi(poi.element);
      this.menuState = undefined;
    },
    openColumnSelector() {
      this.columnDialog = true;
      this.menuState = undefined;
    },
    updateSearch(event) {
      this.searchFilter = event;
      this.globalCheckAnalizer();
    },  
    ...mapActions('global', ['updateWait', 'updateOver', 'addOrRemoveClickElement', 'updateLastPoiClick', 'addOrRemovePoisClick']),
    ...mapActions('biovers', ['updatePoiToDisplay', 'resetPoisModification', 'selectAllPois', 'unselectAllPois', 'copyPoi', 'addNewPoi', 'removePoi']),
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
