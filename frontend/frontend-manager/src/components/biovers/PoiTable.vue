<template>
  <el-table ref="multipleTableRef" :data="rows" style="width: 100%" @select="selectElement"
  @select-all="selectElement">
    <el-table-column fixed type="selection" width="55" />
    <el-table-column property="name" label="Biovers Name" width="120" sortable/>
    <el-table-column property="element.id" label="Poi ID" show-overflow-tooltip sortable/>
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
     <el-table-column property="element.coordinate.lat" label="Latitude"
     show-overflow-tooltip sortable/>
     <el-table-column property="element.coordinate.long" label="Longitude"
     show-overflow-tooltip sortable/>
     <el-table-column property="element.coordinate.alt" label="Altitude"
     show-overflow-tooltip sortable/>
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
    <el-table-column property="element.title" label="Poi Title"
    show-overflow-tooltip sortable/>
    <el-table-column property="element.subtitle" label="Poi Subtitle" show-overflow-tooltip
    sortable/>
    <el-table-column fixed align="right">
     <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)"
          >Edit</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <PoiEdition :poi="poiToEdit" :showDialog="showDialog" @close-dialog="closeDialog"
  @save="update"/>
</template>

<script>
import format from '../../utils/formatter';
import PoiEdition from './PoiEdition.vue';

import poi from '../../api/poi';

export default {
  watch: {
    data(newVal) {
      if (this.rows.length === newVal.length - 1) {
        this.rows.push(newVal[newVal.length - 1]);
        this.selectedRows.push({ type: 'POI', element: newVal[newVal.length - 1] });
        this.$refs.multipleTableRef.toggleRowSelection(this.rows[this.rows.length - 1]);
        this.$emit('poiToDisplay', this.selectedRows);
      } else if (this.rows.length === newVal.length) {
        console.log('Find a way to update only the modified element');
      } else {
        this.rows = newVal;
      }
    },
  },
  components: { PoiEdition },
  props: {
    data: Array,
  },
  emits: ['poiToDisplay', 'updatePoi'],
  data() {
    return {
      rows: [],
      selectedRows: [],
      poiToEdit: {},
      showDialog: false,
    };
  },
  methods: {
    creationDate(row) {
      return format.dateFormatter(row.element.creation_date);
    },
    updateDate(row) {
      return format.dateFormatter(row.element.update_date);
    },
    selectElement(event) {
      this.selectedRows = [];
      event.forEach((row) => {
        this.selectedRows.push({ type: row.type, element: row.element });
      });
      this.$emit('poiToDisplay', this.selectedRows);
    },
    handleEdit(row) {
      this.poiToEdit = { poi: row.element };
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
    async update(event) {
      const updatedPoi = await poi.updatePoi(event);
      const index = this.rows.findIndex((e) => e.element.id === event.id);
      this.rows[index].element = event;
      this.showDialog = false;
      this.$emit('updatePoi', updatedPoi.data.data);
    },
  },
  mounted() {
    this.rows = this.data;
    this.$refs.multipleTableRef.toggleAllSelection();
  },
};
</script>
