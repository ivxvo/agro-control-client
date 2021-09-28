<template> 

  <div id="app">

    <div v-if="loggedIn"> 

      <MainMenu/>

      <div class="wrap">      
        <div class="main-container-wrap" :class="{ 'main-container-wrap-showed-sidebar': showedSidebar }">      

          <!-- <div class="row">
            <div class="col-md-7">
              <div class="search-input">
                <input type="text" placeholder="Поиск..">
              </div>
            </div>
            <div class="col-md-5"></div>
          </div> -->

            <router-view />          
            
        </div>
      </div>
    </div>

    <div v-else-if="$route.path === '/login'">
      <router-view/>
    </div>

  </div>
  
</template>

<script>

import MainMenu from "./components/MainMenu";

export default {
  name: "App",
  components: {
    MainMenu
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
