import { createStore } from "vuex";
import { auth } from "./auth.module";
import { menu } from "./menu.module";
import { alert } from "./alert.module";
import { dropdown } from "./dropdown.module";

export const store = createStore({
    modules: {
        auth,
        menu,
        alert,
        dropdown
    }
});