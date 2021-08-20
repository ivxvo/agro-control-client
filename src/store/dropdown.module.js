const getDefaultState = () => {
    return {
        data: null
    };
};

export const dropdown = {
    namespaced: true,
    state() {
        return getDefaultState();
    },   
    mutations: {
        resetState(state) {
            Object.assign(state, getDefaultState());
        },
        setDropdownData(state, dropdownData) {
            state.data = dropdownData;
        }
    }
};