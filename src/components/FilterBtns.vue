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
            descending,
        };
    },
    props: {
        selectSortingOption: Function,
        handleSearchClick: Function,
        resetLotOptions: Function,
        sortField: String,
        sort: String,
        building: String,
        rooms: String,
        status: String,
    },
    methods: {
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
    computed: {
        getFilterButtonContent() {
            if (!this.rooms && !this.building && !this.status) {
                return 'Фильтры';
            }

            const parts = [];

            if (this.building) {
                parts.push(`${this.building} корп.`);
            }

            if (this.rooms) {
                if (this.rooms === 'studio') {
                    parts.push('Студия');
                } else {
                    parts.push(`${this.rooms} к.`);
                }
            }

            if (this.status) {
                let statusText = '';
                switch (this.status) {
                    case 'active':
                        statusText = 'в продаже';
                        break;
                    case 'bron':
                        statusText = 'забронировано';
                        break;
                    case 'start':
                        statusText = 'старт продаж';
                        break;
                    case 'not_available':
                        statusText = 'не в продаже';
                        break;
                }
                if (statusText) {
                    parts.push(statusText);
                }
            }

            return parts.join(', ');
        },
    },
};
</script>

<template>
    <div class="filter-actions">
        <button @click="openFilters" class="button is-light is-small">
            {{ getFilterButtonContent }}
        </button>

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
            <img
                v-if="sortField === SEARCH_FIELDS.PRICE"
                :src="
                    sort === SEARCH_FIELDS.ASCENDING_ORDER
                        ? ascending
                        : descending
                "
                alt="descending order"
            />
        </button>

        <button
            @click="handleSelectChangeClick"
            class="button is-light is-small"
            :class="{ 'active-filter': sortField === SEARCH_FIELDS.CHANGE }"
        >
            Изменение
            <img
                v-if="sortField === SEARCH_FIELDS.CHANGE"
                :src="
                    sort === SEARCH_FIELDS.ASCENDING_ORDER
                        ? ascending
                        : descending
                "
                alt="ascending order"
            />
        </button>

        <button
            @click="handleSearchClick"
            class="button button--icon is-light is-small"
        >
            <img :src="search" alt="Filter" />
        </button>

        <button
            @click="resetLotOptions"
            class="button button--icon is-light is-small"
        >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g id="Group 381">
                    <rect
                        x="11.7573"
                        y="3.53552"
                        width="1"
                        height="11"
                        transform="rotate(45 11.7573 3.53552)"
                        fill="black"
                    />
                    <rect
                        x="12.4644"
                        y="11.3137"
                        width="1"
                        height="11"
                        transform="rotate(135 12.4644 11.3137)"
                        fill="black"
                    />
                </g>
            </svg>
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

.button--icon svg {
    margin-block: 1.7px;
    width: 1rem;
}
</style>
