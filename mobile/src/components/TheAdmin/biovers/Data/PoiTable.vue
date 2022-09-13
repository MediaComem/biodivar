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
              <p class="material-symbols-sharp text-margin">location_searching</p>
              <p>COORDONNEES</p>
            </div>
          </th>
          <th class="column">
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
          <th class="column">
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
          <th class="column">
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
                :class="{'change-icon': sortElement === 'update_date' && !isSymbol && !orderElement}"
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
              <p class="material-symbols-sharp text-margin">visibility</p>
              <p>PORTEE</p>
              <img
                class="transition"
                :class="{'change-icon': sortElement === 'scope' && !orderElement}"
                src="../../../../assets/tables/sort-arrow.svg"
                alt="sort" @click="setSort('scope')">
            </div>
          </th>
          <th class="column">
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
          <th class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">location_on</p>
              <p>AR FILE NAME</p>
            </div>
          </th>
           <th class="column">
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
          <th class="column">
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
          <th class="column">
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
          <th class="column">
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
          <th class="column">
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
          <th class="column">
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
          <th class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">merge</p>
              <p>POSITION DU SYMBOL</p>
            </div>
          </th>
          <th class="column">
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
          <th class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">music_note</p>
              <p>AUDIO FILE NAME</p>
            </div>
          </th>
          <th class="column">
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
          <th class="column">
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
          <th class="column">
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
          <th class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">map</p>
              <p>ICON FILE NAME</p>
            </div>
          </th>
          <th class="column">
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
          <th class="column">
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
          <th class="column">
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
          <th class="column">
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
          <th class="column">
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
          <th class="column">
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
          <th class="column">
            <div class="header-value">
              <p class="material-symbols-sharp text-margin">merge</p>
              <p>POSITION</p>
            </div>
          </th>
          <th class="column">
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
          <th class="column">
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
          <th class="column">
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
          <th class="column">
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
          <th class="column">
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
          <th class="column">
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
          <th class="column">
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
          <th class="column before-last-column">
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
          <td class="column">{{ dateFormatter(poi.element.creation_date) }}</td>
          <td class="column">{{ userFormatter(poi.element.User) }}</td>
          <td class="column">{{ dateFormatter(poi.element.update_date) }}</td>
          <td class="column">{{ userFormatter(poi.element.last_contributor_fk) }}</td>
          <td class="column end-align">{{ poi.element.scope }} M</td>
          <td class="column">{{ poi.element.trigger_mode }}</td>
          <td class="column">{{ getARFileName(poi.element.symbol) }}</td>
          <td class="column">{{ poi.element.symbol.is_visible_ar }}</td>
          <td class="column">{{ poi.element.symbol.is_facing_user }}</td>
          <td class="column">{{ poi.element.symbol.wireframe }}</td>
          <td class="column">{{ poi.element.symbol.autoplay }}</td>
          <td class="column">{{ poi.element.symbol.loop }}</td>
          <td class="column">{{ poi.element.symbol.scale }}</td>
          <td class="column">{{ positionFormatter(poi.element.symbol) }}</td>
          <td class="column">{{ poi.element.symbol.amplitude }}</td>
          <td class="column">{{ getAudioFileName(poi.element.symbol)  }}</td>
          <td class="column">{{ poi.element.symbol.audio_autoplay }}</td>
          <td class="column">{{ poi.element.symbol.audio_loop }}</td>
          <td class="column">{{ poi.element.symbol.audio_distance }}</td>
          <td class="column">{{ getIconFileName(poi.element.symbol) }}</td>
          <td class="column">{{ poi.element.symbol.is_visible }}</td>
          <td class="column">{{ poi.element.symbol ? dateFormatter(poi.element.symbol.creation_date) : ''}}</td>
          <td class="column">{{ poi.element.symbol && poi.element.symbol.update_date ? dateFormatter(poi.element.symbol.update_date) : ''}}</td>
          <td class="column">{{ poi.element.style_type }}</td>
          <td class="column">{{ poi.element.extrusion }}</td>
          <td class="column end-align">{{ poi.element.radius }}M</td>
          <td class="column">{{ positionFormatter(poi.element) }}</td>
          <td class="column">{{ poi.element.style_stroke_width }}</td>
          <td class="column">{{ poi.element.stroke_color }}</td>
          <td class="column">{{ poi.element.stroke_opacity }}</td>
          <td class="column">{{ poi.element.wireframe }}</td>
          <td class="column">{{ poi.element.fill_color }}</td>
          <td class="column">{{ poi.element.fill_opacity }}</td>
          <td class="column">{{ poi.element.amplitude }}</td>
          <td class="column before-last-column">{{ poi.element.metadata }}</td>
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

import { fullDateFormatter } from '../../../../utils/formatter.js';
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
      isSymbol: false,
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
      return sort.sort(this.getData, this.sortElement, this.orderElement, this.isSymbol);
    },
    allAreUnselected() {
      return this.getData.filter((poi) => poi.display).length === 0;
    },
    ...mapGetters('biovers', ['getPoisByBiover', 'ownOrPublic', 'bioverIsEditable']),
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
      return symbol.position ? `{ x: ${symbol.position.x}, y: ${symbol.position.y}, alpha: ${symbol.position.alpha}}` : '';
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

.description-transform {
  transform: scaleY(-1);
}

.text-margin {
  padding-right: 6px;
}
</style>
