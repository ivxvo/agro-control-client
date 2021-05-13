<template>
    <table>
        <thead>
            <tr>
                <th v-for="col in columns"
                    :key="col.name"
                >
                    <!-- <span class="arrow" :class="sortOrders[col.name] > 0 ? 'asc' : 'dsc'"></span> -->
                    {{ col.name }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in data" :key="row">
                <td v-for="col in columns" :key="col.name">
                    <span v-if="col && col.colLink">
                        <slot name="colLink" v-bind:row="row"></slot>
                    </span>
                    <span v-else-if="col && col.colButton">
                        <slot name="colButton" v-bind:row="row"></slot>
                    </span>
                    <span v-else>{{ row[col.name] }}</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>

export default({
    props: {
        data: Array,
        columns: Array
    }
    
})
</script>
