import { createRouter, createWebHistory } from "vue-router";
import { getRoutes } from "./routes.js";
import { checkAuthorization, toggleSidebar, checkPermission } from "./common/beforeEachRoute.js";


// const router = createRouter({
//     history: createWebHistory(),  
//     routes: getRoutes()
// });

// router.beforeResolve(to => {
//     checkPermission(to);
// });

// router.beforeEach((to) => {
//     checkAuthorization(to);
//     toggleSidebar(to);
// });

// export { router };

export const getRouter = (subject, action) => {
    const router = createRouter({
        history: createWebHistory(),  
        routes: getRoutes(subject, action)
    });

    router.beforeEach(to => {
        checkAuthorization(to);
        return checkPermission(to);
    });

    router.beforeResolve(to => {
        toggleSidebar(to);         
    });

    return router;
}