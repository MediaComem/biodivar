<template>
  <el-row :gutter="20" style="height: 75vh">
    <el-col :span="6">
      <Selector v-if="ownerBiovers.data" :ownerBiovers="getOwnerBiovers"
      :publicBiovers="getPublicBiovers"/>
    </el-col>
    <el-col :span="18">
      <Map v-if="ownerBiovers.data" :biovers="ownerBiovers.data[0]"/>
    </el-col>
  </el-row>
</template>
<script>
import Map from '../components/biovers/Map.vue';
import Selector from '../components/biovers/Selector.vue';

import getData from '../api/biovers';

export default {
  components: {
    Map,
    Selector,
  },
  data() {
    return {
      ownerBiovers: {},
      publicBiovers: {},
    };
  },
  methods: {
    async getPublic() {
      const result = await getData.getPublicBiovers();
      this.publicBiovers = result.data;
    },
    async getOwner() {
      const result = await getData.getBioversByUser(4);
      this.ownerBiovers = result.data;
    },
  },
  computed: {
    getPublicBiovers() {
      return this.publicBiovers.data;
    },
    getOwnerBiovers() {
      return this.ownerBiovers.data;
    },
  },
  async mounted() {
    await this.getOwner();
    await this.getPublic();
  },
};
</script>

<style scoped></style>
