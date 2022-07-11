<template>
  <el-table ref="multipleTableRef" :data="getTraceByBiovers(bioverId)" style="width: 100%">
    <el-table-column property="name" :label="$t('path.biover')" width="150" sortable/>
    <el-table-column property="element.id" label="User Trace ID" show-overflow-tooltip sortable/>
    <el-table-column property="element.User.username" :label="$t('poi.author')"
    show-overflow-tooltip sortable/>
    <el-table-column :formatter="creationDate" property="element.creation_date"
    :label="$t('path.created_date')" show-overflow-tooltip sortable/>
    <el-table-column property="element.gps_accuracy" label="Précision du GPS"
    show-overflow-tooltip sortable/>
    <el-table-column property="element.coordinate.lat" :label="$t('poi.lat')"
     show-overflow-tooltip sortable/>
     <el-table-column property="element.coordinate.long" :label="$t('poi.long')"
     show-overflow-tooltip sortable/>
     <el-table-column property="element.coordinate.alt" :label="$t('poi.alt')"
     show-overflow-tooltip sortable/>
  </el-table>
</template>

<script>
import { mapGetters } from 'vuex';

import format from '../../../utils/formatter';

export default {
  props: {
    bioverId: Number,
  },
  computed: {
    ...mapGetters('biovers', ['getTraceByBiovers']),
  },
  methods: {
    creationDate(row) {
      return format.dateFormatter(row.element.creation_date);
    },
  },
};
</script>
