<template>
<div v-if="showDialog" class="overlay" @click="close"></div>
  <div v-if="showDialog" class="modal-edition">
    <DialogHeader :title="'Séléction des colonnes'" :logo="'add_location_alt'" @close="close" />
    <div class="container-layout">
      <div class="line-div"><el-checkbox v-model="form.coordinate" label="COORDONNEES" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.title" label="TITRE" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.subtitle" label="SOUS-TITRE" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.created_date" label="CREER LE" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.author" label="AUTEUR-E" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.updated_date" label="MODIFIER LE" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.contributor" label="DERNIER CONTRIBUTEUR-TRICE" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.scope" label="PORTEE" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.trigger" label="DECLENCHEUR" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.ar_file_name" label="AR FILE NAME" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.ar_visibility" label="VISIBILITE AR" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.ar_is_facing" label="FACE A LA CAMERA" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.symbol_wireframe" label="WIREFRAME DU SYMBOLE" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.autoplay" label="LECTURE AUTOMATIQUE" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.loop" label="LECTURE EN BOUCLER" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.scale" label="ECHELLE" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.symbol_position" label="POSITION DU SYMBOL" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.symbol_animation" label="ANIMATION" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.audio_file" label="AUDIO FILE NAME" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.audio_autoplay" label="AUDIO LECTURE AUTOMATIQUE" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.audio_loop" label="AUDIO LECTURE EN BOUCLER" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.audio_scope" label="PORTEE DE L'AUDIO" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.icon_file" label="ICON FILE NAME" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.is_visible" label="IS VISIBLE" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.symbol_created_date" label="SYMBOL CREATION DATE" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.symbol_updated_date" label="SYMBOL MODITION DATE" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.style_type" label="TYPE DE FORME" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.extrusion" label="EXTRUSION" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.radius" label="RAYON" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.position" label="POSITION" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.stroke_width" label="EPAISSEUR DU CONTOUR" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.stroke_color" label="COULEUR DU CONTOUR" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.stroke_opacity" label="OPACITE DU CONTOUR" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.wireframe" label="WIREFRAME DU REMPLISSAGE" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.fill_color" label="COULEUR DU REMPLISSAGE" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.fill_opacity" label="OPACITE DU REMPLISSAGE" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.animation" label="ANIMATION" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.metadata" label="METADATA" size="large" /></div>
    </div>
    <div class="full-button actions-button">
      <button class="full-button button-dark-gray" @click="close"><p class="material-symbols-sharp">undo</p>{{ $t('biover.configurator.cancel') }}</button>
    </div>
    <div class="full-button actions-button">
      <button class="full-button button-blue" @click="save()" ><p class="material-symbols-sharp">where_to_vote</p>{{ $t('biover.configurator.confirm') }}</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import DialogHeader from './DialogHeader.vue';

export default {
  components: { DialogHeader },
  props: {
    showDialog: Boolean,
  },
  emits: ['closeDialog'],
  data() {
    return {
        form: {},
    }
  },
  methods: {
    close() {
      this.$emit('closeDialog');
    },
    save() {
        this.savePoiColumns(this.form);
        this.$emit('closeDialog');
    },
    ...mapActions('biovers', ['savePoiColumns'])
  },
  computed: {
    ...mapGetters('biovers', ['getPoiColumnsPreference']),
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.getPoiColumnsPreference));
  }
}
</script>

<style scoped>
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
    overflow: auto;
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
    overflow: auto;
  }
}

.col-main {
  width: 100px;
  display: flex;
  align-items: center;
  padding-left: 6px;
  height: 34px;
}

.col2 {
  width: calc(100% - 100px);
  display: flex;
  align-items: center;
  height: 34px;
}

.input-full-size-element {
  width: 100%;
  margin-right: 5px;
}

.full-button {
  width: 100%;
  border-radius: 100px;
  height: 40px;
}

.actions-button {
  margin-top: 10px;
  margin-bottom: 10px;
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
  background-color: #2F80ED;
  border: 0px;
  color: white;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
}

p {
  margin-top: 6px;
  margin-bottom: 6px;
}

button {
  width: 49%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.line-div {
    display: flex;
    padding-left: 10px;
}
</style>