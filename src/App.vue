<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->

  <!-- <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/tutorials" class="nav-link">Tutorials</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view></router-view>
    </div>
  </div> -->

  <div id="app">
    <!-- <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href class="navbar-brand" @click.prevent>xv</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home"/>Home
            Home
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link to="/mod" class="nav-link">Moderator Board</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus"/>Signup
            Signup
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt"/>Login
            Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user"/>
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a href class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt"/>Logout
            Logout
          </a>
        </li>
      </div>
    </nav> -->
    
    <MainMenu v-show="loggedIn"></MainMenu>

    <div :class="{ 'wrap': loggedIn }">      

      <div :class="{ 'main-container-wrap': loggedIn, 'main-container-wrap-showed-sidebar': showedSidebar }">      

        <div class="row" v-show="loggedIn">
          <div class="col-md-7">
            <div class="search-input">
              <input type="text" placeholder="Поиск..">
            </div>
          </div>
          <div class="col-md-5"></div>
        </div>

          <router-view />          
          
      </div>
    </div>
  </div>
  
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

// export default {
//   name: 'App',
//   components: {
//     HelloWorld
//   }
// }

// import Sidebar from "./components/Sidebar";
import MainMenu from "./components/MainMenu";

export default {
  name: "App",
  components: {
    MainMenu,
    // Sidebar
  },  
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    showedSidebar() {
      return this.$store.state.menu.showedSidebar;
    }
    // showAdminBoard() {
    //   if(this.currentUser && this.currentUser.roles) {
    //     return this.currentUser.roles.includes("ROLE_ADMIN");
    //   }

    //   return false;
    // },
    // showModeratorBoard() {
    //   if(this.currentUser && this.currentUser.roles) {
    //     return this.currentUser.roles.includes("ROLE_MODERATOR");
    //   }

    //   return false;
    // }
  },
  mounted() {
    if(!this.loggedIn) {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style scoped>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

  .wrap {
    display: flex;
    min-height: 100vh;
  }

  .main-container-wrap {
    padding: 14px 20px;
    width: calc(100vw - 70px);
    margin-left: 70px;
    background: var(--color-ultra-light-blue);
  }

  .main-container-wrap-showed-sidebar {
    width: calc(100vw - 320px);
    margin-left: 320px;
  }

  .main-container {
    background: #fff;
    padding: 20px 10px;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .container-fluid {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .main-container-wrap .search-input {
    position: relative;
  }

  .main-container-wrap .search-input input {
    width: 100%;
    border-radius: 15px;
    border: none;
    padding: 6px 35px;
    margin-bottom: 11px;
    background-color: var(--color-work-area);
    color: var(--color-secondary-text);
  }

  .main-container-wrap .search-input input:focus {
    outline: none;
  }

  

  /* .hided-sidebar {
    left: 57px;
    transform: rotate(180deg);
  } */
  
</style>
