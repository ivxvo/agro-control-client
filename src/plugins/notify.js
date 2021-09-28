import { Notify } from "quasar";
import { fasCheck, fasTimesCircle } from "@quasar/extras/fontawesome-v5";
import { NotifyType } from "../common/globals";


export const notify = (params) => {
    const { type, msg, pos } = params;
    let config;
    if(type === NotifyType.success) {
        config = {
            message: msg,
            icon: fasCheck,
            color: "green-11",
            textColor: "teal-10",
            position: pos ? pos : "top-right"
        };
    } else if(type === NotifyType.error) {
        config = {
            message: msg,
            icon: fasTimesCircle,
            color: "red-10",
            position: pos ? pos : "top-right"
        };
    } else if(type === NotifyType.neutral) {
        config = {
            message: msg,
            color: "grey-8",
            position: pos ? pos : "top"
        };
    }

    return Notify.create(config);
};