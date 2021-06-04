import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.js";
import { checkAuthorization, toggleSidebar } from "./common/beforeEachRoute.js";

const router = createRouter({
    history: createWebHistory(),  
    routes: routes
});

router.beforeEach((to, from, next) => {
    checkAuthorization(to, next);
    toggleSidebar(to);
});

export { router };