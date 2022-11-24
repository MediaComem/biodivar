export const globalStore = {
    namespaced: true,
    state() {
        return {
            wait: false,
            currentTableOver: 0,
            currentEventOver: 0,
            currentTraceOver: 0,
            lastPoiClicked: 0,
            lastEventClicked: 0,
            lastTraceClicked: 0,
            currentTabClick: [],
            currentEventClick: [],
            currentTraceClick: [],
            poiConfigPreferences: null,
        };
    },
    mutations: {
        UPDATE_WAIT(state, wait) {
            state.wait = wait;
        },
        UPDATE_OVER(state, id) {
            state.currentTableOver = id;
        },
        UPDATE_LAST_POI_CLICK(state, id) {
            state.lastPoiClicked = id;
        },
        ADD_OR_REMOVE_CLICK(state, id) {
            const index = state.currentTabClick.findIndex((e) => e === id);
            index === -1 ? state.currentTabClick.push(id) : state.currentTabClick.splice(index, 1);
        },
        ADD_OR_REMOVE_POIS_CLICK(state, entries) {
            entries.forEach((poi) => {
                const index = state.currentTabClick.findIndex((e) => e === poi.element.id);
                index === -1 ? state.currentTabClick.push(poi.element.id) : state.currentTabClick.splice(index, 1);
            })  
        },
        REMOVE_CLICK(state, id) {
            const index = state.currentTabClick.findIndex((e) => e === id);
            if (index !== -1) state.currentTabClick.splice(index, 1);
        },
        UPDATE_EVENT_OVER(state, id) {
            state.currentEventOver = id;
        },
        UPDATE_LAST_EVENT_CLICK(state, id) {
            state.lastEventClicked = id;
        },
        ADD_OR_REMOVE_EVENT_CLICK(state, id) {
            const index = state.currentEventClick.findIndex((e) => e === id);
            index === -1 ? state.currentEventClick.push(id) : state.currentEventClick.splice(index, 1);
        },
        ADD_OR_REMOVE_EVENTS_CLICK(state, entries) {
            entries.forEach((event) => {
                const index = state.currentEventClick.findIndex((e) => e === event.element.id);
                index === -1 ? state.currentEventClick.push(event.element.id) : state.currentEventClick.splice(index, 1);
            })  
        },
        REMOVE_EVENT_CLICK(state, id) {
            const index = state.currentEventClick.findIndex((e) => e === id);
            if (index !== -1) state.currentEventClick.splice(index, 1);
        },
        UPDATE_TRACE_OVER(state, id) {
            state.currentTraceOver = id;
        },
        UPDATE_LAST_TRACE_CLICK(state, id) {
            state.lastTraceClicked = id;
        },
        ADD_OR_REMOVE_TRACE_CLICK(state, id) {
            const index = state.currentTraceClick.findIndex((e) => e === id);
            index === -1 ? state.currentTraceClick.push(id) : state.currentTraceClick.splice(index, 1);
        },
        ADD_OR_REMOVE_TRACES_CLICK(state, entries) {
            entries.forEach((trace) => {
                const index = state.currentTraceClick.findIndex((e) => e === trace.element.id);
                index === -1 ? state.currentTraceClick.push(trace.element.id) : state.currentTraceClick.splice(index, 1);
            })  
        },
        REMOVE_TRACE_CLICK(state, id) {
            const index = state.currentTraceClick.findIndex((e) => e === id);
            if (index !== -1) state.currentTraceClick.splice(index, 1);
        },
        SAVE_POI_PREFERENCES(state, preferences) {
            state.poiConfigPreferences = preferences;
        }
    },
    actions: {
        updateWait({ commit }, wait) {
            commit('UPDATE_WAIT', wait);
        },
        updateOver({ commit }, id) {
            commit('UPDATE_OVER', id);
        },
        updateLastPoiClick({ commit }, id) {
            commit('UPDATE_LAST_POI_CLICK', id);
        },
        addOrRemoveClickElement({ commit }, id) {
            commit('ADD_OR_REMOVE_CLICK', id);
        },
        addOrRemovePoisClick({ commit }, id) {
            commit('ADD_OR_REMOVE_POIS_CLICK', id);
        },
        removeClickElement({ commit }, id) {
            commit('REMOVE_CLICK', id);
        },
        updateEventOver({ commit }, id) {
            commit('UPDATE_EVENT_OVER', id);
        },
        updateLastEventClick({ commit }, id) {
            commit('UPDATE_LAST_EVENT_CLICK', id);
        },
        addOrRemoveEventClickElement({ commit }, id) {
            commit('ADD_OR_REMOVE_EVENT_CLICK', id);
        },
        removeEventClickElement({ commit }, id) {
            commit('REMOVE_EVENT_CLICK', id);
        },
        addOrRemoveEventsClick({ commit }, id) {
            commit('ADD_OR_REMOVE_EVENTS_CLICK', id);
        },
        updateTraceOver({ commit }, id) {
            commit('UPDATE_TRACE_OVER', id);
        },
        updateLastTraceClick({ commit }, id) {
            commit('UPDATE_LAST_TRACE_CLICK', id);
        },
        addOrRemoveTraceClickElement({ commit }, id) {
            commit('ADD_OR_REMOVE_TRACE_CLICK', id);
        },
        addOrRemoveTracesClick({ commit }, entries) {
            commit('ADD_OR_REMOVE_TRACES_CLICK', entries);
        },
        removeTraceClickElement({ commit }, id) {
            commit('REMOVE_TRACE_CLICK', id);
        },
        savePoiPreferences({ commit }, preferences) {
            commit('SAVE_POI_PREFERENCES', preferences);
        },
    },
    getters: {
        getcurrentTableOver(state) {
            return state.currentTableOver;
        },
        getcurrentLastPoiClick(state) {
            return state.lastPoiClicked;
        },
        getCurrentTabClick(state) {
            return state.currentTabClick;
        },
        getcurrentEventTableOver(state) {
            return state.currentEventOver;
        },
        getcurrentLastEventClick(state) {
            return state.lastEventClicked;
        },
        getCurrentEventTabClick(state) {
            return state.currentEventClick;
        },
        getcurrentTraceTableOver(state) {
            return state.currentTraceOver;
        },
        getcurrentLastTraceClick(state) {
            return state.lastTraceClicked;
        },
        getCurrentTraceTabClick(state) {
            return state.currentTraceClick;
        },
        getPoiConfigPreferences(state) {
            return state.poiConfigPreferences;
        }
    },
}