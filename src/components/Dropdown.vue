<template>
    <div class="dropdown-container">
        <div class="dropdown-input">
            <q-input
                outlined
                color="teal"
                ref="dropdowninput"
                type="text"
                :placeholder="placeholder"
                v-model.trim="inputValue"
                @focus="onInputFocused"
                @blur="onInputBlured"
                @keydown.enter="onInputChanged"    
                @keydown.down="onInputKeyDown"
                @keydown.up="onInputKeyUp"
                @keydown.esc="onInputKeyEsc"
            >
                <template v-if="inputValue" v-slot:append>
                    <q-icon
                        :name="iconfasTimes"
                        @click.stop="onInputCleared"
                        @mouseenter="onClearIconMouseEntered"
                        @mouseleave="onClearIconMouseLeaved"
                        class="cursor-pointer"
                    />
                </template>
            </q-input>
        </div>
        <!-- <div v-else @click="resetItem" class="form-control">
            <slot name="selected-item" v-bind:selected="selectedItem"></slot>
        </div> -->
        
        <div v-show="listVisible" class="dropdown-list">
            <div v-show="!items">
                <q-spinner-dots
                    color="light-blue-14"
                    size="2.2rem"
                />
            </div>
            <div
                class="dropdown-item"
                :class="{ active: item === selectedItem }"
                v-for="item in items"
                :key="item.value"
                @click="selectItem(item)"
                @mouseenter="onListMouseEntered"
                @mouseleave="onListMouseLeaved"
            >                
                <slot name="current-item" v-bind:current="item"></slot>
            </div>
        </div>
    </div>
</template>

<script>
// https://ctnicholas.medium.com/create-a-searchable-dropdown-list-in-vue-js-139dd064e845

import { fasTimes } from "@quasar/extras/fontawesome-v5";

export default {
    name: "Dropdown",
    emits: ["input-typed", "input-changed", "item-selected"],
    props: {
        placeholder: String
    },
    data() {
        return {            
            inputValue: null,
            inputFocused: false,
            listActive: false,
            loading: false,
            iconfasTimes: fasTimes,
            selectedIndex: -1,
            clearIconActive: false
        }
    },    
    computed: {
        listVisible() {
            if(this.listActive || (this.inputFocused && this.inputValue && this.inputValue.length >= 3)) {
                return true;
            } else {
                return false;
            }
        },
        items() {
            return this.$store.state.dropdown.data;
        },
        selectedItem() {
            return this.items[this.selectedIndex];
        }
    },
    watch: {
        inputValue(val) {
            // if(val === null) {
            //     this.$emit('input-changed', val);
            //     this.$refs.dropdowninput.blur();
            // } else 
            // if(val && val.length >= 3) {
            //     this.$store.commit("dropdown/resetState");
            //     this.$emit("input-typed", val);
            // }

            this.emitTypedEventByCondition(val);

        },
        listVisible(val) {
            if(!val) {
                this.selectedIndex = -1;
            }
        }
    },
    methods: {
        onClearIconMouseEntered() {
            this.clearIconActive = true;
        },
        onClearIconMouseLeaved() {
            this.clearIconActive = false;
        },

        onInputKeyEsc() {
            this.listActive = false;
        },
        onInputKeyDown() {
            if(this.selectedIndex < this.items.length - 1) {
                this.selectedIndex++;            
            }
        },
        onInputKeyUp() {
            if(this.selectedIndex > 0) {
                this.selectedIndex--;
            }
        },
        onInputFocused() {
            if(!this.clearIconActive) {
                this.emitTypedEventByCondition(this.inputValue);
            }
            this.inputFocused = true;
        },
        onInputBlured() {
            this.inputFocused = false;            
        },        
        emitTypedEventByCondition(inputVal) {
            if(inputVal && inputVal.length >= 3) {
                this.$store.commit("dropdown/resetState");
                this.$emit("input-typed", inputVal);
            } 
        },
        onInputChanged() {
            if(this.selectedItem) {
                this.selectItem(this.selectedItem);
            } else {            
                this.$emit('input-changed', this.inputValue);
            }

            this.$refs.dropdowninput.blur();
        },
        selectItem(item) {
            // this.selectedItem = item;
            this.listActive = false;
            this.inputValue = item.label;
            this.$emit("item-selected", item.value);
        },
        resetItem() {
            this.selectedItem = null;
            this.$nextTick(() => this.$refs.dropdowninput.focus());
            /* $nextTick is used because the method is run before the DOM has updated, and the .dropdown-input has not been drawn yet.
                $nextTick waits until the next page draw, and then runs the code block contained within it. */
        },
        onListMouseEntered() {
            this.listActive = true;
            this.selectedIndex = -1;
        },
        onListMouseLeaved() {
            this.listActive = false;
        },
        onInputCleared() {
            this.clearIconActive = false;
            this.inputValue = null;
            this.$emit('item-selected', this.inputValue);
            this.$refs.dropdowninput.blur();
        }
    }
}
</script>

<style scoped>

    .active {
        background-color: var(--color-theme);
        color: var(--color-work-area);
    }

    .dropdown-container {
       position: relative;
   }

    .dropdown-list {
        position: absolute;
        z-index: 1;
        width: 100%;
        /* margin-top: 0.2rem; */
        overflow-y: auto;
        background-color: var(--color-work-area);
        box-shadow: 0 5px 10px var(--color-gray);
        /* border-radius: 3px; */
    }

    .dropdown-item {
        display: flex;
        cursor: pointer;
    }

    .dropdown-item:hover {
        background-color: var(--color-theme);
        color: var(--color-work-area);
    }    

    
</style>