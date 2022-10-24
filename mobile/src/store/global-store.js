export const globalStore = {
    namespaced: true,
    state() {
        return {
            wait: false,
            currentTableOver: 0,
            currentTabClick: [],
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
    },
    getters: {
        getcurrentTableOver(state) {
            return state.currentTableOver;
        },
        getCurrentTabClick(state) {
            return state.currentTabClick;
        },
    },
}