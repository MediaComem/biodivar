<template>
<div v-if="showDialog" class="overlay" @click="close"></div>
  <div v-if="showDialog" class="modal-edition">
    <DialogHeader :title="'Séléction des colonnes'" :logo="'add_location_alt'" @close="close" />
    <div class="container-layout">
      <div class="line-div"><el-checkbox v-model="form.created_date" :label="$t('Poi.Column.date')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.author" :label="$t('Poi.Column.author')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.coordinate" :label="$t('Poi.Column.coordinate')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.scope" :label="$t('Poi.Column.visibility')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.stroke_width" :label="$t('Poi.Column.style_stroke_width')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.stroke_color" :label="$t('Poi.Column.style_color')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.stroke_opacity" :label="$t('Poi.Column.style_stroke_opacity')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.extrusion" :label="$t('Poi.Column.extrusion')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.animation" :label="$t('Poi.Column.animation')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.metadata" :label="$t('Poi.Column.metadata')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.updated_date" :label="$t('Poi.Column.update_date')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.contributor" :label="$t('Poi.Column.last_contributor')" size="large"/></div>
      <div class="line-div"><el-checkbox v-model="form.wireframe" :label="$t('Poi.Column.wireframe')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.fill_color" :label="$t('Poi.Column.fill_color')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.fill_opacity" :label="$t('Poi.Column.fill_opacity')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.radius" :label="$t('Poi.Column.radius')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.elevation" :label="$t('Poi.Column.style_elevation')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.symbol_map_name" :label="$t('Poi.Column.symbol_map_name')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.style_type" :label="$t('Poi.Column.style_type')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.title" :label="$t('Poi.Column.title')" size="large" /></div>
      <div class="line-div"><el-checkbox v-model="form.subtitle" :label="$t('Poi.Column.subtitle')" size="large" /></div>
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