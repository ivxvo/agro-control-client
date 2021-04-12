import { createApp } from 'vue'
import { router } from "./router.js";

import App from './App.vue'

// Auth
import { store } from "./store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { ValidationProvider } from "vee-validate";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { 
    faHome,
    faUser,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

const app = createApp(App);

// app.config.productionTip = false; // ???

// vuex-store
app.use(store);

// app.component("ValidationProvider", ValidationProvider);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.mount("#app");