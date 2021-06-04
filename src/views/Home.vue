<template>
    <div class="container">
        <header class="jumbotron">
            <h3>{{content}}</h3>
        </header>
    </div>
</template>

<script>
// import UserService from "../services/user.service";
export default {
    name: "Home",
    data() {
        return {
            content: ""
        };
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