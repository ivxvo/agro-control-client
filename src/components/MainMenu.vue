<template>

    <div class="left-menu">
        <div class="logo">
            <q-tooltip anchor="center right" self="center left">Начальная страница</q-tooltip>
            <router-link to="/dashboard">
                <font-awesome-icon :icon="['fas', 'seedling']"/>
            </router-link>
        </div>
        <div class="menu-items">
            <ul>                    
                <AccessControl :subject="item.permission" v-for="item in items" :key="item.name">
                    <li
                        :id="item.name"
                        :class="{ active: currentPath && item.path.startsWith('/' + currentPath) }"
                    >
                        <q-tooltip anchor="center right" self="center left">{{ item.tooltip }}</q-tooltip>
                        <router-link :to="item.path">
                            <font-awesome-icon :icon="item.img"/>
                        </router-link>
                    </li>
                </AccessControl>
            </ul>
        </div>
        <div class="logout">
            <ul>
                <li>
                    <q-tooltip anchor="center right" self="center left">Выйти из системы</q-tooltip>
                    <button @click="logout()">
                        <font-awesome-icon :icon="['fas', 'power-off']"/>
                    </button>
                </li>
            </ul>
        </div>            
    </div>

</template>

<script>

import AccessControl from "../components/AccessControl.vue";

import { useQuasar } from "quasar";

export default {
    name: "MainMenu", 
    components: {
        AccessControl
    },
    data() {
        return {
            $q: useQuasar(),
            selected: null,
            items:[
                {
                    name: "adminMenuItem",
                    tooltip: "Администрирование",
                    path: "/admin/users",
                    img: ["fas", "user-secret"],
                    permission: this.$PermissionSubject.administration
                },
                {
                    name: "cropRotationMenuItem",
                    tooltip: "Севооборот",
                    path: "/crop-rotation",
                    img: ["fas", "crop-alt"],
                    permission: this.$PermissionSubject.crop + this.$PermissionAction.read
                },
                
            ]
        }
    },
    computed: {
        currentPath() {
            return this.$route.path.split("/")[1];            
        }
    },
    methods: {
        logout() {            
            this.$q.dialog({
                title: "Подтверждение",
                message: "Желаете выйти из системы?",
                persistent: true,
                ok: {
                    label: "Выйти",
                    color: "light-blue-7",
                    // "text-color": "light-blue-1",
                    "no-caps": true
                },
                cancel: {
                    label: "Отмена",
                    color: "grey-1",
                    "text-color": "blue-grey-10",
                    "no-caps": true
                },
            }).onOk(() => {
                this.$store.dispatch("auth/logout");
                this.$router.push("/login");
            });
        }
    }
}
</script>

<style scoped>
    .left-menu {       
        background: #fff;
        width: 70px;
        height: 100vh;
        padding: 3px 5px;
        text-align: center;
        font-size: 16px;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        user-select: none;
    }

    .left-menu .logout {
        width: 70px;
        padding: 2px;
        position: fixed;
        bottom: 0;
        left: 0;        
        /* font-size: 18px; */
    }

    /* .left-menu .logout ul {
        
    } */

    .left-menu .menu-items ul,
    .left-menu .logout ul {
        list-style: none;
        padding: 0;
        margin-bottom: 1rem;
    }

    .left-menu .menu-items ul li,
    .left-menu .logout ul li {
        margin: 0;
        display: inline-block;
        /* position: relative; */
    }

    .left-menu .menu-items li.active a {
        background: var(--color-light-blue);
        color: var(--color-theme);
    }

    .left-menu .menu-items li.active a:hover {
        background: var(--color-light-blue);
        color: var(--color-theme);
    }

    .left-menu .menu-items a,
    .left-menu .logout button {
        padding: 5px 3px;
        width: 45px;
        height: 45px;
        border-radius: 25px;
        border: none;
        display: inline-block;
        background: #fff;
        color: var(--color-dark-gray);
        transition: all .15s ease-in-out;
        font-size: 20px;
    }

    .left-menu .menu-items li a:hover,
    .left-menu .logout li button:hover {
        background: var(--color-gray);
        color: var(--color-black);
    }

    .left-menu .menu-items li a svg
    /* ,.left-menu .logout li button svg  */
    {
        transform: scale(1);
        /* position: relative; */
        /* left: 1px;
        top: 0px; */
        vertical-align: middle;
    }

    .left-menu .menu-items li a:hover svg,
    .left-menu .logout li button:hover svg {
        transform: scale(1.2);
    }

    /* .left-menu .menu-items li a */

    .logo {
        width: 60px;
        height: 70px;
    }       

    .left-menu .logo svg {
        color: #00b377; /*var(--color-theme); /*#009966;*/

        width: 55px;
        height: 55px;
        vertical-align: middle;
        object-fit: contain;
        padding: 7px 0;
        /* margin-bottom: 15px; */
        transform: scale(1);
        transition: all 220ms cubic-bezier(0.2, 0, 0, 1);
    }

    .left-menu .logo svg:hover {
        transform: scale(1.2);
    }

    .left-menu .menu-items {
        height: calc(100vh - 150px);
    }    

</style>