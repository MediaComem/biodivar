<template>
  <el-table ref="multipleTableRef" :data="data" style="width: 100%" @select="selectElement"
  @select-all="selectElement">
    <el-table-column fixed type="selection" width="55" />
    <el-table-column property="name" label="Biovers Name" width="120" sortable/>
    <el-table-column property="element.id" label="Path ID" show-overflow-tooltip sortable/>
    <el-table-column property="type" label="Type" show-overflow-tooltip sortable/>
    <el-table-column property="element.visible_from" label="Distance" show-overflow-tooltip
    sortable/>
    <el-table-column property="element.trigger_mode" label="Trigger" show-overflow-tooltip
    sortable/>
    <el-table-column property="element.User.username" label="Poi Author" show-overflow-tooltip
    sortable/>
    <el-table-column :formatter="creationDate" property="element.creation_date"
    label="Date de création" show-overflow-tooltip sortable/>
     <el-table-column property="element.last_contributor_fk.username"
     label="Edité par" show-overflow-tooltip sortable/>
     <el-table-column :formatter="updateDate" property="element.update_date"
     label="Date d'édition" show-overflow-tooltip sortable/>
     <el-table-column property="element.is_public" label="Confidentiel" show-overflow-tooltip
     sortable/>
     <el-table-column property="element.is_editable" label="Modifiable" show-overflow-tooltip
     sortable/>
     <el-table-column :formatter="corrdinateFormater" label="Coordinate" show-overflow-tooltip
     sortable/>
     <el-table-column property="element.radius" label="Radius" show-overflow-tooltip
     sortable/>
     <el-table-column property="element.style_type" label="Radius Type" show-overflow-tooltip
     sortable/>
     <el-table-column property="element.style_stroke.width"
     label="Radius Stroke" show-overflow-tooltip sortable/>
     <el-table-column property="element.style_elevation"
     label="Radius Elévation" show-overflow-tooltip sortable/>
     <el-table-column property="element.style_is_visible"
     label="Radius Visible" show-overflow-tooltip sortable/>
    <el-table-column property="element.title" label="Poi Title" show-overflow-tooltip
    sortable/>
    <el-table-column property="element.subtitle" label="Poi Subtitle" show-overflow-tooltip
    sortable/>
  </el-table>
</template>

<script>
import format from '../../utils/formatter';

export default {
  props: {
    data: Array,
  },
  emits: ['pathToDisplay'],
  methods: {
    creationDate(row) {
      return format.dateFormatter(row.element.creation_date);
    },
    updateDate(row) {
      return format.dateFormatter(row.element.update_date);
    },
    corrdinateFormater(row) {
      return format.coordinateFormatter(row.coordinate);
    },
    selectElement(event) {
      const data = [];
      event.forEach((row) => {
        data.push({ type: row.type, element: row.element });
      });
      this.$emit('pathToDisplay', data);
    },
  },
  mounted() {
    this.$refs.multipleTableRef.toggleAllSelection();
  },
};
</script>
