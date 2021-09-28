<script>
/* https://dev.to/umarov/easy-access-control-in-your-vue-apps-hhp */
    
    import { store } from "../store";

    const AccessControl = (props, context) => {
        if(store.getters["auth/checkPermission"](props.subject + props.action)) {
            return context.slots.default();
        }
    };

    AccessControl.props = {
        subject: {
            type: Number,
            default: 0
        },
        action: {
            type: Number,
            default: 0
        }
    };

    export default AccessControl;

</script>
 