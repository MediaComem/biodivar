export const globalStore = {
    namespaced: true,
    state() {
        return {
            wait: false,
            currentTableOver: 0,
            currentEventOver: 0,
            currentTabClick: [],
            currentEventClick: [],
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
        getPoiConfigPreferences(state) {
            return state.poiConfigPreferences;
        }
    },
}