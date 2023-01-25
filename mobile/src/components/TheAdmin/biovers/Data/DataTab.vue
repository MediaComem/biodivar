<template>
  <div>
    <div class="layout">
      <div class="button-border-layout" :class="{'remove-border': currentTab === 1}">
      <button
        @click="selectTab(1)"
        :class="{'button-focus': currentTab === 1}"
      >
        <p class="material-symbols-sharp text-margin">pin_drop</p>
        <p class="name-element">Points d'intérêt [{{ getPoisByBiover(bioverId).length }}]</p>
      </button>
      </div>
      <div class="button-border-layout" :class="{'remove-border': currentTab === 2}">
      <button
        @click="selectTab(2)"
        :class="{'button-focus': currentTab === 2}"
      >
        <p class="material-symbols-sharp text-margin">gesture</p>
        <p class="name-element">Lignes [{{ getPathsByBiover(bioverId).length }}]</p>
      </button>
      </div>    
      <div class="button-border-layout" :class="{'remove-border': currentTab === 3}">
      <button
        @click="selectTab(3)"
        :class="{'button-focus': currentTab === 3}"
      >
        <p class="material-symbols-sharp text-margin">footprint</p>
        <p class="name-element">Traces [{{ getTraceByBioversAndUser(bioverId).length }}]</p>
      </button>
      </div>
      <div class="button-border-layout" :class="{'remove-border': currentTab === 4}">
      <button
        @click="selectTab(4)"
        :class="{'button-focus': currentTab === 4}"
      >
        <p class="material-symbols-sharp text-margin">touch_app</p>
        <p class="name-element">Actions [{{ getEventByBioversAndUser(bioverId).length }}]</p>
      </button>
      </div>
      <div class="button-border-layout" :class="{'remove-border': currentTab === 5}">
      <button
        @click="selectTab(5)"
        :class="{'button-focus': currentTab === 5}"
      >
        <p class="material-symbols-sharp text-margin">tune</p>
        <p class="name-element">Paramètres</p>
      </button>
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
.layout {
  display: flex;
  flex-wrap: wrap;
  padding-top: 8px;
  margin-left: 8px;
  margin-right: 8px;
  border-bottom: 1px solid white;
}

.name-element {
      margin-top: 17px;
}

.data-table-layout {
  padding-bottom: 8px;
}

button {
  color: white;
  background-color: #666666;
  padding: 0px !important;
  cursor: pointer;
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  border: 0px;
}

.button-focus {
  background-color: black;
}

p {
  padding-right: 8px;
}

.text-margin {
  padding-left: 6px;
}

.button-border-layout {
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: #FFFFFF;
  border-radius: 2px 2px 0px 0px;
  margin-right: 5px;
}

.remove-border {
  border-bottom: 1px solid black !important;
  margin-bottom: -1px;
}
</style>

