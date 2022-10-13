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
          <th v-if="getPoiColumnsPreference.coordinate" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">location_searching</p>
              <p>COORDONNEES</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.title" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">short_text</p>
              <p>TITRE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'title' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('title')">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.subtitle" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp description-transform text-margin">short_text</p>
              <p>SOUS-TITRE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'subtitle' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('subtitle')">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.created_date" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">date_range</p>
              <p>CREER LE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'creation_date' && !isSymbol && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('creation_date')">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.author" class="column">
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
          <th v-if="getPoiColumnsPreference.updated_date" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">edit</p>
              <p>MODIFIER LE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'update_date' && !isSymbol && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('update_date')">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.contributor" class="column">
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
          <th v-if="getPoiColumnsPreference.scope" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">visibility</p>
              <p>PORTEE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'scope' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('scope')">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.trigger" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">touch_app</p>
              <p>DECLENCHEUR</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'trigger_mode' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('trigger_mode')">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.ar_file_name" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">location_on</p>
              <p>AR FILE NAME</p>
            </div>
          </th>
           <th v-if="getPoiColumnsPreference.ar_visibility" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">visibility</p>
              <p>VISIBILITE AR</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'is_visible_ar' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('is_visible_ar', true)">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.ar_is_facing" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">camera_front</p>
              <p>FACE A LA CAMERA</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'is_facing_user' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort"
                @click="setSort('is_facing_user', true)">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.symbol_wireframe" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">grid_4x4</p>
              <p>WIREFRAME DU SYMBOLE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'wireframe' && isSymbol && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('wireframe', true)">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.autoplay" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">replay</p>
              <p>LECTURE AUTOMATIQUE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'autoplay' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('autoplay', true)">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.loop" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">replay</p>
              <p>LECTURE EN BOUCLER</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'loop' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('loop', true)">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.scale" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">photo_size_select_small</p>
              <p>ECHELLE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'scale' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('scale', true)">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.symbol_position" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">merge</p>
              <p>POSITION DU SYMBOL</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.symbol_animation" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">animation</p>
              <p>ANIMATION</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'amplitude' && isSymbol && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('amplitude', true)">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.audio_file" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">music_note</p>
              <p>AUDIO FILE NAME</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.audio_autoplay" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">replay</p>
              <p>AUDIO LECTURE AUTOMATIQUE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'audio_autoplay' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('audio_autoplay', true)">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.audio_loop" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">replay</p>
              <p>AUDIO LECTURE EN BOUCLER</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'audio_loop' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('audio_loop', true)">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.audio_scope" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">visibility</p>
              <p>PORTEE DE L'AUDIO</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'audio_distance' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('audio_distance', true)">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.icon_file" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">map</p>
              <p>ICON FILE NAME</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.is_visible" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">visibility</p>
              <p>IS VISIBLE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'is_visible' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('is_visible', true)">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.symbol_created_date" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">date_range</p>
              <p>SYMBOL CREATION DATE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'creation_date' && isSymbol && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('creation_date', true)">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.symbol_updated_date" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">edit</p>
              <p>SYMBOL MODITION DATE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'update_date' && isSymbol && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('update_date', true)">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.style_type" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">circle</p>
              <p>TYPE DE FORME</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'style_type' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('style_type')">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.extrusion" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">expand</p>
              <p>EXTRUSION</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'extrusion' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('extrusion')">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.radius" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">share_location</p>
              <p>RAYON</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'radius' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('radius')">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.position" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">merge</p>
              <p>POSITION</p>
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.stroke_width" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">line_weight</p>
              <p>EPAISSEUR DU CONTOUR</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'style_stroke_width' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('style_stroke_width')">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.stroke_color" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">colorize</p>
              <p>COULEUR DU CONTOUR</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'stroke_color' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('stroke_color')">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.stroke_opacity" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">opacity</p>
              <p>OPACITE DU CONTOUR</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'stroke_opacity' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('stroke_opacity')">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.wireframe" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">grid_4x4</p>
              <p>WIREFRAME DU REMPLISSAGE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'wireframe' && !isSymbol && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('wireframe')">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.fill_color" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">colorize</p>
              <p>COULEUR DU REMPLISSAGE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'fill_color' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('fill_color')">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.fill_opacity" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">opacity</p>
              <p>OPACITE DU REMPLISSAGE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'fill_opacity' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('fill_opacity')">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.animation" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">animation</p>
              <p>ANIMATION</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'amplitude' && !isSymbol && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('amplitude')">
            </div>
          </th>
          <th v-if="getPoiColumnsPreference.metadata" class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">database</p>
              <p>METADATA</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'metadata' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('metadata')">
            </div>
          </th>
          <th class="last-column last-column-header">
             <p class="material-symbols-sharp no-margin clickable" @click="openMenu(0)">more_vert</p>
             <div v-if="menuState && menuState.id === 0 && menuState.state" class="menu">
                <p class="menu-element" :class="{'disable': !globalChecked }" @click="downloadPois">Exporter les POIs</p>
                <p class="menu-element" :class="{'disable': !globalChecked }" @click="copies()">Copier les POIs</p>
                <p class="menu-element" :class="{'disable': couldPaste }" @click="paste()">Coller le POI</p>
                <p class="menu-element" :class="{'disable': !globalChecked }" @click="openDeletionDialog()">Supprimer les POIs</p>
                <p class="menu-element" @click="openColumnSelector()">Définir les colonnes</p>
             </div>
             <div v-if="menuState" class="overlay" @click="menuState = undefined" />
          </th>
        </tr>
        <tr v-for="(poi, index) in getSortedData" :key="index">
          <td class="first-column">
            <input type="checkbox" :checked="poi.display" @click="selectElement(poi)">
          </td>
          <td class="column second-column">{{ poi.element.id }}</td>
          <td v-if="getPoiColumnsPreference.coordinate" class="column">({{ getCoordinate(poi) }})</td>
          <td v-if="getPoiColumnsPreference.title" class="column">{{ poi.element.title }}</td>
          <td v-if="getPoiColumnsPreference.subtitle" class="column">{{ poi.element.subtitle }}</td>
          <td v-if="getPoiColumnsPreference.created_date" class="column">{{ dateFormatter(poi.element.creation_date) }}</td>
          <td v-if="getPoiColumnsPreference.author" class="column">{{ userFormatter(poi.element.User) }}</td>
          <td v-if="getPoiColumnsPreference.updated_date" class="column">{{ dateFormatter(poi.element.update_date) }}</td>
          <td v-if="getPoiColumnsPreference.contributor" class="column">{{ userFormatter(poi.element.last_contributor_fk) }}</td>
          <td v-if="getPoiColumnsPreference.scope" class="column end-align">{{ poi.element.scope }} M</td>
          <td v-if="getPoiColumnsPreference.trigger" class="column">{{ poi.element.trigger_mode }}</td>
          <td v-if="getPoiColumnsPreference.ar_file_name" class="column">{{ getARFileName(poi.element.symbol) }}</td>
          <td v-if="getPoiColumnsPreference.ar_visibility" class="column">{{ poi.element.symbol ? poi.element.symbol.is_visible_ar : undefined }}</td>
          <td v-if="getPoiColumnsPreference.ar_is_facing" class="column">{{ poi.element.symbol ? poi.element.symbol.is_facing_user : undefined }}</td>
          <td v-if="getPoiColumnsPreference.symbol_wireframe" class="column">{{ poi.element.symbol ? poi.element.symbol.wireframe : undefined }}</td>
          <td v-if="getPoiColumnsPreference.autoplay" class="column">{{ poi.element.symbol ? poi.element.symbol.autoplay : undefined }}</td>
          <td v-if="getPoiColumnsPreference.loop" class="column">{{ poi.element.symbol ? poi.element.symbol.loop : undefined }}</td>
          <td v-if="getPoiColumnsPreference.scale" class="column">{{ poi.element.symbol ? poi.element.symbol.scale : undefined }}</td>
          <td v-if="getPoiColumnsPreference.symbol_position" class="column">{{ positionFormatter(poi.element.symbol) }}</td>
          <td v-if="getPoiColumnsPreference.symbol_animation" class="column">{{ poi.element.symbol? poi.element.symbol.amplitude : undefined }}</td>
          <td v-if="getPoiColumnsPreference.audio_file" class="column">{{ getAudioFileName(poi.element.symbol)  }}</td>
          <td v-if="getPoiColumnsPreference.audio_autoplay" class="column">{{ poi.element.symbol ? poi.element.symbol.audio_autoplay  : undefined}}</td>
          <td v-if="getPoiColumnsPreference.audio_loop" class="column">{{ poi.element.symbol ? poi.element.symbol.audio_loop : undefined }}</td>
          <td v-if="getPoiColumnsPreference.audio_scope" class="column">{{ poi.element.symbol ? poi.element.symbol.audio_distance :undefined }}</td>
          <td v-if="getPoiColumnsPreference.icon_file" class="column">{{ getIconFileName(poi.element.symbol) }}</td>
          <td v-if="getPoiColumnsPreference.is_visible" class="column">{{ poi.element.symbol ? poi.element.symbol.is_visible : undefined }}</td>
          <td v-if="getPoiColumnsPreference.symbol_created_date" class="column">{{ poi.element.symbol ? dateFormatter(poi.element.symbol.creation_date) : ''}}</td>
          <td v-if="getPoiColumnsPreference.symbol_updated_date" class="column">{{ poi.element.symbol && poi.element.symbol.update_date ? dateFormatter(poi.element.symbol.update_date) : ''}}</td>
          <td v-if="getPoiColumnsPreference.style_type" class="column">{{ poi.element.style_type }}</td>
          <td v-if="getPoiColumnsPreference.extrusion" class="column">{{ poi.element.extrusion }}</td>
          <td v-if="getPoiColumnsPreference.radius" class="column end-align">{{ poi.element.radius }}M</td>
          <td v-if="getPoiColumnsPreference.position" class="column">{{ positionFormatter(poi.element) }}</td>
          <td v-if="getPoiColumnsPreference.stroke_width" class="column">{{ poi.element.style_stroke_width }}</td>
          <td v-if="getPoiColumnsPreference.stroke_color" class="column">{{ poi.element.stroke_color }}</td>
          <td v-if="getPoiColumnsPreference.stroke_opacity" class="column">{{ poi.element.stroke_opacity }}</td>
          <td v-if="getPoiColumnsPreference.wireframe" class="column">{{ poi.element.wireframe }}</td>
          <td v-if="getPoiColumnsPreference.fill_color" class="column">{{ poi.element.fill_color }}</td>
          <td v-if="getPoiColumnsPreference.fill_opacity" class="column">{{ poi.element.fill_opacity }}</td>
          <td v-if="getPoiColumnsPreference.animation" class="column">{{ poi.element.amplitude }}</td>
          <td v-if="getPoiColumnsPreference.metadata" class="column">{{ poi.element.metadata }}</td>
          <td class="last-column">
             <p class="material-symbols-sharp no-margin clickable" @click="openMenu(poi.element.id)">more_vert</p>
             <div v-if="menuState && menuState.id === poi.element.id && menuState.state" class="menu">
                <p class="menu-element" @click="downloadPoi(poi)">Exporter le POI</p>
                <p class="menu-element" @click="copy(poi)">Copier le POI</p>
                <p class="menu-element" @click="openEdition(poi)">Editer le POI</p>
                <p class="menu-element" @click="openDeletionDialog(poi)">Supprimer le POI</p>
             </div>
             <div v-if="menuState" class="overlay" @click="menuState = undefined" />
          </td>
        </tr>
      </table>
    </div>
  </div>
  <DeleteConfirmation v-if="deleteDialog" :dialogVisible="deleteDialog" title="Êtes-vous sûr de vouloir supprimer ces point d'intérêts?" @closeDialog="deleteDialog = false" @validate="confirmDeletion()" />
  <PoiColumnsSelection v-if="columnDialog" :showDialog="columnDialog" @close-dialog="columnDialog = false" />
  <ThePoiEditor :isEdit="true" :poi="poiToUpdate" :showDialog="showEditionDialog" @close-dialog="showEditionDialog = false"/>
</div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import PoiColumnsSelection from '../Dialog/PoiColumnsSelection.vue';
import ThePoiEditor from '../Dialog/ThePoiEditor.vue';
import DeleteConfirmation from '../Dialog/DeleteConfirmation.vue';

import { fullDateFormatter } from '../../../../utils/formatter.js';
import sort from '../../../../utils/sort';
import { computeGeoJSONFromPOI, computeGeoJSONFromPOIs } from '../../../../utils/geojson.js';

import { savePoi, deletePoi } from '../../../../utils/api.js';

export default {
  components: { PoiColumnsSelection, DeleteConfirmation, ThePoiEditor },
  props: {
    bioverId: Number,
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
    };
  },
  computed: {
    getData() {
      return this.getPoisByBiover(this.bioverId);
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
    ...mapGetters('biovers', ['getPoisByBiover', 'ownOrPublic', 'bioverIsEditable', 'getCopyElement', 'getPoiColumnsPreference']),
  },
  methods: {
    dateFormatter(date) {
      return fullDateFormatter(date);
    },
    getCoordinate(poi) {
      return poi.element.coordinate ? `${poi.element.coordinate.lat},${poi.element.coordinate.long}` : '';
    },
    userFormatter(user) {
      return user && user.username ? user.username : '';
    },
    positionFormatter(symbol) {
      return symbol && symbol.position ? `{ x: ${symbol.position.x}, y: ${symbol.position.y}, alpha: ${symbol.position.alpha}}` : '';
    },
    globalCheckAnalizer() {
      if (this.allAreUnselected) {
        this.globalChecked = false;
      } else {
        this.globalChecked = true;
      }
    },
    getARFileName(symbol) {
      if (symbol && symbol.ar_url) {
        return symbol.ar_url.replace(/^.*[\\\/]/, '');
      }
      return 'symbole-ar-defaut.glb';
    },
    getIconFileName(symbol) {
      if (symbol && symbol.url) {
        return symbol.url.replace(/^.*[\\\/]/, '');
      }
      return 'symbole-carte-defaut.png';
    },
    getAudioFileName(symbol) {
      if (symbol && symbol.audio_url) {
        return symbol.audio_url.replace(/^.*[\\\/]/, '');
      }
      return 'symbole-audio-defaut.mp3';
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
      this.updatePoiToDisplay({
        bioverId: this.bioverId,
        poi: selectedPoi,
      });
      this.globalCheckAnalizer();
    },
    selectAll() {
      this.globalChecked = !this.globalChecked;
      if (this.globalChecked) {
        this.selectAllPois();
      } else {
        this.unselectAllPois();
      }
    },
    openMenu(rowId) {
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
      if (poi.symbol) {
        delete poi.symbol.id;
        delete poi.symbol.poi_id;
        if (poi.symbol.position == null) {
          poi.symbol.position = undefined;
        } else {
          delete poi.symbol.position.id;
          delete poi.symbol.position.poi_id;
        }
      }
      if (poi.media && poi.media.length > 0) {
        for (let i = 0; i < poi.media.length; i++) {
          delete poi.media[i].id;
          delete poi.media[i].poi_id;
          if (poi.media[i].position) {
            delete poi.media[i].position.id;
          }
        }
      }
      if (poi.position == null) {
        poi.position = undefined;
      } else {
        delete poi.position.id;
        delete poi.position.poi_id;
      }
      delete poi.id;
      const newPoi = await savePoi(poi);
      this.addNewPoi(newPoi.data);
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
      this.poiToUpdate = { poi: poi.element };
      this.showEditionDialog = true;
      this.menuState = undefined;
    },
    openDeletionDialog(poi) {
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
    ...mapActions('biovers', ['updatePoiToDisplay', 'resetPoisModification', 'selectAllPois', 'unselectAllPois', 'copyPoi', 'addNewPoi', 'removePoi']),
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

.description-transform {
  transform: scaleY(-1);
}

.text-margin {
  padding-right: 6px;
}
</style>
