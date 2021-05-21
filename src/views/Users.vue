<template>

    <Sidebar
        :header="sidebar.header"
        :backward="sidebar.backward"
        :items="sidebar.items"
    ></Sidebar>

    <div class="main-container">
        <div class="container-fluid"
            v-tooltip="{
                'displayArrow': true,
                theme: {
                    placement: 'top',
                    //width: 'fit-content',
                    'background-color': 'var(--color-gray)',
                    'color': 'var(--color-black)',
                    'font-size': 'var(--tooltip-font-size)'
                }
            }"
        >
            <Grid
                :data="users"
                :columns="columns"
            >
                <!-- <template v-slot:colLink="user">
                     <div v-tooltip="'Редактировать'">
                        <router-link :to="'/users/' + user.row.id">
                            <i class="fas fa-pen-square"></i>                        
                        </router-link>
                    </div>
                </template>
                <template v-slot:colButton="user">
                    <button>{{ user.row.id }}</button>
                </template> -->

                <template v-slot:id="user">
                    {{ user.row.id }}
                </template>
                <template v-slot:username="user">
                    {{ user.row.username }}
                </template>
                <template v-slot:email="user">
                    {{ user.row.email }}
                </template>
                <template v-slot:role="user">
                    {{ user.row.Role.name }}
                </template>
                <template v-slot:editUser="user">
                    <router-link :to="'/users/' + user.row.id">
                        <i class="fas fa-pen-square"></i>                        
                    </router-link>
                </template>

            </Grid>
        </div>
    </div>    
</template>

<script>
import UserService from "../services/user.service";
import Grid from "../components/Grid";
import Sidebar from "../components/Sidebar";
import { ref, onMounted } from 'vue';

export default {
    name: "Users",
    components: {
        Grid,
        Sidebar
    },
    setup() {
        const users = ref();

        onMounted(() => {
            UserService.getUsers().then(
                res => {
                    users.value = res.data;
                    console.log(`user: ${JSON.stringify(users.value)}`);
                },
                error => {
                    let err =
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString(); 
                    console.log(err);
                    // console.error(JSON.stringify(error));
                    //////////////////////////////////////////////////////////
                    if(error.response && error.response.status && error.response.status == this.$store.state.consts.httpStatus.Unathorized) {
                        this.$store.dispatch("auth/logout");
                        this.$router.push({ name: "login" });
                    }
                }
            )
        });

        const sidebar = {
            header: {       
                name: "usersSidebarHeader",             
                text: "Пользователи",
                description: "Все пользователи"
            },
            backward: null
            // {       
            //         name: "usersSidebarItem",             
            //         text: "Все пользователи",
            //         img: "fas fa-angle-left",
            //         path: "/users"
            // }
            ,
            items: [                                
                {
                    name: "addUserSidebarItem",
                    text: "Добавить пользователя",
                    img: "fas fa-user-plus",
                    path: "/register",
                    parent: "adminMenuItem"
                },
                {
                    name: "rolesSidebarItem",
                    text: "Роли",
                    img: "fas fa-user-tag",
                    path: "",
                    parent: "adminMenuItem"                    
                }
            ]
        }

        const columns = [
                {
                    name: "id",
                    header: "id"
                },
                {
                    name: "username",
                    header: "Имя"
                },
                {
                    name: "email",
                    header: "Эл. почта"
                },
                {
                    name: "role",
                    header: "Роль"
                },
                { 
                    name: "editUser",
                    // colLink: true,
                    header: ""
                },
                // {
                //     name: "editRole",
                //     colButton: true
                // }
            ]

        return { users, columns, sidebar }
    }
    // data() {
    //     return {
    //         users: [],
    //         columns: [
    //             { name: "id" },
    //             { name: "username" },
    //             { name: "email" },
    //             { name: "role" },
    //             { 
    //                 name: "editUser",
    //                 colLink: true
    //             },
    //             {
    //                 name: "editRole",
    //                 colButton: true
    //             }
    //         ],
    //         sidebar: {
    //             header: {       
    //                 name: "usersSidebarHeader",             
    //                 text: "Пользователи",
    //                 description: "Все пользователи"
    //             },
    //             backward: null
    //             // {       
    //             //         name: "usersSidebarItem",             
    //             //         text: "Все пользователи",
    //             //         img: "fas fa-angle-left",
    //             //         path: "/users"
    //             // }
    //             ,
    //             items: [                                
    //                 {
    //                     name: "addUserSidebarItem",
    //                     text: "Добавить пользователя",
    //                     img: "fas fa-user-plus",
    //                     path: "/register",
    //                     parent: "adminMenuItem"
    //                 },
    //                 {
    //                     name: "rolesSidebarItem",
    //                     text: "Роли",
    //                     img: "fas fa-user-tag",
    //                     path: "",
    //                     parent: "adminMenuItem"                    
    //                 }
    //             ]
    //         }
    //     };
    // },
    // mounted() {
    //     // UserService.getAdminBoard().then(
    //     //     res => {
    //     //         this.content = res.data;
    //     //     },
    //     //     error => {
    //     //         this.content =
    //     //             (error.response && error.response.data) ||
    //     //             error.message ||
    //     //             error.toString(); 
    //     //     }
    //     // );
    //     UserService.getUsers().then(
    //         res => {
    //             this.users = res.data;
    //             console.log(`user: ${JSON.stringify(this.users)}`);

    //         },
    //         error => {
    //             let err =
    //                 (error.response && error.response.data) ||
    //                 error.message ||
    //                 error.toString(); 
    //             console.log(err);
    //             // console.error(JSON.stringify(error));
    //             //////////////////////////////////////////////////////////
    //             // if(error.response && error.response.status && error.response.status == this.$store.state.consts.httpStatus.Unathorized) {
    //             //     this.$store.dispatch("auth/logout");
    //             //     this.$router.push({ name: "login" });
    //             // }
    //         }
    //     )

    // }
}
</script>