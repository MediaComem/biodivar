<template>
  <el-table ref="multipleTableRef" :data="getEventByBiovers(bioverId)" style="width: 100%">
    <el-table-column property="name" :label="$t('path.biover')" width="150" sortable/>
    <el-table-column property="element.id" label="User Trace ID" show-overflow-tooltip sortable/>
    <el-table-column property="element.User.username" :label="$t('poi.author')"
    show-overflow-tooltip sortable/>
    <el-table-column property="element.data" label="Event"
     show-overflow-tooltip sortable/>
  </el-table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    bioverId: Number,
  },
  computed: {
    ...mapGetters('biovers', ['getEventByBiovers']),
  },
};
</script>
