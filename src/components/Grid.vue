<template>
    <div>
        <div v-html="counting"></div>
        <table class="fix-layout">
            <thead>
                <tr>
                    <th v-for="col in columns"
                        :key="col.name"
                        :style="col.style"
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
                        <slot :name="col.filter"></slot>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in pagingItems" :key="row" :class="{ last: isLast(row)}">
                    <td v-for="col in columns" :key="col.name" :style="col.style">                        
                        <slot :name="col.name" v-bind:row="row"></slot>
                    </td>
                </tr>
                <tr v-show="!data.countAll">
                    <td :colspan="columns.length">Нет данных по указанным условиям.</td>
                </tr>
            </tbody>            
        </table>        

        <div class="row align-items-center" v-if="pages">
            <div class="col-md-11">
                <ul class="pagination">
                    <li class="page-item" :class="{ active: n === pages.current }" v-for="n in pages.count" :key="n">
                        <button class="btn btn-primary page-btn" @click="onPageChanged(n)">
                            {{ n }}
                        </button>
                    </li>
                </ul>
            </div>

            <div class="col-md-1">
                <!-- <div class="row justify-end"> -->
                    <div class="page-size">                        
                        <q-select
                            v-model="pageSize"
                            :options="pageSizes"
                            :dropdown-icon="iconfasChevronDown"
                            dense
                            hide-bottom-space
                            options-dense
                            color="light-blue-7"
                            popup-content-style="overflow:hidden"
                        >
                        </q-select>                                                      
                    </div>
                <!-- </div> -->
            </div>
           
        </div>               
    </div>
</template>

<script>
import { reactive, toRef, ref, computed } from 'vue'
import { fasChevronDown } from "@quasar/extras/fontawesome-v5";

export default {
    name: "Grid",
    emits: ["order-changed", "page-changed", "page-size-changed"],
    props: {
        data: Object,
        pages: Object,
        columns: Array
    },
    data() {
        return {
            iconfasChevronDown: fasChevronDown
        }
    },
    watch: {
        pageSize(val) {
            this.$emit("page-size-changed", val);
        }
    },
    setup(props, context) {
        const countAll = toRef(props.data, "countAll");
        const pagingItems = toRef(props.data, "items");

        const currentPage = props.pages ? toRef(props.pages, "current") : null;

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
            
            // props.retrieveData(1, pageSize.value, order.value);
            context.emit("order-changed", order.value);
        };

        const order = computed(() => {
            const col = sortCol.value;
            const direction = sortOrders[col] === 1 ? "ASC" : "DESC";
            const order = {};
            order[col] = [col, direction];

            return order;
        });

        // const filteredData = computed(() => {
        //     const sortKey = sortCol.value;
        //     // const filterKey = ""; 
        //     const order = sortOrders[sortKey] || 1;
        //     let rows = pagingItems.value;

        //     // if(filterKey) {
        //     //     rows = rows.filter(row => {
        //     //         return Object.keys(row).some((key) => {
        //     //             return (
        //     //                 String(row[key]).toLowerCase().indexOf(filterKey) > -1
        //     //             );
        //     //         });
        //     //     })
        //     // }

        //     if(sortKey) {
        //         rows = rows.slice().sort((a, b) => {
        //             a = a[sortKey];
        //             b = b[sortKey];
        //             return (a === b ? 0 : a > b ? 1 : -1) * order;
        //         });
        //     }

        //     return rows;
        // });

        const isLast = (item) => {
            return (pagingItems.value && pagingItems.value.indexOf(item) === pagingItems.value.length - 1);
        };

        // const pageSizes = [4, 50, 100, 300];
        const pageSizes = computed(() => {
            if(countAll.value <= 25) {
                return [25];
            } else if(countAll.value > 25 && countAll.value <= 50) {
                return [25, 50];
            } else if(countAll.value > 50 && countAll.value < 500) {
                return [25, 50, 100]
            } else {
                return [25, 100, 300, 500];
            }
        });
        const pageSize = ref(pageSizes.value[0]);

        const onPageSizeChanged = () => {
            // pageSize.value = value;
            // props.retrieveData(1, pageSize.value, order.value);
            context.emit("page-size-changed", pageSize.value);
        }

        const onPageChanged = (pageNum) => {
            // props.retrieveData(pageNum, pageSize.value, order.value);

            context.emit("page-changed", pageNum);
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
            } else if (pagingItems.value && pagingItems.value.length === 1) {
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
            pagingItems,
            countFrom,
            countTo,
            pageSize,
            pageSizes,
            onPageChanged,
            onPageSizeChanged,
            isLast,
            counting
        }
    }
    
}
</script>

<style scoped>
    table {
        border: none;
        width: 100%;
    }

    tr {
        border-top: 1px solid var(--color-gray);
    }

    th {
        border-bottom: 2px solid var(--color-gray);
    }

    th, td {
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
        /* margin: 2rem 0; */
    }

    .page-size {
        margin: 2rem 0;
        max-width: 4rem;
    }

    .page-item {
        margin: 0.13rem;
    }

    li .page-btn {
        background-color: var(--color-light-gray);
        border: none;
        color: var(--color-black);
        padding: 0.6rem 0.9rem;
        font-size: 1rem;
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

    /* .fix-layout {
        table-layout: fixed;
    } */

</style>