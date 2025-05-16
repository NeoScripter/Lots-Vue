<script>
import { SEARCH_FIELDS } from "../const/SearchFields.js";
import ascending from "/svgs/asc.svg";
import descending from "/svgs/desc.svg";

export default {
    name: "SortButton",
    props: {
        label: {
            type: String,
            required: true,
        },
        sortField: {
            type: String,
            required: true,
        },
        currentSortField: {
            type: String,
            required: true,
        },
        sort: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            SEARCH_FIELDS,
            ascending,
            descending,
        };
    },
    computed: {
        isActive() {
            return this.sortField === this.currentSortField;
        },
    },
};
</script>

<template>
    <button @click="$emit('click')" class="sort-btn button is-light is-small" :class="{ 'active-filter': isActive }">
        {{ label }}
        <img v-if="isActive" :src="sort === SEARCH_FIELDS.ASCENDING_ORDER ? ascending : descending" :alt="sort === SEARCH_FIELDS.ASCENDING_ORDER
                ? 'ascending order'
                : 'descending order'
            " />
    </button>
</template>

<style scoped>
@media screen and (min-width: 1024px) {
    .sort-btn {
        background-color: transparent !important;
        color: #8b8b8b !important;
        font-weight: 400 !important;
        padding: 0 !important;
    }

    .filter__left-group .sort-btn:nth-of-type(2) {
        margin-right: 4rem;
    }

    .filter-actions>.sort-btn:nth-last-of-type(2) {
        flex-basis: 3.5rem;
    }

    .filter-actions>.sort-btn:nth-last-of-type(3) {
        flex-basis: 3rem;
    }

    .filter-actions>.sort-btn:nth-last-of-type(4) {
        flex-basis: 3rem;
    }

    .filter-actions>.sort-btn:nth-last-of-type(6) {
        flex-basis: 5.5rem;
    }
}

@media screen and (min-width: 1080px) {
    .filter-actions>.sort-btn:nth-last-of-type(5) {
        margin-right: 1vw;
    }

    .filter-actions>.sort-btn:nth-last-of-type(2) {
        margin-right: 1vw;
    }
}
</style>
