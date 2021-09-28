<template>
<div>
    <Sidebar
        :header="sidebar.header"
        :backward="sidebar.backward"
        :items="sidebar.items"
    ></Sidebar>

    <div class="main-container">
        <div class="container-fluid">

            <Modal v-if="showModalAddRole" @close="showModalAddRole = false">
                <template v-slot:header>
                    <h4>Создание роли</h4>
                </template>
                <template v-slot:body>
                    <q-input
                        v-model="creatingRole.name"
                        label="Наименование"
                        color="light-blue-7"
                    ></q-input>
                </template>
                <template v-slot:footer>
                    <button class="btn btn-primary" @click="addRole()">
                        <font-awesome-icon :icon="['fas', 'plus']"/>
                        Создать
                    </button>
                    <button class="btn btn-light" @click="showModalAddRole = false">
                        <font-awesome-icon :icon="['fas', 'times']"/>
                        Отмена
                    </button>
                </template>
            </Modal>

            <Modal
                v-if="showModalEditRole"
                @close="showModalEditRole = false"
                :containerStyle="{ width: '35rem' }"
            >
                <template v-slot:header>
                    <h4>Редактирование роли</h4>
                </template>
                <template v-slot:body>
                    <q-input
                        v-model="activeRole.name"
                        label="Наименование"
                        color="light-blue-7"
                    ></q-input>
                </template>
                <template v-slot:footer>
                        <button class="btn btn-danger" @click="deleteRole()">
                            <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                            Удалить
                        </button>
                        <button class="btn btn-primary" @click="editRole()">
                            <font-awesome-icon :icon="['fas', 'save']"/>
                            Сохранить
                        </button>
                        <button class="btn btn-light" @click="showModalEditRole = false">
                            <font-awesome-icon :icon="['fas', 'times']"/>
                            Отмена
                        </button>
                </template>
            </Modal>
            
            <div class="row">
                <div class="col-md-6">
                    <h5 class="pb-4">Список ролей</h5>
                </div>
            </div>                      

            <div class="row">            
                <div class="col-md-3 pr-5">
                    
                    <Dropdown2DB
                        class="pb-4"
                        :getData="getFilteredRoleProperty"
                        field="name"
                        label="Поиск роли"
                        :hideDropdownIcon="true"
                        :useInput="true"
                        @item-selected="onFilterChanged('roleId', $event)"
                    ></Dropdown2DB>

                    <ul class="list-group">
                        <li class="list-group-item"
                            v-for="role in roles"
                            :key="role.value"
                            :class="{ active: role.id === activeRole.id }"
                            @click="setActiveRole(role)"
                            @dblclick="showModalEditRole = true"
                        >
                            {{ role.name }}
                        </li>
                    </ul>                    

                </div>
                <div class="col-md-9 pl-5">
                    <q-tree
                        ref="permissionTree"
                        class="pb-5"
                        :nodes="permissions"
                        node-key="id"
                        :icon="iconfasCaretDown" 
                        v-model:ticked="activeRole.permissions"
                        tick-strategy="leaf"
                        control-color="teal"
                    >                        
                    </q-tree>
                    <button class="btn btn-primary" @click="editRole">
                        <font-awesome-icon :icon="['fas', 'save']"/>
                        Сохранить разрешения
                    </button>
                </div>
            </div>
            
        </div>
    </div>

</div>        
</template>

<script>

    import Sidebar from "../components/Sidebar.vue";
    import Modal from "../components/Modal.vue";
    import Dropdown2DB from "../components/Dropdown2DB.vue";

    import RoleService from "../services/role.service";
    import { permissionTree } from "../common/permissions";

    import Role from "../models/role.model";
    import Alert from "../models/alert.model";

    import { fasChevronRight } from "@quasar/extras/fontawesome-v5";
    import { notify } from "../plugins/notify";

    export default {
        name: "Roles",
        components: {
            Sidebar,
            Modal,            
            Dropdown2DB
        },
        data() {
            return {
                sidebar: {
                    header: {       
                        name: "rolesSidebarHeader",             
                        text: "Роли пользователей",
                        description: "Все роли"
                    },
                    backward: {       
                        name: "rolesSidebarBackward",             
                        text: "Все пользователи",
                        path: "/admin/users"
                    },
                    items: [                                
                        {
                            name: "addRoleSidebarItem",
                            text: "Добавить роль",
                            img: ["fas", "user-plus"],
                            action: () => { this.showModalAddRole = true },
                        },
                        
                    ]
                },   
                permissions: permissionTree,             
                roles: null,
                activeRole: new Role(),
                roleAlert: new Alert(),
                showModalAddRole: false,
                showModalEditRole: false,
                creatingRole: new Role(),
                filter: {},
                dropdownSource: [],
                iconfasCaretDown: fasChevronRight                
            }
        },        
        methods: {
            addRole() {
                RoleService.addRole(this.creatingRole).then(
                    res => {
                        notify({ type: res.data.result, msg: res.data.message });
                        this.getRoles();
                    },
                    error => {
                        if(error.response && error.response.status === this.$HttpStatus.Unauthorized) {
                            this.$store.dispatch("auth/logout");
                            this.$router.push({ name: "login" });
                        }
                        notify({ type: error.response.data.result, msg: error.response.data.message });
                    }
                );
                this.creatingRole = new Role();
                this.showModalAddRole = false;
            },
            editRole() {                
                RoleService.updateRole(this.activeRole).then(
                    res => {
                        notify({ type: res.data.result, msg: res.data.message });
                        this.getRoles();
                    },
                    error => {
                        if(error.response && error.response.status === this.$HttpStatus.Unauthorized) {
                            this.$store.dispatch("auth/logout");
                            this.$router.push({ name: "login" });
                        }

                        notify({ type: error.response.data.result, msg: error.response.data.message });
                    }
                );

                this.showModalEditRole = false;
            },
            deleteRole() {
                RoleService.deleteRole(this.activeRole).then(
                    res => {
                        notify({ type: res.data.result, msg: res.data.message });
                        this.getRoles();
                    },
                    error => {
                        if(error.response && error.response.status === this.$HttpStatus.Unauthorized) {
                            this.$store.dispatch("auth/logout");
                            this.$router.push({ name: "login" });
                        }

                        notify({ type: error.response.data.result, msg: error.response.data.message });
                    }
                );

                this.showModalEditRole = false;
            },
            setActiveRole(role) {               
                this.activeRole = role;
                this.activeRole.permissions = role.permissions ? role.permissions : [];
            },
            getRoles() {
                const params = {
                    filter: this.filter,
                    permissions: true
                };
                RoleService.getRoles(params).then(
                    res => {
                        this.roles = res.data;
                    },
                    error => {
                        if(error.response && error.response.status === this.$HttpStatus.Unauthorized) {
                            this.$store.dispatch("auth/logout");
                            this.$router.push({ name: "login" });
                        }

                        this.roleAlert = { result: error.response.data.result, message: error.response.data.message, caption: "Получение списка ролей" };
                    }
                );
            },
            getFilteredRoleProperty(params) {
                return RoleService.getFilteredRoleProperty(params);                
            },
            onFilterChanged(field, value) {
                if(value == null) {
                    delete this.filter[field];
                } else {
                    this.filter[field] = value;
                }

                this.getRoles();
            }
        },        
        mounted() {
            this.getRoles();
            this.$refs.permissionTree.expandAll();
        }
    }

</script>

<style scoped>

    li.active {
        background-color: var(--color-theme-blue);
        color: var(--color-work-area);
    }

    .modal-footer .btn.btn-danger {
        margin-right: auto;
    }

</style>