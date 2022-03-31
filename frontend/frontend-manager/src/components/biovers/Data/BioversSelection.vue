<template>
  <el-tabs v-model="editableTabsValue"
    type="card" class="demo-tabs"
    @tab-click="selectTab">
      <el-tab-pane
      label="BIOVERS"
      name="1"
      >
      <el-tree :data="data" show-checkbox @check="selectedBiovers"/>
      <el-button style="display: flex;" @click="showDialog = true">Créer un biover</el-button>
    </el-tab-pane>
    <el-tab-pane
      v-for="item in bioversToDisplay"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      >
        <DataTab :biovers="item.biover"
        :bioverId="item.biover.id" />
      </el-tab-pane>
  </el-tabs>
  <BioverCreator :showDialog="showDialog" @close-dialog="showDialog = false"/>
</template>

<script>
import { ref } from 'vue';
import { mapState, mapActions } from 'vuex';

import DataTab from './DataTab.vue';
import BioverCreator from '../Dialog/BioverCreator.vue';

export default {
  components: { DataTab, BioverCreator },
  watch: {
    ownBiovers: {
      deep: true,
      handler(newVal) {
        if (newVal.length !== this.currentBiovers.length) {
          const diff = newVal.filter((x) => !this.currentBiovers.includes(x));
          this.data[0].children.push({
            label: diff[0].name,
            id: diff[0].id,
          });
        }
      },
    },
  },
  data() {
    return {
      data: [],
      editableTabs: [{ title: 'POI', name: '1' }],
      editableTabsValue: ref('1'),
      index: 1,
      showDialog: false,
      currentBiovers: [],
    };
  },
  computed: {
    ...mapState('biovers', ['ownBiovers', 'publicBiovers', 'bioversToDisplay']),
  },
  methods: {
    selectedBiovers(event) {
      const index = this.bioversToDisplay.findIndex((biovers) => biovers.biover.id === event.id);
      if (index === -1) {
        this.index += 1;
        this.editableTabsValue = ref(`${this.index}`);
        this.addBioverToDisplay({ index: this.index, biover: event });
        this.addPoiToDisplay(event.id);
        this.addPathToDisplay(event.id);
      } else {
        this.removeBioverToDisplay(event.id);
      }
    },
    selectTab(event) {
      const tabIndex = this.bioversToDisplay.findIndex((b) => b.name === event.props.name);
      if (tabIndex !== -1) {
        this.setCurrentBiover(this.bioversToDisplay[tabIndex].biover.id);
      } else {
        this.setCurrentBiover(0);
      }
    },
    ...mapActions('biovers', ['addBioverToDisplay', 'removeBioverToDisplay', 'addPoiToDisplay', 'addPathToDisplay', 'setCurrentBiover']),
  },
  mounted() {
    this.currentBiovers = Array.from(this.ownBiovers);
    const own = [];
    this.ownBiovers.forEach((biover) => {
      own.push({
        label: biover.name,
        id: biover.id,
      });
    });
    this.data.push({
      label: 'Mes Biovers',
      children: own,
      disabled: true,
    });
    const publicB = [];
    this.publicBiovers.forEach((biover) => {
      publicB.push({
        label: biover.name,
        id: biover.id,
      });
    });
    this.data.push({
      label: 'Biovers Publiques',
      children: publicB,
      disabled: true,
    });
  },
};
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  background-color: #f4f5f7;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
