<template>
  <el-table ref="multipleTableRef" :data="getData"
  style="width: 100%" @select="selectElement"
  @select-all="selectAll">
    <el-table-column fixed type="selection" width="55" />
    <el-table-column property="name" :label="$t('poi.biover')" width="120" sortable/>
    <el-table-column property="element.id" :label="$t('poi.id')" show-overflow-tooltip sortable/>
    <el-table-column property="element.visible_from" :label="$t('poi.visible_from')"
    show-overflow-tooltip sortable/>
    <el-table-column property="element.trigger_mode" :label="$t('poi.trigger')"
    show-overflow-tooltip sortable/>
    <el-table-column property="element.User.username" :label="$t('poi.author')"
    show-overflow-tooltip sortable/>
    <el-table-column :formatter="creationDate" property="element.creation_date"
    :label="$t('poi.created_date')" show-overflow-tooltip sortable/>
     <el-table-column property="element.last_contributor_fk.username"
     :label="$t('poi.contributor')" show-overflow-tooltip sortable/>
     <el-table-column :formatter="updateDate" property="element.update_date"
     :label="$t('poi.update_date')" show-overflow-tooltip sortable/>
     <el-table-column property="element.is_public" :label="$t('poi.is_public')"
     show-overflow-tooltip sortable/>
     <el-table-column property="element.is_editable" :label="$t('poi.is_editable')"
     show-overflow-tooltip sortable/>
     <el-table-column property="element.coordinate.lat" :label="$t('poi.lat')"
     show-overflow-tooltip sortable/>
     <el-table-column property="element.coordinate.long" :label="$t('poi.long')"
     show-overflow-tooltip sortable/>
     <el-table-column property="element.coordinate.alt" :label="$t('poi.alt')"
     show-overflow-tooltip sortable/>
     <el-table-column property="element.radius" :label="$t('poi.radius')"
     show-overflow-tooltip sortable/>
     <el-table-column property="element.style_type" :label="$t('poi.radius_type')"
     show-overflow-tooltip sortable/>
     <el-table-column property="element.style_stroke.width"
     :label="$t('poi.stroke')" show-overflow-tooltip sortable/>
     <el-table-column property="element.style_elevation"
     :label="$t('poi.elevation')" show-overflow-tooltip sortable/>
     <el-table-column property="element.style_is_visible"
     :label="$t('poi.is_visible')" show-overflow-tooltip sortable/>
    <el-table-column property="element.title" :label="$t('poi.title')"
    show-overflow-tooltip sortable/>
    <el-table-column property="element.subtitle" :label="$t('poi.subtitle')"
    show-overflow-tooltip sortable/>
    <el-table-column fixed align="right">
     <template #default="scope">
        <el-button :class="{disabled: couldUpdate(scope.row)}"
          size="small"
          @click="handleEdit(scope.row)"
          >{{ $t('poi.edit') }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <PoiEdition :poi="poiToEdit" :showDialog="showDialog" @close-dialog="showDialog = false" />
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import format from '../../../utils/formatter';
import PoiEdition from '../Dialog/PoiEdition.vue';

export default {
  components: { PoiEdition },
  props: {
    bioverId: Number,
  },
  watch: {
    poisModification(newVal) {
      if (newVal) {
        if (Array.isArray(newVal)) {
          newVal.forEach((poi) => {
            if (poi.element.element.biovers === this.bioverId) {
              this.$refs.multipleTableRef.toggleRowSelection(poi.element);
              this.resetPoisModification();
            }
          });
          return;
        }
        if (newVal.element && newVal.element.element.biovers === this.bioverId) {
          this.$refs.multipleTableRef.toggleRowSelection(newVal.element);
          this.resetPoisModification();
        }
      }
    },
  },
  data() {
    return {
      poiToEdit: {},
      showDialog: false,
    };
  },
  computed: {
    getData() {
      if (this.ownOrPublic(this.bioverId) === 'own') {
        return this.getPoisByBiover(this.bioverId);
      }
      return this.getPoisByBiover(this.bioverId).filter((e) => e.element.is_public);
    },
    ...mapState('biovers', ['poisModification']),
    ...mapGetters('biovers', ['getPoisByBiover', 'ownOrPublic']),
  },
  methods: {
    creationDate(row) {
      return format.dateFormatter(row.element.creation_date);
    },
    updateDate(row) {
      return format.dateFormatter(row.element.update_date);
    },
    selectElement(selection, row) {
      if (row) {
        this.updatePoiToDisplay({
          bioverId: this.bioverId,
          poi: row,
        });
      }
    },
    selectAll(event) {
      if (event.length === 0) {
        this.unselectAllPois();
      } else {
        this.selectAllPois();
      }
    },
    couldUpdate(row) {
      return (this.ownOrPublic(row.element.biovers) === 'public' && !row.element.is_editable) || row.import;
    },
    handleEdit(row) {
      if (this.couldUpdate(row)) {
        return;
      }
      this.poiToEdit = { poi: row.element };
      this.showDialog = true;
    },
    ...mapActions('biovers', ['updatePoiToDisplay', 'resetPoisModification', 'selectAllPois', 'unselectAllPois']),
  },
  mounted() {
    this.$refs.multipleTableRef.toggleAllSelection();
  },
};
</script>

<style scoped>
.disabled {
  opacity: 0.3;
}
</style>
