<template>
    <div class="dropdown-container">
        <input
            ref="dropdowninput"
            class="form-control"
            type="text"
            v-model.trim="inputValue"
            @focus="onInputFocused"
            @blur="onInputBlured"
            @input="onInputTyped($event)"
            @change="onInputChanged"
            v-if="!selectedItem"
        />
        <div v-else @click="resetItem" class="form-control">
            <slot name="selected-item" v-bind:selected="selectedItem"></slot>
        </div>
        <div v-show="listVisible" class="dropdown-listq">
            <div
                class="dropdown-itemq"
                v-for="item in items"
                :key="item.id"
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
export default {
    name: "Dropdown",
    emits: ["input-typed", "input-changed", "item-selected"],
    data() {
        return {            
            inputValue: null,
            selectedItem: null,
            inputFocused: false,
            listActive: false
        }
    },
    props: {
        items: Array
    },
    computed: {
        listVisible() {
            if((this.inputFocused || this.listActive) && this.inputValue && this.inputValue.length >= 3) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        onInputFocused() {
            this.inputFocused = true;
        },
        onInputBlured() {
            this.inputFocused = false;            
        },
        onInputTyped(event) {
            const typedValue = event.target.value;
            if(typedValue.length >= 3) {
                this.$emit("input-typed", typedValue);
            }
        },
        onInputChanged() {
            this.$emit('input-changed', this.inputValue);
            this.$refs.dropdowninput.blur();
        },
        selectItem(item) {
            this.selectedItem = item;
            this.inputValue = null;
            this.$emit("item-selected", item);
        },
        resetItem() {
            this.selectedItem = null;
            this.$nextTick(() => this.$refs.dropdowninput.focus());
        },
        onListMouseEntered() {
            this.listActive = true;
        },
        onListMouseLeaved() {
            this.listActive = false;
        }
    }
}
</script>

<style scoped>

   .dropdown-container {
       position: relative;
   }

    .dropdown-listq {
        position: absolute;
        width: 100%;
        margin-top: 0.2rem;
        overflow-y: auto;
        background-color: var(--color-work-area);
        box-shadow: 0 5px 10px var(--color-gray);
        border-radius: 3px;
    }

    .dropdown-itemq {
        display: flex;
        cursor: pointer;
    }

    .dropdown-itemq:hover {
        background-color: var(--color-theme);
        color: var(--color-work-area);
    }

</style>