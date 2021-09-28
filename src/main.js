import { createApp } from 'vue'

import { initGlobals } from "./common/globals.js";

import App from './App.vue'

import { router } from "./router.js";
// Auth
import { store } from "./store";

// // Quasar UI framework
import "quasar/dist/quasar.prod.css";
// import "quasar/dist/icon-set/fontawesome-v5.umd.prod";
import { Quasar, Notify, Loading, Dialog } from "quasar";
// import { Quasar } from "quasar";


// bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// css
import "./assets/main.css";
import "./assets/containers.css";
import "./assets/bootstrap-recover.css";

// // fontawesome
// import "@fortawesome/fontawesome-free/css/all.css"
// import "@fortawesome/fontawesome-free/js/all.js"

// v-tooltip
import tooltip from "./libs/tooltip.js";
import "./assets/tooltip.css";

// import { ValidationProvider } from "vee-validate";

// FontAwesomeIcons
import { FontAwesomeIcon } from "./plugins/font-awesome";

// const app = createApp(App);

// app.config.productionTip = false; // ???

import setupInterceptors from "./services/interceptors";

setupInterceptors(store, router);

const app = createApp(App);

// globals
initGlobals(app);

// vuex-store
app.use(store);

// quasar
app.use(Quasar, {
    plugins: {
        Notify,
        Loading,
        Dialog
    }
});
// app.use(Quasar);
// Quasar.iconSet.set(Quasar.iconSet.fontawesomeV5);

// v-tooltip
app.directive("tooltip", tooltip);

// app.component("ValidationProvider", ValidationProvider);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.mount("#app");