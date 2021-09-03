<script>
    
    import { store } from "../store";

    const AccessControl = (props, context) => {
        console.log(store);
        if(store.state.auth.user.permissions.includes(props.subject + props.action)) {
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
 