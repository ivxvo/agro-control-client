export function initGlobals(app) {
    app.config.globalProperties.ReqResult = Object.freeze({
        success: 1,
        error: 2
    });
    
    app.config.globalProperties.HttpStatus = Object.freeze({
        Unauthorized: 401,
        Forbidden: 403,
        NotFound: 404,
        ServerError: 500
    });
}