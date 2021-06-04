import { createApp } from 'vue'
import { router } from "./router.js";

import App from './App.vue'

import { initGlobals } from "./common/globals.js";

// Auth
import { store } from "./store";

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

const app = createApp(App);

// app.config.productionTip = false; // ???

// globals
initGlobals(app);
// app.config.globalProperties.ReqResult = Object.freeze({
//     success: 1,
//     error: 2
// });

// app.config.globalProperties.HttpStatus = Object.freeze({
//     Unauthorized: 401,
//     Forbidden: 403,
//     NotFound: 404,
//     ServerError: 500
// });

// vuex-store
app.use(store);

// v-tooltip
app.directive("tooltip", tooltip);

// app.component("ValidationProvider", ValidationProvider);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.mount("#app");