export const routes = [
    // {
    //     path: "/tutorials",
    //     alias: "/tutorials",
    //     name: "tutorials",
    //     component: () => import("./components/TutorialsList")
    // },
   
    {
        path: "/dashboards",
        name: "dashboards",
        component: () => import("./views/Home.vue")
    },    
    {
        path: "/login",
        name: "login",
        component: () => import("./views/Login.vue")
    },
    {
        path: "/admin/users/register",
        component: () => import("./views/Register.vue")
    },    
    {
        path: "/admin/users",
        name: "users",
        component: () => import("./views/Users.vue")
    },
    {
        path: "/admin/users/:id",
        name: "user-details",
        component: () => import("./views/EditUser.vue")
    },
    {
        path: "/admin/roles",
        name: "roles",
        component: () => import("./views/Roles.vue")
    },
];
