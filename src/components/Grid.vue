<template>
    <table>
        <thead>
            <tr>
                <th v-for="col in columns"
                    :key="col.name"
                >
                    <!-- <span class="arrow" :class="sortOrders[col.name] > 0 ? 'asc' : 'dsc'"></span> -->
                    {{ col.header }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in data" :key="row">
                <td v-for="col in columns" :key="col.name">
                    <!-- <span v-if="col && col.colLink">
                        <slot name="colLink" v-bind:row="row"></slot>
                    </span>
                    <span v-else-if="col && col.colButton">
                        <slot name="colButton" v-bind:row="row"></slot>
                    </span>
                    <span v-else>{{ row[col.name] }}</span> -->
                    <span>
                        <slot :name="col.name" v-bind:row="row"></slot>
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    name: "Grid",
    props: {
        data: Array,
        columns: Array
    },
    setup(props) {
        const { columns } = toRefs(props);
        const sortOrders = reactive({});
        columns.value.forEach(col => sortOrders[col] = 1);

        const sortBy = (col) => {
            sortOrders[col] = sortOrders[col] * -1;
        };

        return {
            sortOrders,
            sortBy
        }
    }
    
}
</script>

<style scoped>
    table {
        border: none;

    }

    th {
        cursor: pointer;
    }

    th, td {
        min-width: 120px;
        padding: 10px 20px;
    }
</style>