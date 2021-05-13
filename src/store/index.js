import { createStore } from "vuex";
import { auth } from "./auth.module";
import { consts } from "./const.module";
import { menu } from "./menu.module";

export const store = createStore({
    modules: {
        auth,
        consts,
        menu
    }
});