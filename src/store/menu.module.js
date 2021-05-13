export const menu = {
    namespaced: true,
    state() {
        return {
            showedSidebar: true,
        }
    },
    actions: {
        // login({ commit }, user) {
            
        // }
    },
    mutations: {
        showSidebar(state, showed) {
            state.showedSidebar = showed;
        }
    }
};