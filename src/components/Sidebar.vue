<template>
<div>

    <button
            class="sidebar-toggle"
            :class="{ 'showed-sidebar': showed }"
            @click="toggleSidebar"
    >
        <q-tooltip>{{ sidebarToggleTip }}</q-tooltip>
        <span v-show="showed">
            <font-awesome-icon :icon="['fas', 'angle-left']"/>
        </span>
        <span v-show="!showed">
            <font-awesome-icon :icon="['fas', 'angle-right']"/>
        </span>
    </button>

    <div v-show="showed" class="left-sidebar">
        <div class="left-sidebar-content">
            <h4>{{ header.text }}</h4>
            <p>{{ header.description }}</p>
            <div v-if="backward != null">
                <router-link
                    :to="backward.path"
                    class="list-group-item list-group-item-action"
                >
                    <font-awesome-icon :icon="['fas', 'angle-left']"/>
                    {{ backward.text }}
                </router-link>
            </div>
            <hr class="horizontal" v-show="backward != null && items != null">
            <div>
                <ul class="list-group">
                    <li v-for="item in items"
                        :key="item.name"
                        :class="{ active: item.name == selected }"                        
                    >
                        <div v-if="item.path">
                            <router-link
                                :to="item.path"
                                class="list-group-item list-group-item-action"                            
                            >
                                <font-awesome-icon :icon="item.img"/>
                                {{ item.text }}
                            </router-link>        
                        </div>            
                        <div v-else-if="item.action">
                            <button
                                @click="item.action"
                                class="list-group-item list-group-item-action"
                            >
                                <font-awesome-icon :icon="item.img"/>
                                {{ item.text }}
                            </button>
                        </div>
                    </li>
                </ul>                  
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    name: "Sidebar",   
    props: {
        header: Object,
        backward: Object,
        items: Array
    },
    data() {
        return {
            selected: null,
            
        }
    },
    computed: {        
        showed() {
           return this.$store.state.menu.showedSidebar;
        },
        sidebarToggleTip() {
            return this.showed ? "Свернуть меню" : "Развернуть меню"
        }
    },
    methods: {                  
        toggleSidebar() {
            this.$store.commit("menu/showSidebar", !this.showed);
        }
    }
}
</script>

<style scoped>

    .left-sidebar {
        /* margin-left: 70px; */
        top: 0;
        left: 70px;
        position: fixed;
        height: 100vh;
        width: 250px;
        border-left: 1px solid var(--color-light-gray);
        background-color: var(--color-work-area);
    }

    .left-sidebar-content {
        padding-top: 17px;
        padding-right: 10px;
        padding-bottom: 20px;
        margin-left: 10px;
    }

    .left-sidebar .left-sidebar-content ul {
        list-style: none;
        padding: 0;
        /* display: flex;
        flex-direction: column;
        justify-content: space-around; */
    }

    /* .left-sidebar .left-sidebar-content ul li {
        display: inline-block;
    } */

    .left-sidebar .left-sidebar-content svg {
        padding: 10px 1px;
        width: 33px;
        height: 33px;
        border-radius: 25px;
        display: inline-block;
        background: var(--color-light-gray);
        color: var(--color-theme);
        transition: all .15s ease-in-out;
        vertical-align: middle;
        margin-right: 3px;
    }

    .left-sidebar .left-sidebar-content a {
        padding: 7px 5px;
        border-radius: 25px;
    }

    .left-sidebar .left-sidebar-content button {
        padding: 7px 5px;
        border-radius: 25px;
    }

    .left-sidebar .left-sidebar-content li.active a {
        background-color: var(--color-light-blue);
    }

    .left-sidebar .left-sidebar-content li.active a svg {
        color: var(--color-work-area);
        background-color: var(--color-theme);
    }

    .left-sidebar .left-sidebar-content a:hover {
        background: var(--color-ultra-light-gray);
    }

    .left-sidebar .left-sidebar-content button:hover {
        background: var(--color-ultra-light-gray);
    }

    .left-sidebar .left-sidebar-content a:hover svg {
        transform: scale(1.1);
    }

    .left-sidebar .left-sidebar-content button:hover svg {
        transform: scale(1.1);
    }
    
    /* .left-sidebar .left-sidebar-content a {
        padding-bottom: 15px;
    }

     .left-sidebar .left-sidebar-content a svg {
        transform: scale(1);
        position: relative;
        left: 1px;
        top: 0px;
    } */

    .list-group-item {
        border: none;
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-black);
    }

    .list-group-item.active {
        color: var(--color-theme);
        background-color: var(--color-light-blue);
        border-color: var(--color-light-blue);
    }

    .sidebar-toggle {
        background-color: #fff;
        border-radius: 50%;
        position: fixed;
        width: 30px;
        height: 30px;
        top: 18px;
        left: 57px;
        box-shadow: 0px 0px 4px #bfbfbf;
        z-index: 1;
        font-size: 18px;
        color: #bfbfbf;
        border: none;
    } 

    .sidebar-toggle:hover {
        box-shadow: 0px 0px 4px var(--color-dark-gray);
        transform: scale(1.1);
        color: var(--color-dark-gray);    
    }

    .showed-sidebar {
        left: 307px;
    }

    .horizontal {
        height: 0.1px;
        color: var(--color-light-gray)
    }

</style>