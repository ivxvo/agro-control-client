<template>
<div>
    <Sidebar
        :header="sidebar.header"
        :backward="sidebar.backward"
        :items="sidebar.items"
    ></Sidebar>

    <div class="main-container">
        <div class="container-fluid">
            <Modal v-if="showModal">
                <template v-slot:body>
                    Удалить пользователя '{{ selectedUser.username }}' ?
                </template>
                <template v-slot:footer>
                    <button class="btn btn-danger" @click="deleteUser(selectedUser.id)">
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
                    <div v-show="userAlert.result"
                        class="alert alert-dismissible fade show"
                        :class="{ 'alert-success': userAlert.result === ReqResult.success, 'alert-danger': userAlert.result === ReqResult.error }"
                    >
                        <h5>{{ userAlert.caption }}</h5>
                        <span>{{ userAlert.message }}</span>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>                   

                    <Grid
                        :data="users"
                        :pages="pages"
                        :columns="columns"
                        @order-changed="onOrderChanged($event)"
                        @page-changed="onPageChanged($event)"
                        @page-size-changed="onPageSizeChanged($event)"
                    >
                        <!-- <template v-slot:id-filter>
                            <Dropdown
                                @input-changed="onFilterChanged({ field: 'id', value: $event })"
                            >
                                <template v-slot:current-item="item">
                                    {{ item.current.name }}
                                </template>
                                <template v-slot:selected-item="item">
                                    {{ item.selected.name }}
                                </template>
                            </Dropdown>
                        </template> -->
                        <template v-slot:id-filter>
                            <Dropdown
                                @item-selected="onFilterChanged('userId', $event)"
                            >
                                <template v-slot:current-item="item">
                                    {{ item.current.label }}
                                </template>                                
                            </Dropdown>
                        </template>
                        <template v-slot:username-filter>
                            <Dropdown
                                @input-typed="getFilteredUserProperty('User', 'username', $event, 5)"
                                @item-selected="onFilterChanged('userId', $event)"
                            >
                                <template v-slot:current-item="item">
                                    {{ item.current.label }}
                                </template>                                
                            </Dropdown>
                        </template>
                        <template v-slot:email-filter>
                            <Dropdown
                                @input-typed="getFilteredUserProperty('User', 'email', $event, 5)"
                                @item-selected="onFilterChanged('userId', $event)"
                            >
                                <template v-slot:current-item="item">
                                    {{ item.current.label }}
                                </template>                                
                            </Dropdown>
                        </template>
                        <template v-slot:role-filter>
                            <Dropdown
                                @input-typed="getFilteredUserProperty('Role', 'name', $event, 5)"
                                @item-selected="onFilterChanged('roleId', $event)"
                            >
                                <template v-slot:current-item="item">
                                    {{ item.current.label }}
                                </template>                                
                            </Dropdown>
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
                        <template v-slot:edit-user="user">
                            <router-link class="btn btn-outline-primary btn-sm" :to="'/admin/users/' + user.row.id">
                                <font-awesome-icon :icon="['fas', 'pen']"/>                        
                            </router-link>
                        </template>
                        <template v-slot:delete-user="user">
                            <button class="btn btn-outline-danger btn-sm" @click="showModalWindow(user.row)">
                                <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                            </button>
                        </template>
                    </Grid>
                </div>
            </div>
        </div>
    </div>
    
</div>
</template>

<script>
import User from '../models/user.model';
import DropdownSearch from "../models/dropdownSearch.model";

import UserService from "../services/user.service";

import Grid from "../components/Grid.vue";
import Sidebar from "../components/Sidebar.vue";
import Modal from "../components/Modal.vue";
import Dropdown from "../components/Dropdown.vue";

export default {
    name: "Users",
    components: {
        Grid,
        Sidebar,
        Modal,
        Dropdown
    },
    data() {
        return {
            users: {},
            filter: {},
            pages: {},
            page: 1,
            pageSize: 25,
            order: null,
            // initialPaging: {
            //     filter: null,
            //     page: 1,
            //     size: 4
            // },
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
                        path: "/admin/users/register",
                    },
                    {
                        name: "rolesSidebarItem",
                        text: "Роли",
                        img: ["fas", "user-tag"],
                        path: "/admin/roles",
                    }
                ]
            },
            columns: [
                {
                    name: "id",
                    header: "id",
                    filter: "id-filter",
                    style: {
                        width: "10%"
                    }
                },
                {
                    name: "username",
                    header: "Имя",
                    filter: "username-filter",
                    style: {
                        width: "30%"
                    }
                },
                {
                    name: "email",
                    header: "Эл. почта",
                    filter: "email-filter",
                    style: {
                        width: "30%"
                    }
                },
                {
                    name: "role",
                    header: "Роль",
                    filter: "role-filter",
                    style: {
                        width: "20%"
                    }
                },
                { 
                    name: "edit-user",
                    header: null,
                    filter: null,
                    style: {
                        // "text-align": "right",
                        width: "1%"
                    }
                },
                {
                    name: "delete-user",
                    header: null,
                    filter: null,
                    style: {
                        // "text-align": "right",
                        width: "1%"
                    }
                }
            ]            
        }
    },
    computed: {
        userAlert() {         
            return this.$store.state.alert;
        }
    },
    methods: {
        // onFilterTyped(typedValue) {
        //     if(typedValue.length >= 3) {
        //         this.getFilteredUserProperty
        //     }
        // },
        onOrderChanged(order) {
            this.order = order;
            this.getUsers();
        },
        onPageChanged(page) {
            this.page = page;
            this.getUsers();
        },
        onPageSizeChanged(pageSize) {
            this.pageSize = pageSize;
            this.getUsers();
        },
        onFilterChanged(field, value) {
            if(value == null) {
                delete this.filter[field];
            } else {
                this.filter[field] = value;
            }

            this.getUsers();
        },        
        getUsers() {
            let params = {
                page: this.page,
                size: this.pageSize,
                order: this.order
            };
            
            params.filter = Object.keys(this.filter).length > 0 ? this.filter : null;            

            UserService.getUsers(params).then(
                res => {
                    this.users.countAll = res.data.countAll;
                    this.users.items = res.data.pagingItems;
                    this.pages.count = res.data.countPages;
                    this.pages.current = res.data.currentPage;
                },
                error => {                 
                    if(error.response && error.response.status === this.HttpStatus.Unauthorized) {
                        this.$store.dispatch("auth/logout");
                        this.$router.push({ name: "login" });
                    }

                    this.$store.commit("alert/setAlert", { result: error.response.data.result, message: error.response.data.message, caption: "Получение пользователей" });
                }                
            );
        },
        deleteUser(userId) {
            if(userId) {
                UserService.deleteUser(userId)
                .then(res => {
                    this.$store.commit("alert/setAlert", { result: res.data.result, message: res.data.message, caption: "Удаление пользователя" });
                })
                .catch(error => {                                       
                    if(error.response && error.response.status === this.HttpStatus.Unauthorized) {
                        this.$store.dispatch("auth/logout");
                        this.$router.push({ name: "login" });
                    }

                    this.$store.commit("alert/setAlert", { result: error.response.data.result, message: error.response.data.message, caption: "Удаление пользователя" });
                })
                .finally(() => {
                    this.showModal = false;
                    this.getUsers();
                });
            }
        },
        showModalWindow(user) {
            this.showModal = true;
            this.selectedUser = user;
        },
        getFilteredUserProperty(model, field, value, limit) {
            const params = new DropdownSearch(model, field, value, limit);
            UserService.getFilteredUserProperty(params).then(
                res => {
                    this.$store.commit("dropdown/setDropdownData", res.data);                   
                },
                error => {
                     if(error.response && error.response.status === this.HttpStatus.Unauthorized) {
                        this.$store.dispatch("auth/logout");
                        this.$router.push({ name: "login" });
                    }

                    this.$store.commit("alert/setAlert", { result: error.response.data.result, message: error.response.data.message, caption: "Получение атрибута фильтрации" });
                }
            );

        }
    },
    mounted() {
        this.getUsers();
    },
    unmounted() {
        this.$store.commit("alert/resetState");
    }
    
}
</script>