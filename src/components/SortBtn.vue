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
        tooltipText: {
            type: String,
        },
    },
    data() {
        return {
            SEARCH_FIELDS,
            ascending,
            descending,
            showTooltip: false,
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
    <button
        @click="$emit('click')"
        class="sort-btn button is-light is-small"
        :class="{ 'active-filter': isActive }"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false"
    >
        <span v-show="showTooltip" class="tooltip">{{ tooltipText }}</span>
        {{ label }}
        <img
            v-if="isActive"
            :src="
                sort === SEARCH_FIELDS.ASCENDING_ORDER ? ascending : descending
            "
            :alt="
                sort === SEARCH_FIELDS.ASCENDING_ORDER
                    ? 'ascending order'
                    : 'descending order'
            "
        />
    </button>
</template>

<style scoped>
.tooltip {
    display: none;
}

@media screen and (min-width: 1024px) {
    .sort-btn {
        background-color: transparent !important;
        color: #8b8b8b !important;
        font-weight: 400 !important;
        padding: 0 !important;
        position: relative !important;
    }
    .tooltip {
        position: absolute;
        background-color: white;
        border-radius: 0.5rem;
        left: 50%;
        transform: translateX(-50%);
        padding-block: 0.3em;
        padding-inline: 1rem;
        bottom: 100%;
        border: 2px solid #f6f8f9;
        display: block;
    }
    .filter-actions > .sort-btn:nth-of-type(1) {
        flex-basis: 6.25rem;
        justify-content: start;
        margin-left: 0.5rem;
    }
    .filter-actions > .sort-btn:nth-of-type(2) {
        margin-right: 0.5rem;
    }

    .filter-actions > .sort-btn:nth-of-type(5) {
        margin-left: 0.5rem;
    }

    .filter-actions > .sort-btn:nth-of-type(4) {
        margin-left: 1.5rem;
    }

    .filter-actions > .sort-btn:nth-of-type(6) {
        flex-basis: 7.25rem;
        justify-content: end;
    }
    .filter-actions > .sort-btn:nth-of-type(7) {
        margin-left: 2rem;
    }

    .filter-actions > .sort-btn:nth-last-of-type(3) {
        margin-right: 1.5rem;
    }

    .filter-actions > .sort-btn:nth-last-of-type(2) {
        margin-right: 1.5rem;
    }
}
</style>
