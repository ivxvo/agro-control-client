import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.js";
import { /*checkAuthorization,*/ toggleSidebar, checkPermission } from "./common/beforeEachRoute.js";


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

export const router = createRouter({
    history: createWebHistory(),  
    routes: routes
});

router.beforeEach(async (to, from) => {
    // const result = await checkAuthorization(to);
    // if(result === true) {
    //     return checkPermission(to, from);
    // }
    // return result;

    return checkPermission(to, from);
});

router.beforeResolve(to => {
    toggleSidebar(to);         
});
