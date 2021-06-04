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
            <div class="row">
                <div class="col-md-6">
                    <h5 class="pb-2">Список пользователей</h5>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <Grid
                        :data="users"
                        :pages="pages"
                        :handlePageChange="getUsers"
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
                            <router-link class="btn btn-outline-primary btn-sm" :to="'/users/' + user.row.id">
                                <font-awesome-icon :icon="['fas', 'pen']"/>                        
                            </router-link>
                        </template>

                    </Grid>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import UserService from "../services/user.service";
import Grid from "../components/Grid";
import Sidebar from "../components/Sidebar";
import { onMounted, reactive } from 'vue';

export default {
    name: "Users",
    components: {
        Grid,
        Sidebar
    },
    setup() {
        const users = reactive({});
        const pages = reactive({});
        const initialPaging = {
            filter: null,
            page: 1,
            size: 4
        };

        onMounted(() => {
            getUsers(initialPaging);
        });       

        const getUsers = (paging) => {
            UserService.getUsers(paging).then(
                res => {
                    users.countAll = res.data.countAll;
                    users.pagingItems = res.data.pagingItems;
                    pages.count = res.data.countPages;
                    pages.current = res.data.currentPage;
                },
                error => {
                    // this.message =
                    //     (error.response && error.response.data) ||
                    //     error.message ||
                    //     error.toString();
                    // this.successful = false;
                    console.log(error.response);

                    if(error.response && error.response.status === this.HttpStatus.Unauthorized) {
                        this.$store.dispatch("auth/logout");
                        this.$router.push({ name: "login" });
                    }
                }
                // error => {
                //     let err =
                //         (error.response && error.response.data) ||
                //         error.message ||
                //         error.toString(); 
                //     console.log(err);
                //     // console.error(JSON.stringify(error));
                //     //////////////////////////////////////////////////////////
                //     if(error.response && error.response.status && error.response.status == this.$store.state.consts.httpStatus.Unathorized) {
                //         this.$store.dispatch("auth/logout");
                //         this.$router.push({ name: "login" });
                //     }
                // }
            )
        };

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
                    img: ["fas", "user-plus"],
                    path: "/users/register",
                    parent: "adminMenuItem"
                },
                {
                    name: "rolesSidebarItem",
                    text: "Роли",
                    img: ["fas", "user-tag"],
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

        return { users, pages, columns, sidebar, getUsers }
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