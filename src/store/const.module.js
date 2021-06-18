const constants = {
    httpStatus: {
        Unauthorized: 401,
        NotFound: 404,
        ServerError: 500
    },
    result: {
        success: 1,
        error: 2
    }
};

export const consts = {
    namespaced: true,
    state: constants
}