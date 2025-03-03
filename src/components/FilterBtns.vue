<script>
import filterIcon from '/svgs/filter-icon.svg';
import search from '/svgs/search.svg';
import ascending from '/svgs/asc.svg';
import descending from '/svgs/desc.svg';

import { SEARCH_FIELDS } from '../const/SearchFields';

export default {
    name: 'FilterBtns',
    data() {
        return {
            filterIcon,
            search,
            SEARCH_FIELDS,
            ascending,
            descending
        };
    },
    props: {
        fetchData: Function,
        selectSortingOption: Function,
        resetLotOptions: Function,
        resetItems: Function,
        sortField: String,
        sort: String,
    },
    methods: {
        handleSearchClick() {
            this.resetItems();
            this.fetchData();
            this.resetLotOptions();
        },
        handleSelectPriceClick() {
            this.selectSortingOption(SEARCH_FIELDS.PRICE);
        },
        handleSelectChangeClick() {
            this.selectSortingOption(SEARCH_FIELDS.CHANGE);
        },
        openFilters() {
            this.$emit('update:showFilters', true);
        },
    },
};
</script>

<template>
    <div class="filter-actions">
        <button @click="openFilters" class="button is-light is-small">Фильтры</button>

        <!--  <button @click="handleSelectPriceClick" class="button is-light is-small">
            Цена
            <img :src="filterIcon" alt="Filter" />
        </button> -->

        <button
            @click="handleSelectPriceClick"
            class="button is-light is-small"
            :class="{ 'active-filter': sortField === SEARCH_FIELDS.PRICE }"
        >
            Стоимость
            <img v-if="sortField === SEARCH_FIELDS.PRICE" :src="sort === SEARCH_FIELDS.ASCENDING_ORDER ? ascending : descending" alt="descending order">
        </button>

        <button
            @click="handleSelectChangeClick"
            class="button is-light is-small"
            :class="{ 'active-filter': sortField === SEARCH_FIELDS.CHANGE }"
        >
            Изменение
            <img v-if="sortField === SEARCH_FIELDS.CHANGE" :src="sort === SEARCH_FIELDS.ASCENDING_ORDER ? ascending : descending" alt="ascending order" />
        </button>

        <button
            @click="handleSearchClick"
            class="button button--icon is-light is-small"
        >
            <img :src="search" alt="Filter" />
        </button>
    </div>
</template>

<style scoped>
.active-filter {
    background-color: rgb(24, 156, 204, 0.25);
}
.filter-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.button {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-weight: 700;
    font-size: 0.65rem;
}

.button--icon {
    padding-inline: 10px;
}

.button--icon img {
    margin-block: 1.5px;
    width: 1rem;
}
</style>
