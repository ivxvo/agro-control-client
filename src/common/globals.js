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

    app.config.globalProperties.ColumnFilterType = Object.freeze({
        text: 1,
        dropdown: 2
    });

    app.config.globalProperties.PermissionSubject = Object.freeze({
        administration: 1,
        fields: 2,
        cropRotation: 3,
        crop: 4,
        grow: 5
    });

    app.config.globalProperties.PermissionAction = Object.freeze({
        create: 1000,
        read: 2000,
        update: 3000,
        delete: 4000
    });
}