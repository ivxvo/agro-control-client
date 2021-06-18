import { createStore } from "vuex";
import { auth } from "./auth.module";
import { consts } from "./const.module";
import { menu } from "./menu.module";
import { alert } from "./alert.module";

export const store = createStore({
    modules: {
        auth,
        consts,
        menu,
        alert
    }
});