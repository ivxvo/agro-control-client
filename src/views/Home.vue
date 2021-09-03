<template>
    <div class="container">
        <header class="jumbotron">
            <h3>{{content}}</h3>
        </header>
        <button @click="show">show</button>
    </div>
</template>

<script>
import { useQuasar } from "quasar";

export default {
    name: "Home",
    data() {
        return {
            content: "Графики",
            $q: useQuasar()
        };
    },
    methods: {
        show() {
            this.$q.notify("LOADED!!!");
        }
    },
    mounted() {
        // this.$store.commit("menu/showSidebar", false);
        // console.log(`show: ${this.$store.state.menu.showedSidebar}`);

        // UserService.getPublicContent().then(
        //     res => {
        //         this.content = res.data;
        //     },
        //     error => {
        //         this.content = (error.response && error.response.data) ||
        //         error.message ||
        //         error.toString();
        //     }
        // );
    }
};
</script>