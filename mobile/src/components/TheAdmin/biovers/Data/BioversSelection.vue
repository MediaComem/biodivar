<template>
<div id="biover-selection">
  <el-tabs v-model="editableTabsValue"
    type="card" class="demo-tabs"
    @tab-click="selectTab">
      <el-tab-pane name="1">
        <template #label>
          <span class="custom-tabs-label">
            <p class="material-symbols-sharp" style="margin:0">help</p>
            <span>Biovers</span>
          </span>
        </template>
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
</div>
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

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  background-color: #323232;
  color: white;
  font-size: 32px;
  font-weight: 600;
  border: 1px solid white;
}

.demo-tabs > .el-tabs__header {
  margin: 0px;
}

.el-tabs__item.is-active {
  color: white !important;
  border-bottom: 0px !important;
}

.el-tabs__item {
  color: white !important;
}

.el-tabs__item {
  color: white;
  margin-right: 20px;
  background-color: #323232;
}

.el-tabs--card>.el-tabs__header .el-tabs__nav {
  border: 0px !important;
}

.el-tabs--card>.el-tabs__header .el-tabs__item {
  border-bottom: 1px solid;
  border-bottom-color: white !important;
  border-left: 1px solid white;
  border-top: 1px solid white;
  border-right: 1px solid white;
}

.el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
  border-left: 1px solid white !important;
}

.el-tabs--card>.el-tabs__header {
  border: 0px !important;
}

#biover-selection>.el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
  background-color: #F2F2F2;
  color: black !important;
}
</style>
