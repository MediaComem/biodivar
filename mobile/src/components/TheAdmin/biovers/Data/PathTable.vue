<template>
  <el-table ref="multipleTableRef" :data="getPathsByBiover(bioverId)" style="width: 100%"
  @select="selectElement"
  @select-all="selectAll">
    <el-table-column fixed type="selection" width="55" />
    <el-table-column property="name" :label="$t('path.biover')" width="120" sortable/>
    <el-table-column property="element.id" :label="$t('path.id')" show-overflow-tooltip sortable/>
    <el-table-column property="element.visible_from" :label="$t('path.visible_from')"
    show-overflow-tooltip sortable/>
    <el-table-column property="element.User.username" :label="$t('path.author')"
    show-overflow-tooltip sortable/>
     <el-table-column property="element.last_contributor_fk.username"
     label="Edité par" show-overflow-tooltip sortable/>
     <el-table-column property="element.is_public" :label="$t('path.is_public')"
     show-overflow-tooltip sortable/>
     <el-table-column property="element.is_editable" :label="$t('path.is_editable')"
     show-overflow-tooltip sortable/>
     <el-table-column property="element.style_type" :label="$t('path.radius_type')"
     show-overflow-tooltip sortable/>
     <el-table-column property="element.style_stroke.width"
     :label="$t('path.stroke')" show-overflow-tooltip sortable/>
     <el-table-column property="element.style_elevation"
     :label="$t('path.elevation')" show-overflow-tooltip sortable/>
     <el-table-column property="element.style_is_visible"
     :label="$t('path.is_visible')" show-overflow-tooltip sortable/>
  </el-table>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  props: {
    bioverId: Number,
  },
  watch: {
    pathsModification(newVal) {
      if (newVal) {
        if (Array.isArray(newVal)) {
          newVal.forEach((path) => {
            if (path.element.element.biovers === this.bioverId) {
              this.$refs.multipleTableRef.toggleRowSelection(path.element);
              this.resetPathsModification();
            }
          });
          return;
        }
        if (newVal.element && newVal.element.element.biovers === this.bioverId) {
          this.$refs.multipleTableRef.toggleRowSelection(newVal.element);
          this.resetPathsModification();
        }
      }
    },
  },
  computed: {
    ...mapState('biovers', ['pathsModification']),
    ...mapGetters('biovers', ['getPathsByBiover']),
  },
  methods: {
    selectElement(selection, row) {
      if (row) {
        this.updatePathToDisplay({
          bioverId: this.bioverId,
          path: row,
        });
      }
    },
    selectAll(event) {
      if (event.length === 0) {
        this.unselectAllPaths();
      } else {
        this.selectAllPaths();
      }
    },
    ...mapActions('biovers', ['updatePathToDisplay', 'selectAllPaths', 'unselectAllPaths', 'resetPathsModification']),
  },
  mounted() {
    this.$refs.multipleTableRef.toggleAllSelection();
  },
};
</script>
