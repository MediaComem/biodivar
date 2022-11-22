export const globalStore = {
    namespaced: true,
    state() {
        return {
            wait: false,
            currentTableOver: 0,
            currentEventOver: 0,
            currentTraceOver: 0,
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
        ADD_OR_REMOVE_CLICK(state, id) {
            const index = state.currentTabClick.findIndex((e) => e === id);
            index === -1 ? state.currentTabClick.push(id) : state.currentTabClick.splice(index, 1);
        },
        REMOVE_CLICK(state, id) {
            const index = state.currentTabClick.findIndex((e) => e === id);
            if (index !== -1) state.currentTabClick.splice(index, 1);
        },
        UPDATE_EVENT_OVER(state, id) {
            state.currentEventOver = id;
        },
        ADD_OR_REMOVE_EVENT_CLICK(state, id) {
            const index = state.currentEventClick.findIndex((e) => e === id);
            index === -1 ? state.currentEventClick.push(id) : state.currentEventClick.splice(index, 1);
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
        addOrRemoveClickElement({ commit }, id) {
            commit('ADD_OR_REMOVE_CLICK', id);
        },
        removeClickElement({ commit }, id) {
            commit('REMOVE_CLICK', id);
        },
        updateEventOver({ commit }, id) {
            commit('UPDATE_EVENT_OVER', id);
        },
        addOrRemoveEventClickElement({ commit }, id) {
            commit('ADD_OR_REMOVE_EVENT_CLICK', id);
        },
        removeEventClickElement({ commit }, id) {
            commit('REMOVE_EVENT_CLICK', id);
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
        getCurrentTabClick(state) {
            return state.currentTabClick;
        },
        getcurrentEventTableOver(state) {
            return state.currentEventOver;
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