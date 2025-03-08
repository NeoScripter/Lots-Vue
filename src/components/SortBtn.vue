
<script>
import { SEARCH_FIELDS } from '../const/SearchFields.js';
import ascending from '/svgs/asc.svg';
import descending from '/svgs/desc.svg';

export default {
    name: 'SortButton',
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
    <button
        @click="$emit('click')"
        class="button is-light is-small"
        :class="{ 'active-filter': isActive }"
    >
        {{ label }}
        <img
            v-if="isActive"
            :src="sort === SEARCH_FIELDS.ASCENDING_ORDER ? ascending : descending"
            :alt="sort === SEARCH_FIELDS.ASCENDING_ORDER ? 'ascending order' : 'descending order'"
        />
    </button>
</template>
