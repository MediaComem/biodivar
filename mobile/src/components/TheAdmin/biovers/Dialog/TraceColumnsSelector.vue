<template>
   <el-dialog v-model="showDialog" title="Séléction des colonnes"
   @close="$emit('closeDialog')">
   <el-form :model="form" style="display: grid;">
        <el-checkbox v-model="form.author" label="AUTEUR-E" size="large" />
        <el-checkbox v-model="form.created_date" label="CREER LE" size="large" />
        <el-checkbox v-model="form.gps_accuracy" label="Précision du GPS" size="large" />
        <el-checkbox v-model="form.coordinate" label="COORDONNEES" size="large" />
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
        this.saveTraceColumns(this.form);
        this.$emit('closeDialog');
    },
    ...mapActions('biovers', ['saveTraceColumns'])
  },
  computed: {
    ...mapGetters('biovers', ['getTraceColumnsPreference']),
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.getTraceColumnsPreference));
  }
}
</script>