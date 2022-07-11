<template>
  <el-tabs v-model="editableTabsValue"
    type="card" class="demo-tabs"
    @tab-click="selectTab">
      <el-tab-pane
      label="BIOVERS"
      name="1"
      >
      <el-tree ref="tree" node-key="id" :data="data" show-checkbox @check="selectedBiovers"/>
      <el-button style="display: flex;" @click="showDialog = true">
        {{ $t('biover.create') }}
      </el-button>
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
        if (newVal.length !== this.data[0].length) {
          const diff = newVal.filter((x) => !this.data[0].children
            .some((child) => child.id === x.id));
          diff.forEach((element) => {
            this.data[0].children.push({
              label: element.name,
              id: element.id,
            });
          });
        }
      },
    },
    publicBiovers: {
      deep: true,
      handler(newVal) {
        if (newVal.length !== this.data[1].length) {
          const diff = newVal.filter((x) => !this.data[1].children
            .some((child) => child.id === x.id));
          diff.forEach((element) => {
            this.data[1].children.push({
              label: element.name,
              id: element.id,
            });
          });
        }
      },
    },
    bioversToDisplay: {
      deep: true,
      handler(newVal) {
        if (this.addBioversInTab && newVal.length > 0) {
          this.editableTabsValue = ref(newVal[newVal.length - 1].name);
          const checked = [];
          newVal.forEach((val) => {
            checked.push(val.biover.id);
          });
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(checked, false);
          });
        }
      },
    },
  },
  data() {
    return {
      data: [{
        id: 0,
        label: 'Mes Biovers',
        children: [],
        disabled: true,
      },
      {
        id: -1,
        label: 'Biovers Publiques',
        children: [],
        disabled: true,
      },
      ],
      editableTabsValue: ref('1'),
      showDialog: false,
    };
  },
  computed: {
    ...mapState('biovers', ['ownBiovers', 'publicBiovers', 'bioversToDisplay', 'addBioversInTab']),
  },
  methods: {
    selectedBiovers(event) {
      const index = this.bioversToDisplay.findIndex((biovers) => biovers.biover.id === event.id);
      if (index === -1) {
        this.addBioverToDisplay(event);
        this.addPoiToDisplay(event.id);
        this.addPathToDisplay(event.id);
        this.addTraceToDisplay(event.id);
        this.addEventToDisplay(event.id);
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
    ...mapActions('biovers', ['addBioverToDisplay', 'removeBioverToDisplay', 'addPoiToDisplay', 'addPathToDisplay', 'addTraceToDisplay', 'addEventToDisplay', 'setCurrentBiover']),
  },
  deactivated() {
    this.data[0].children = [];
    this.data[1].children = [];
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
