<script setup>
import { ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex'; 
import { mapStore } from '../../../../composables/map.js';
import { useStore as composableStore } from '../../../../composables/store.js';

import DialogHeader from './DialogHeader.vue';
import Accordeon from '../../../app/UIElement/Accordeon.vue';
import DeleteConfirmation from './DeleteConfirmation.vue';
import CancelConfirmation from './CancelConfirmation.vue';

import { deletePath as apiDeletaPath, saveEvent, updatePath as apiUpdatePath } from '../../../../utils/api.js';

const store = useStore();

const props = defineProps({
  path: Object,
  coordinate: Array,
  showDialog: Boolean,
  bioversId: Number,
});

const emit = defineEmits(['closeDialog', 'closeAfterSave'])

const defaultForm = {
  coordinate: [],
  scope: 50,
  elevation: 0,
  style_stroke_width: 0.1,
  stroke_color: '#FFFFFF',
  stroke_opacity: 40,
  amplitude: 0,
  metadata: [],
};

const form = ref({});

const tooltipElement = ref('');
const dialogVisible = ref(false);
const deleteDialog = ref(false);
const cancelDialog = ref(false);
const isExpertMode = ref(false);

const advanceCoordinate = ref('');

function updateWait(state) {
    store.dispatch('global/updateWait', state);
}

function setupEdition() {
  if (props.path) {
    form.value = JSON.parse(JSON.stringify(props.path.path));
    if (!form.value.metadata) {
      form.value.metadata = [];
    } else {
        if (!Array.isArray(form.value.metadata)) form.value.metadata = JSON.parse(form.value.metadata);
    }
  } else {
    form.value = JSON.parse(JSON.stringify(defaultForm));
    form.value.coordinate = props.coordinate;
  }
  updateWait(false);
}

function resetEditor() {
  form.value = JSON.parse(JSON.stringify(defaultForm));
}

function addMetadata() {
  form.value.metadata.push({
    key: '',
    value: '',
    description: '',
  });
}

function deleteMetadata(index) {
  form.value.metadata.splice(index, 1);
}

function openTooltip(event, element) {
  this.tooltipElement = element;
}

function expertMode() {
  isExpertMode.value = !isExpertMode.value;
  if (isExpertMode.value) {
    advanceCoordinate.value = JSON.stringify(form.value.coordinate);
  } else {
    form.value.coordinate = JSON.parse(advanceCoordinate.value);
  }
}

function close() {
    cancelDialog.value = false;
    emit('closeDialog');
}

async function createEvent(event, bioversId) {
    const { accuracy, position } = mapStore();
    await saveEvent({
        is_public: true,
        gps_accuracy: accuracy.value,
        biovers: bioversId,
        coordinate: { lat: position.value[0], long: position.value[1], alt: position.value[2] ?? 0 },
        data: event,
    });
}

async function updatePath() {
    cancelDialog.value = false;
    const updatedPath = await apiUpdatePath(form.value);
    store.dispatch('biovers/updatePathStore', updatedPath.data);
    composableStore().updatePathInBiovers(updatedPath.data);
    await createEvent('update-path-' + form.value.id, form.value.biovers);
    emit('closeAfterSave');
}

async function deletePath() {
    updateWait(true);
    deleteDialog.value = false;
    await apiDeletaPath(form.value);
    store.dispatch('biovers/removePath', form.value);
    composableStore().deletePathInBiovers(form.value);
    await createEvent('delete-path-' + form.value.id, form.value.biovers);
    updateWait(false);
    emit('closeAfterSave');
}

watch(
  () => props.showDialog,
  (newVal) => {
    dialogVisible.value = newVal;
    if (dialogVisible.value) {
      setupEdition();
    } else {
      resetEditor();
    }
  }
);

onMounted(() => {
  form.value = JSON.parse(JSON.stringify(defaultForm));
});
</script>

<template>
  <div v-if="dialogVisible" class="overlay" @click="cancelDialog = true"></div>
  <div v-if="dialogVisible" class="modal-edition">
    <DialogHeader
      :title="'éditer path'"
      :logo="'gesture'"
      @close="cancelDialog = true"
    />
    <div class="edition-layout collapse">
      <div class="container-layout">
        <Accordeon
          class="margin-accordeon"
          :header="'Général'"
          :could-update-header="false"
          :length="6 + form.metadata.length"
          :should-be-open="true"
          :image="'settings'"
        >
          <div style="display: flex">
            <div class="col-main border coordinate-title">
              <p class="material-symbols-sharp">location_searching</p>
              <p class="col-main-text">coordonnées</p>
              <p
                ref="coordinate"
                class="material-symbols-sharp tooltip-font"
                @mouseenter="openTooltip($event, 'coordinate')"
                @mouseleave="tooltipElement = null"
              >
                help
              </p>
              <p class="material-symbols-sharp" @click="expertMode()">edit</p>
              <div data-role="tooltip" v-show="tooltipElement === 'coordinate'">
                <p
                  @mouseenter="tooltipElement = 'coordinate'"
                  @mouseleave="tooltipElement = null"
                >
                  Les coordonnées WGS84 ou se situe le centre du point
                  d’intérêt.
                </p>
              </div>
            </div>
            <div v-if="!isExpertMode" class="coordinate-display">
              <div
                class="coordinate-row"
                v-for="(coordinate, index) in form.coordinate"
                :key="index"
              >
                <div class="col3 border">
                  <label for="long" class="margin-left-constraint"
                    >longitude</label
                  ><input
                    id="long"
                    class="input-full-size-element remove-input-border remove-stepper"
                    type="number"
                    v-model="coordinate.long"
                    min="-180"
                    max="180"
                    @change="longitudeValidation()"
                  />
                </div>
                <div class="col3 border">
                  <label for="lat" class="margin-left-constraint"
                    >latitude</label
                  ><input
                    id="lat"
                    class="input-full-size-element remove-input-border remove-stepper"
                    type="number"
                    v-model="coordinate.lat"
                    min="-90"
                    max="90"
                    @change="latitudeValidation()"
                  />
                </div>
                <div class="col3 border end-border">
                  <label for="alt" class="margin-left-constraint"
                    >altitude</label
                  ><input
                    id="alt"
                    class="input-full-size-element remove-input-border remove-stepper"
                    type="number"
                    v-model="coordinate.alt"
                  />
                </div>
              </div>
            </div>
            <div v-else class="col2 border end-border">
              <textarea
                id="text"
                type="textarea"
                class="input-margin remove-input-border"
                v-model="advanceCoordinate"
              />
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border">
              <p class="material-symbols-sharp">visibility</p>
              <p class="col-main-text">porté</p>
              <p
                ref="visibility"
                class="material-symbols-sharp tooltip-font"
                @mouseenter="openTooltip($event, 'visibility')"
                @mouseleave="tooltipElement = null"
              >
                help
              </p>
              <div data-role="tooltip" v-show="tooltipElement === 'visibility'">
                <p
                  @mouseenter="tooltipElement = 'visibility'"
                  @mouseleave="tooltipElement = null"
                >
                  Lorsque la distance entre la position de l’utilisateur et
                  celle d’un point/trace est inférieur à cette valeur, celui-ci
                  est affiché dans la scene A-Frame. La lecture de certains
                  médias (son, vidéo, gltf animés) peuvent également
                </p>
              </div>
            </div>
            <div class="col2 border end-border">
              <input
                id="scope"
                type="number"
                step="0.5"
                v-model="form.scope"
                class="input-margin remove-input-border remove-stepper input-number-right-align"
                style="width: 40px"
              />
              <label for="scope">m</label>
              <el-slider
                class="slider-width"
                v-model="form.scope"
                :max="1000"
                :step="0.5"
              />
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border">
              <p class="material-symbols-sharp">border_color</p>
              <p class="col-main-text">contour</p>
              <p
                ref="contour"
                class="material-symbols-sharp tooltip-font"
                @mouseenter="openTooltip($event, 'contour')"
                @mouseleave="tooltipElement = null"
              >
                help
              </p>
              <div data-role="tooltip" v-show="tooltipElement === 'contour'">
                <p
                  @mouseenter="tooltipElement = 'contour'"
                  @mouseleave="tooltipElement = null"
                ></p>
              </div>
            </div>
            <div class="col4 border">
              <p class="material-symbols-sharp">line_weight</p>
              <input
                id="epaisseur"
                class="input-margin remove-input-border remove-stepper input-number-right-align"
                step="0.01"
                type="number"
                v-model="form.style_stroke_width"
                :disabled="
                  form.style_type === 'sphere' ||
                  form.style_type === 'hemisphere'
                "
                style="width: 36px"
              /><el-slider
                class="slider-width-position"
                v-model="form.style_stroke_width"
                :max="10"
                :step="0.01"
                :disabled="
                  form.style_type === 'sphere' ||
                  form.style_type === 'hemisphere'
                "
              />
            </div>
            <div class="col4 border">
              <p class="material-symbols-sharp">colorize</p>
              <input
                id="stroke_color"
                type="color"
                v-model="form.stroke_color"
                :disabled="
                  form.style_type === 'sphere' ||
                  form.style_type === 'hemisphere'
                "
              /><label for="stroke_color">{{ form.stroke_color }}</label>
            </div>
            <div class="col4 border end-border">
              <p class="material-symbols-sharp">opacity</p>
              <input
                id="stroke_opacity"
                class="input-margin remove-input-border remove-stepper input-number-right-align"
                type="number"
                v-model="form.stroke_opacity"
                :disabled="
                  form.style_type === 'sphere' ||
                  form.style_type === 'hemisphere'
                "
                style="width: 32px"
              /><label for="stroke_opacity">%</label
              ><el-slider
                class="slider-width-opacity"
                v-model="form.stroke_opacity"
                :max="100"
                :disabled="
                  form.style_type === 'sphere' ||
                  form.style_type === 'hemisphere'
                "
              />
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border">
              <p class="material-symbols-sharp">expand</p>
              <p class="col-main-text">extrusion</p>
              <p
                ref="anim"
                class="material-symbols-sharp tooltip-font"
                @mouseenter="openTooltip($event, 'extrusion')"
                @mouseleave="tooltipElement = null"
              >
                help
              </p>
              <div data-role="tooltip" v-show="tooltipElement === 'extrusion'">
                <p
                  @mouseenter="tooltipElement = 'extrusion'"
                  @mouseleave="tooltipElement = null"
                >
                  
                </p>
              </div>
            </div>
            <div class="col2 border end-border">
              <input
                type="number"
                class="input-margin remove-input-border remove-stepper input-number-right-align"
                v-model="form.extrusion"
                style="width: 40px; margin-right: 20px"
              />
              <el-slider class="slider-width" v-model="form.extrusion" :max="100" :step="0.1"/>
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border">
              <p class="material-symbols-sharp">north</p>
              <p class="col-main-text">elevation</p>
              <p
                ref="anim"
                class="material-symbols-sharp tooltip-font"
                @mouseenter="openTooltip($event, 'elev')"
                @mouseleave="tooltipElement = null"
              >
                help
              </p>
              <div data-role="tooltip" v-show="tooltipElement === 'elev'">
                <p
                  @mouseenter="tooltipElement = 'elev'"
                  @mouseleave="tooltipElement = null"
                >
                  
                </p>
              </div>
            </div>
            <div class="col2 border end-border">
              <input
                type="number"
                class="input-margin remove-input-border remove-stepper input-number-right-align"
                v-model="form.elevation"
                style="width: 40px; margin-right: 20px"
              />
              <el-slider
                class="slider-width"
                v-model="form.elevation"
                :min="-10"
                :max="10"
                :step="0.01"
              />
            </div>
          </div>
          <div style="display: flex">
            <div class="col-main border">
              <p class="material-symbols-sharp">animation</p>
              <p class="col-main-text">animation</p>
              <p
                ref="anim"
                class="material-symbols-sharp tooltip-font"
                @mouseenter="openTooltip($event, 'anim')"
                @mouseleave="tooltipElement = null"
              >
                help
              </p>
              <div data-role="tooltip" v-show="tooltipElement === 'anim'">
                <p
                  @mouseenter="tooltipElement = 'anim'"
                  @mouseleave="tooltipElement = null"
                >
                  cette valeur est un facteur d’amplitude pour créer une
                  animation sinusoïdale du rayon. Si la valeur est à 0, il n’y a
                  pas d’animation.
                </p>
              </div>
            </div>
            <div class="col2 border end-border">
              <input
                type="number"
                class="input-margin remove-input-border remove-stepper input-number-right-align"
                v-model="form.amplitude"
                style="width: 40px; margin-right: 20px"
              />
              <el-slider
                class="slider-width"
                v-model="form.amplitude"
                :max="1"
                :step="0.01"
              />
            </div>
          </div>
          <div
            style="display: flex"
            v-for="(meta, index) in form.metadata"
            :key="index"
          >
            <div class="col-main border">
              <p class="material-symbols-sharp">database</p>
              <input
                v-model="meta.key"
                type="text"
                class="metadata-title remove-input-border"
                placeholder="Entrer nom du métadata"
              />
              <p
                :ref="`${meta.key}-${index}`"
                class="material-symbols-sharp"
                @mouseenter="openTooltip($event, `${meta.key}-${index}`)"
                @mouseleave="tooltipElement = null"
              >
                help
              </p>
              <div
                data-role="tooltip"
                v-show="tooltipElement === `${meta.key}-${index}`"
              >
                <p
                  @mouseenter="tooltipElement = `${meta.key}-${index}`"
                  @mouseleave="tooltipElement = null"
                >
                  {{ meta.description }}
                </p>
              </div>
            </div>
            <div class="col3 border">
              <input
                v-model="meta.value"
                type="text"
                class="input-margin input-full-size-element remove-input-border"
                placeholder="Entrer valeur du métadata"
              />
            </div>
            <div class="col3 border end-border">
              <input
                v-model="meta.description"
                type="text"
                class="input-margin input-full-size-element remove-input-border"
                placeholder="Entrer description du métadata"
              />
              <p class="material-symbols-sharp" @click="deleteMetadata(index)">
                delete_forever
              </p>
            </div>
          </div>
          <div style="display: flex; border-bottom: 1px solid black;">
            <div class="col-main border">
              <p class="material-symbols-sharp link">add</p>
              <p class="link col-main-text" @click="addMetadata()">créer un attribut</p>
              <p
                ref="add"
                class="material-symbols-sharp"
                @mouseenter="openTooltip($event, 'add')"
                @mouseleave="tooltipElement = null"
              >
                help
              </p>
              <div data-role="tooltip" v-show="tooltipElement === `add`">
                <p
                  @mouseenter="tooltipElement = `add`"
                  @mouseleave="tooltipElement = null"
                ></p>
              </div>
            </div>
            <div class="col2 border end-border" />
          </div>
        </Accordeon>
      </div>
      <div class="full-button actions-button">
        <button class="full-button button-red" @click="deleteDialog = true"><p class="material-symbols-sharp">wrong_location</p> Supprimer le path</button>
      </div>
      <div class="full-button actions-button">
        <button class="full-button button-blue" @click="updatePath()" ><p class="material-symbols-sharp">where_to_vote</p> Enregistrer les modifications</button>
      </div>
    </div>
  </div>
  <DeleteConfirmation v-if="deleteDialog" :dialogVisible="deleteDialog" title="Êtes-vous sûr de vouloir supprimer ces path?" @closeDialog="deleteDialog = false" @validate="deletePath()" />
  <CancelConfirmation v-if="cancelDialog" :dialogVisible="cancelDialog" title="Voulez-vous enregistrer les modifications?" @close="close()" @closeDialog="cancelDialog = false" @validate="updatePath()" />
</template>

<style scoped>
p {
  margin-top: 6px;
  margin-bottom: 6px;
  letter-spacing: 0.02em;
  font-size: 14px;
}

.col-main-text {
  margin-bottom: 3px;
} 

.coordinate-title {
    height: auto !important;
    align-items: start !important;
}

.coordinate-display {
  display: block;
  width: 75%;
}

.coordinate-row {
  display: flex;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1000000;
}

@media screen and (min-width: 1000px) {
  .modal-edition {
    background-color: white;
    width: 70vw;
    height: 95vh;
    position: fixed;
    top: 2.5vh;
    left: 15vw;
    z-index: 10000000;
    padding-left: 10px;
    padding-right: 10px;
  }
}

@media screen and (max-width: 999px) {
  .modal-edition {
    background-color: white;
    width: 95vw;
    height: 95vh;
    position: fixed;
    top: 2.5vh;
    left: 2.5vw;
    z-index: 10000000;
    padding-left: 10px;
    padding-right: 10px;
  }
}

#title,
#description {
  width: 100%;
  margin-right: 5px;
}

label {
  font-family: "BiodivAR Roman";
  font-variation-settings: "wght" 110, "ital" 0;
  font-size: 14px;
  letter-spacing: 0.02em;
  padding-right: 6px;
  padding-bottom: 1px;
  margin-top: 4px;
}


button {
  width: 49%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

textarea {
  width: 100% !important;
  margin-right: 5px;
  height: 30px;
  line-height: 1 !important;
}

.button-gray {
  background-color: #f2f2f2;
  border: 0px;
  color: black;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
}

.button-orange {
  background-color: #ffa800;
  border: 0px;
  color: black;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
}

.button-dark-gray {
  background-color: #666666;
  border: 0px;
  color: white;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
}

.button-blue {
  background-color: #2f80ed;
  border: 0px;
  color: white;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
}

.button-red {
  background-color: #ff0000;
  border: 0px;
  color: white;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
}

.embedded {
  height: 40vh;
  margin-left: auto;
  margin-right: auto;
}

.selection-layout {
  display: flex;
  height: 40px;
}

.style-button-border {
  border-left: 2px solid black;
  border-top: 2px solid black;
  border-right: 2px solid black;
  border-bottom: 0px;
}

.style-button {
  display: flex;
  background-color: #e0e0e0;
  color: #666666;
}

.style-button-active {
  background-color: #ffffff;
  color: #000;
}

@media screen and (max-width: 999px) {
  .container-layout {
    width: 1000px;
    overflow-x: auto;
  }
}

.col-main {
  width: 25%;
  display: flex;
  align-items: center;
  padding-left: 6px;
  height: 30px;
}

.col2 {
  width: 75%;
  display: flex;
  align-items: center;
  height: 30px;
}

.col3 {
  width: calc((100% - 25%) / 2);
  display: flex;
  align-items: center;
  height: 30px;
}

.col4 {
  width: 25%;
  display: flex;
  align-items: center;
  height: 30px;
}

.col5 {
  width: calc((100% - 25%) / 4);
  display: flex;
  align-items: center;
  height: 30px;
}

.border {
  border-top: 1px solid black;
  border-left: 1px solid black;
}

.end-border {
  border-right: 1px solid black;
}

.slider-width {
  width: calc(100% - 82px) !important;
  padding-left: 23px;
}

.slider-width-position {
  width: calc(100% - 80px) !important;
  padding-left: 23px;
}

.slider-width-small {
  width: calc(100% - 200px) !important;
  padding-left: 23px;
}

.slider-width-opacity {
  width: calc(100% - 100px) !important;
  padding-left: 23px;
}

.link {
  color: #2f80ed;
  font-weight: bold;
}

.disabled {
  background-color: #bdbdbd;
}

.full-button {
  width: 100%;
  border-radius: 100px;
  height: 40px;
}

.material-symbols-sharp {
  font-size: 18px;
  padding-right: 8px;
}

.edition-layout {
  height: calc(95vh);
}

.collapse {
  height: calc(95vh - 70px);
  overflow: auto;
}

.actions-button {
  margin-top: 10px;
  margin-bottom: 10px;
}

.description-transform {
  transform: scaleY(-1);
}

.delete-font {
  padding-left: 5px;
  margin-bottom: 7px;
}

.input-margin {
  padding-right: 5px;
  margin-left: 5px;
}

.metadata-title {
  width: calc(100% - 60px);
}

.input-full-size-element {
  width: 100%;
  margin-right: 5px;
}

.el-collapse-item__content * {
  line-height: 0;
}

[data-role='tooltip'] {
  display: inline-block;
  border-radius: 20px;
  position: absolute;
  border: 1px solid black;
  color: white;
  background: black;
  z-index: 10000001;
  width: 400px;
  min-height: 40px;
}

.input-button {
  background-color: #2f80ed;
  color: white;
  width: 100px;
  height: 25px;
  border-radius: 15px;
  border: none;
  margin-left: 3px;
  margin-right: 3px;
}

.tooltip-font {
  color: #999999;
  margin-bottom: 6px;
  font-size: 16px;
 padding-left: 8px;
}

.clickable {
  cursor: pointer;
}

.disabled-button {
  opacity: 0.5;
}

.remove-input-border {
  border: none;
}

.remove-stepper::-webkit-outer-spin-button,
.remove-stepper::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-number-right-align {
  text-align: right;
}

.margin-accordeon {
  --left-margin: 7px;
  --accordeon-background: #EEEEEE;
}

.margin-left-constraint {
  margin-left: 5px;
}
</style>
