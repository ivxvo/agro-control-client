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
            <Modal v-if="showModal">
                <template v-slot:body>
                    Удалить пользователя '{{ selectedUser.username }}' ?
                </template>
                <template v-slot:footer>
                    <button class="btn btn-danger" @click="showModal = false">
                        <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                        Удалить
                    </button>
                    <button class="btn btn-light" @click="showModal = false">
                        <font-awesome-icon :icon="['fas', 'times']"/>
                        Отмена
                    </button>
                </template>
            </Modal>

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
                        :retrieveData="getUsers"
                        :columns="columns"                        
                    >
                        <template v-slot:id-filter>
                            <input type="text" class="form-control" v-model="filter.id" @change="getUsers({ page: 1, size: 4 })">
                        </template>
                        <template v-slot:username-filter>
                            <input type="text" class="form-control" v-model="filter.username">
                        </template>
                        <template v-slot:email-filter>
                            <input type="text" class="form-control" v-model="filter.email">
                        </template>
                        <template v-slot:role-filter>
                            <input type="text" class="form-control" v-model="filter.role">
                        </template>

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
                        <template v-slot:deleteUser="user">
                            <button class="btn btn-outline-danger btn-sm" @click="showModalWindow(user.row)">
                                <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                            </button>
                        </template>
                    </Grid>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import UserService from "../services/user.service";
import Grid from "../components/Grid.vue";
import Sidebar from "../components/Sidebar.vue";

import Modal from "../components/Modal.vue";
import User from '../models/user';

export default {
    name: "Users",
    components: {
        Grid,
        Sidebar,
        Modal
    },
    data() {
        return {
            users: {},
            filter: {},
            pages: {},
            initialPaging: {
                filter: null,
                page: 1,
                size: 4
            },
            showModal: false,
            selectedUser: new User(),
            sidebar: {
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
            },
            columns: [
                {
                    name: "id",
                    header: "id",
                    filter: "id-filter"
                },
                {
                    name: "username",
                    header: "Имя",
                    filter: "username-filter"
                },
                {
                    name: "email",
                    header: "Эл. почта",
                    filter: "email-filter"
                },
                {
                    name: "role",
                    header: "Роль",
                    filter: "role-filter"
                },
                { 
                    name: "editUser",
                    // colLink: true,
                    header: "",
                    filter: ""
                },
                {
                    name: "deleteUser",
                    header: "",
                    filter: ""
                }
            ]            
        }
    },
    methods: {
        getUsers(paging) {
            paging.filter = Object.keys(this.filter).length > 0 ? this.filter : null;

            UserService.getUsers(paging).then(
                res => {
                    console.log(res.data.message);

                    this.users.countAll = res.data.countAll;
                    this.users.pagingItems = res.data.pagingItems;
                    this.pages.count = res.data.countPages;
                    this.pages.current = res.data.currentPage;
                },
                error => {
                    // this.message =
                    //     (error.response && error.response.data) ||
                    //     error.message ||
                    //     error.toString();
                    // this.successful = false;
                    console.log(error.response);
                    console.log(error.response.data.message);                    

                    if(error.response && error.response.status === this.HttpStatus.Unauthorized) {
                        this.$store.dispatch("auth/logout");
                        this.$router.push({ name: "login" });
                    }
                }                
            );
        },
        showModalWindow(user) {
            this.showModal = true;
            this.selectedUser = user;
        }
    },
    mounted() {
        this.getUsers(this.initialPaging);
    }
    
}
</script>