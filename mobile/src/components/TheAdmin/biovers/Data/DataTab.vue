<template>
  <div>
    <div class="layout table-row-layout">
      <div class="layout-border">
        <div class="button-border-layout" :class="{'remove-border': currentTab === 1}">
        <button
          class="button-layout"
          @click="selectTab(1)"
          :class="{'background-black': currentTab === 1}"
        >
          <p class="material-symbols-sharp text-margin">pin_drop</p>
          <p class="name-element">Points [{{ getPoisByBiover(bioverId).length }}]</p>
        </button>
        </div>
        <div class="button-border-layout" :class="{'remove-border': currentTab === 2}">
        <button
          class="button-layout"
          @click="selectTab(2)"
          :class="{'background-black': currentTab === 2}"
        >
          <p class="material-symbols-sharp text-margin">timeline</p>
          <p class="name-element">Lignes [{{ getPathsByBiover(bioverId).length }}]</p>
        </button>
        </div>    
        <div class="button-border-layout" :class="{'remove-border': currentTab === 3}">
        <button
          class="button-layout"
          @click="selectTab(3)"
          :class="{'background-black': currentTab === 3}"
        >
          <p class="material-symbols-sharp text-margin">footprint</p>
          <p class="name-element">Traces [{{ getTraceByBioversAndUser(bioverId).length }}]</p>
        </button>
        </div>
        <div class="button-border-layout" :class="{'remove-border': currentTab === 4}">
        <button
          class="button-layout"
          @click="selectTab(4)"
          :class="{'background-black': currentTab === 4}"
        >
          <p class="material-symbols-sharp text-margin">touch_app</p>
          <p class="name-element">Actions [{{ getEventByBioversAndUser(bioverId).length }}]</p>
        </button>
        </div>
        <div class="button-border-layout" :class="{'remove-border': currentTab === 5}">
        <button
          class="button-layout"
          @click="selectTab(5)"
          :class="{'background-black': currentTab === 5}"
        >
          <p class="material-symbols-sharp text-margin">tune</p>
          <p class="name-element">Paramètres</p>
        </button>
        </div>
      </div>
    </div>

    <div class="data-table-layout">
      <PoiTable v-show="currentTab === 1" :bioverId="bioverId" />
      <PathTable v-show="currentTab === 2" :bioverId="bioverId" />
      <TraceTable v-show="currentTab === 3" :bioverId="bioverId" />
      <EventTable v-show="currentTab === 4" :bioverId="bioverId" />
      <ParameterTable v-show="currentTab === 5" :bioverId="bioverId" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import PoiTable from './PoiTable.vue';
import PathTable from './PathTable.vue';
import ParameterTable from './ParameterTable.vue';
import TraceTable from './TraceTable.vue';
import EventTable from './EventTable.vue';

export default {
  props: {
    bioverId: Number,
  },
  components: {
    PoiTable,
    PathTable,
    ParameterTable,
    TraceTable,
    EventTable,
  },
  data() {
    return {
      currentTab: 1,
    };
  },
  methods: {
    selectTab(tabId) {
      this.currentTab = tabId;
    }
  },
  computed: {
    ...mapGetters('biovers', ['getPoisByBiover', 'getPathsByBiover', 'getTraceByBioversAndUser', 'getEventByBioversAndUser']),
  },
};
</script>

<style scoped>
@import './table-header.css';

.layout {
  padding-top: 8px;
  margin-left: 8px;
  margin-right: 8px;
}

.data-table-layout {
  padding-bottom: 8px;
}

button {
  color: white;
  background-color: #666666;
  padding: 0px !important;
}

p {
  padding-right: 8px;
}

.text-margin {
  padding-left: 6px;
}
</style>

