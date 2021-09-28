const NotifyType = Object.freeze({
    success: 1,
    error: 2,
    warning: 3,
    info: 4,
    neutral: 5
});

const HttpStatus = Object.freeze({
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    Gone: 410,
    ServerError: 500
});

const PermissionSubject = Object.freeze({
    administration: 1,
    fields: 2,
    cropRotation: 3,
    crop: 4,
    grow: 5
});

const PermissionAction = Object.freeze({
    create: 1000,
    read: 2000,
    update: 3000,
    delete: 4000
});

function initGlobals(app) {
    app.config.globalProperties.$NotifyType = NotifyType;    
    app.config.globalProperties.$HttpStatus = HttpStatus;
    app.config.globalProperties.$PermissionSubject = PermissionSubject;
    app.config.globalProperties.$PermissionAction = PermissionAction;
}


export { initGlobals,
    NotifyType,
    HttpStatus,
    PermissionSubject,
    PermissionAction
}