<template>
    <div v-show="data.countAll">
        <div v-html="counting"></div>
        <table>
            <thead>
                <tr>
                    <th v-for="col in columns"
                        :key="col.name"
                        @click="sortBy(col.name)"
                    >
                        <span class="header">
                            {{ col.header }}
                            <span :class="sortOrders[col.name] > 0 ? 'arrow asc' : sortOrders[col.name] < 0 ? 'arrow dsc' : ''"></span>
                        </span>
                    </th>
                </tr>
                <tr>
                    <td v-for="col in columns" :key="col.name">
                        <span>
                            <slot :name="col.filter"></slot>
                        </span>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in filteredData" :key="row" :class="{ last: isLast(row)}">
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

        <div class="row">
            <div class="col-md-9">
                <ul class="pagination">
                    <li class="page-item" :class="{ active: n === pages.current }" v-for="n in pages.count" :key="n">
                        <button class="btn btn-primary page-btn" @click="handlePageChange(n)">{{ n }}</button>
                    </li>
                </ul>
            </div>

            <div class="col-md-3">
                <select v-model="pageSize" @change="handlePageSizeChange($event)">
                    <option v-for="size in pageSizes" :key="size" :value="size">
                        {{ size }}
                    </option>
                </select>
            </div>
           
        </div>
    </div>
</template>

<script>
import { reactive, toRef, ref, computed } from 'vue'

export default {
    name: "Grid",
    props: {
        data: Object,
        pages: Object,
        retrieveData: Function,
        columns: Array
    },
    setup(props) {
        const countAll = toRef(props.data, "countAll");
        const pagingItems = toRef(props.data, "pagingItems");

        const currentPage = toRef(props.pages, "current");

        const sortCol = ref("");

        const sortOrders = reactive({});
        // columns.value.forEach(col => sortOrders[col.name] = 1);

        const sortBy = (col) => {
            if(col === sortCol.value) {
                sortOrders[col] = sortOrders[col] * -1;
            } else {
                sortOrders[sortCol.value] = 0;
                sortOrders[col] = 1;
                sortCol.value = col;
            }
        };

        const filteredData = computed(() => {
            const sortKey = sortCol.value;
            // const filterKey = ""; 
            const order = sortOrders[sortKey] || 1;
            let rows = pagingItems.value;

            // if(filterKey) {
            //     rows = rows.filter(row => {
            //         return Object.keys(row).some((key) => {
            //             return (
            //                 String(row[key]).toLowerCase().indexOf(filterKey) > -1
            //             );
            //         });
            //     })
            // }

            if(sortKey) {
                rows = rows.slice().sort((a, b) => {
                    a = a[sortKey];
                    b = b[sortKey];
                    return (a === b ? 0 : a > b ? 1 : -1) * order;
                });
            }

            return rows;
        });

        const isLast = (item) => {
            return (filteredData.value && filteredData.value.indexOf(item) === filteredData.value.length - 1);
        };

        const pageSizes = [4, 50, 100, 300];
        const pageSize = ref(pageSizes[0]);

        const handlePageSizeChange = (event) => {
            pageSize.value = event.target.value;
            props.retrieveData({ page: 1, size: pageSize.value });
        }

        const handlePageChange = (pageNum) => {
            props.retrieveData({ page: pageNum, size: pageSize.value });
        };

        const countFrom = computed(() => (currentPage.value - 1) * pageSize.value + 1);
        const countTo = computed(() => {
            const countFullPage = currentPage.value * pageSize.value;
            if(countAll.value - countFullPage >= 0) {
                return countFullPage;
            } else {
                return countAll.value;
            }
        });

        const counting = computed(() => {
            // let html = "Показаны 
            // <b>{{ countFrom }}-{{ countTo }}</b> из 
            // <b>{{ data.countAll }}</b> записей";
            if(!countAll.value) {
                return "";
            }

            let html = "";
            if(countAll.value === 1) {
                html = "Показана <b>1</b> запись";
            } else if (filteredData.value && filteredData.value.length === 1) {
                html = `Показана <b>${countAll.value}</b>-я из <b>${countAll.value}</b> ${ending.value}`;
            } else {
                html = `Показаны <b>${countFrom.value}-${countTo.value}</b> из <b>${countAll.value}</b> ${ending.value}`;
            }
            return html;
        });

        const ending = computed(() => {
            const count = String(countAll.value);
            const last = count.charAt(count.length-1);
            if(parseInt(last) === 1) {
                const prev = count.charAt(count.length-2);
                if(parseInt(prev) !== 1) {
                    return "записи";
                }
            }
            return "записей";
        });

        return {
            sortOrders,
            sortBy,
            filteredData,
            countFrom,
            countTo,
            pageSize,
            pageSizes,
            handlePageChange,
            handlePageSizeChange,
            isLast,
            counting
        }
    }
    
}
</script>

<style scoped>
    table {
        border: none;
    }

    tr {
        border-top: 1px solid var(--color-gray);
        /* height: ; */
    }

    th {
        border-bottom: 2px solid var(--color-gray);
    }

    th, td {
        min-width: 120px;
        padding: 0.35rem;
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
    }

    .arrow.asc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid var(--color-black);
    }

    .arrow.dsc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid var(--color-black);
    }

    span.header:hover {
        cursor: pointer;
        color: var(--color-theme);
    }

    .pagination {
        display: flex;
        list-style: none;
        margin-top: 2rem;
    }

    .page-item {
        margin: 0.13rem;
    }

    li .page-btn {
        background-color: var(--color-light-gray);
        border: none;
        color: var(--color-black);
    }

    li .page-btn:hover {
        background-color: var(--color-gray);
    }

    li.active .page-btn {
        background-color: var(--color-theme-blue);
        border: none;
        color: var(--color-work-area);
    }

    li.active .page-btn:hover {
        background-color: var(--color-theme-dark-blue);
    }
    
    .last {
        border-bottom: 4px double var(--color-gray);
    }
</style>