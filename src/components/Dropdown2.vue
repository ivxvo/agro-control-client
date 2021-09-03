<template>
    <div>       
        <q-select
            ref="dropdown2"
            :label="label"
            :multiple="multiple"
            :use-chips="useChips"
            :use-input="useInput"
            :outlined="outlined"
            :filled="filled"
            :hide-dropdown-icon="hideDropdownIcon"
            :dropdown-icon="iconfasChevronDown"
            @filter="filter"
            :options="opts"
            v-model="selectedItems"
            popup-content-style="overflow:hidden"
            fill-input
            hide-selected
            :placeholder="placeholder"
        >
            <template v-if="selectedItems" v-slot:append>
                <q-icon :name="iconfasTimes" @click.stop="selectedItems = null" class="cursor-pointer" />
            </template>
        </q-select>       
    </div>
</template>

<script>
// https://ctnicholas.medium.com/create-a-searchable-dropdown-list-in-vue-js-139dd064e845

import { fasTimes, fasChevronDown } from "@quasar/extras/fontawesome-v5";

export default {
    name: "Dropdown2",
    emits: ["item-selected"],
    props: {
        source: Array,
        selected: {
            type: Object,
            default: null
        },
        label: String,
        placeholder: String,        
        multiple: {
            type: Boolean,
            default: false
        },
        useChips: {
            type: Boolean,
            default: false
        },
        useInput: {
            type: Boolean,
            default: false
        },
        outlined: {
            type: Boolean,
            default: false
        },
        filled: {
            type: Boolean,
            default: false
        },
        hideDropdownIcon: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {                      
            iconfasChevronDown: fasChevronDown,
            iconfasTimes: fasTimes,
            selectedItems: this.selected,
            opts: []
        }
    },       
    watch: {
        selectedItems(items) {
            let id;

            if(items) {
                id = this.multiple ? this.getIds(items) : items.value;
            } else {
                id = null;
            }

            this.$emit("item-selected", id);
        },
        selected(val) {
            this.selectedItems = val;
        }       
    },
    methods: {
        filter(val, update, abort) {
            if(val.length < 3) {
                if(val == "") {
                    update(() => this.opts = this.source);
                }

                abort();
                return;
            }

            update(() => {
                const searching = val.toLowerCase();
                this.opts = this.source.filter(item => item.label.toLowerCase().startsWith(searching));
            });                         
        },        
        getIds(items) {
            let ids = [];
            for(let item of items) {
                ids.push(item.value);
            }
            return ids;
        }        
    }
}
</script>