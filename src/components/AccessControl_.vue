<template>
    <div v-if="hasPermission">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "AccessControl",
    props: {
        permission: {
            type: Number,
            default: 0
        }
    },
    computed: {        
        hasPermission() {
            return this.$store.state.auth.user.permissions.includes(this.permission);
        }
    }
}
</script>