// import Register from "./views/Register.vue";
export const routes = [
    {
        path: "/tutorials",
        alias: "/tutorials",
        name: "tutorials",
        component: () => import("./components/TutorialsList")
    },
    {
        path: "/tutorials/:id",
        name: "tutorial-details",
        component: () => import("./components/Tutorial")
    },
    {
        path: "/add",
        name: "add",
        component: () => import("./components/AddTutorial")
    },
    {
        path: "/",
        name: "home",
        component: () => import("./views/Home.vue")
    },
    {
        path: "/home",
        component: () => import("./views/Home.vue")
    },
    {
        path: "/login",
        name: "login",
        component: () => import("./views/Login.vue")
    },
    {
        path: "/register",
        component: () => import("./views/Register.vue")
    },
    // {
    //     path: "/register",
    //     component: Register
    // },
    {
        path: "/profile",
        name: "profile",
        component: () => import("./views/Profile.vue")
    },
    // {
    //     path: "/admin",
    //     name: "admin",
    //     component: () => import("./views/BoardAdmin.vue")
    // },
    {
        path: "/mod",
        name: "moderator",
        component: () => import("./views/BoardModerator.vue")
    },
    {
        path: "/user",
        name: "user",
        component: () => import("./views/BoardUser.vue")
    },
    {
        path: "/users",
        name: "users",
        component: () => import("./views/Users.vue")
    },
    {
        path: "/users/:id",
        name: "user-details",
        component: () => import("./views/EditUser.vue")
    },
];
