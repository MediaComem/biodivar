<template>
   <el-dialog v-model="showDialog" title="Séléction des colonnes"
   @close="$emit('closeDialog')">
   <el-form :model="form" style="display: grid;">
        <el-checkbox v-model="form.coordinate" label="COORDONNEES" size="large" />
        <el-checkbox v-model="form.title" label="TITRE" size="large" />
        <el-checkbox v-model="form.subtitle" label="SOUS-TITRE" size="large" />
        <el-checkbox v-model="form.created_date" label="CREER LE" size="large" />
        <el-checkbox v-model="form.author" label="AUTEUR-E" size="large" />
        <el-checkbox v-model="form.updated_date" label="MODIFIER LE" size="large" />
        <el-checkbox v-model="form.contributor" label="DERNIER CONTRIBUTEUR-TRICE" size="large" />
        <el-checkbox v-model="form.scope" label="PORTEE" size="large" />
        <el-checkbox v-model="form.trigger" label="DECLENCHEUR" size="large" />
        <el-checkbox v-model="form.ar_file_name" label="AR FILE NAME" size="large" />
        <el-checkbox v-model="form.ar_visibility" label="VISIBILITE AR" size="large" />
        <el-checkbox v-model="form.ar_is_facing" label="FACE A LA CAMERA" size="large" />
        <el-checkbox v-model="form.symbol_wireframe" label="WIREFRAME DU SYMBOLE" size="large" />
        <el-checkbox v-model="form.autoplay" label="LECTURE AUTOMATIQUE" size="large" />
        <el-checkbox v-model="form.loop" label="LECTURE EN BOUCLER" size="large" />
        <el-checkbox v-model="form.scale" label="ECHELLE" size="large" />
        <el-checkbox v-model="form.symbol_position" label="POSITION DU SYMBOL" size="large" />
        <el-checkbox v-model="form.symbol_animation" label="ANIMATION" size="large" />
        <el-checkbox v-model="form.audio_file" label="AUDIO FILE NAME" size="large" />
        <el-checkbox v-model="form.audio_autoplay" label="AUDIO LECTURE AUTOMATIQUE" size="large" />
        <el-checkbox v-model="form.audio_loop" label="AUDIO LECTURE EN BOUCLER" size="large" />
        <el-checkbox v-model="form.audio_scope" label="PORTEE DE L'AUDIO" size="large" />
        <el-checkbox v-model="form.icon_file" label="ICON FILE NAME" size="large" />
        <el-checkbox v-model="form.is_visible" label="IS VISIBLE" size="large" />
        <el-checkbox v-model="form.symbol_created_date" label="SYMBOL CREATION DATE" size="large" />
        <el-checkbox v-model="form.symbol_updated_date" label="SYMBOL MODITION DATE" size="large" />
        <el-checkbox v-model="form.style_type" label="TYPE DE FORME" size="large" />
        <el-checkbox v-model="form.extrusion" label="EXTRUSION" size="large" />
        <el-checkbox v-model="form.radius" label="RAYON" size="large" />
        <el-checkbox v-model="form.position" label="POSITION" size="large" />
        <el-checkbox v-model="form.stroke_width" label="EPAISSEUR DU CONTOUR" size="large" />
        <el-checkbox v-model="form.stroke_color" label="COULEUR DU CONTOUR" size="large" />
        <el-checkbox v-model="form.stroke_opacity" label="OPACITE DU CONTOUR" size="large" />
        <el-checkbox v-model="form.wireframe" label="WIREFRAME DU REMPLISSAGE" size="large" />
        <el-checkbox v-model="form.fill_color" label="COULEUR DU REMPLISSAGE" size="large" />
        <el-checkbox v-model="form.fill_opacity" label="OPACITE DU REMPLISSAGE" size="large" />
        <el-checkbox v-model="form.animation" label="ANIMATION" size="large" />
        <el-checkbox v-model="form.metadata" label="METADATA" size="large" />
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('closeDialog')">
          {{ $t('biover.configurator.cancel') }}
        </el-button>
        <el-button type="primary" @click="save">
          {{ $t('biover.configurator.confirm') }}
        </el-button>
      </span>
    </template>
    </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
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