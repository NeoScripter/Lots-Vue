<script>
import filterIcon from '/svgs/filter-icon.svg';
import search from '/svgs/search.svg';
import ascending from '/svgs/asc.svg';
import descending from '/svgs/desc.svg';

import { SEARCH_FIELDS } from '../const/SearchFields';
import Popup from './Popup.vue';
import SortBtn from './SortBtn.vue';

export default {
    name: 'FilterBtns',
    data() {
        return {
            filterIcon,
            search,
            SEARCH_FIELDS,
            ascending,
            descending,
            showSortPopup: false,
        };
    },
    components: {
        Popup,
        SortBtn,
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
        getSortButtonContent() {
            switch (this.sortField) {
                case SEARCH_FIELDS.PRICE:
                    return 'Стоимость';
                case SEARCH_FIELDS.SQM_PRICE:
                    return 'Цена';
                case SEARCH_FIELDS.CHANGE:
                    return 'Изменение';
                default:
                    return 'Сортировка';
            }
        },
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
                    parts.push('Студ.');
                } else {
                    parts.push(`${this.rooms} к.`);
                }
            }

            if (this.status) {
                let statusText = '';
                switch (this.status) {
                    case 'active':
                        statusText = 'в пр.';
                        break;
                    case 'bron':
                        statusText = 'забр.';
                        break;
                    case 'start':
                        statusText = 'ст. пр.';
                        break;
                    case 'not_available':
                        statusText = 'не в пр.';
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

        <!--    <button
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
        </button> -->

        <!-- <button
            @click="() => (showSortPopup = true)"
            class="button is-light is-small"
        >
            Сортировка
        </button> -->

        <button
            @click="() => (showSortPopup = true)"
            class="button is-light is-small"
            :class="{ 'active-filter': sortField !== '' }"
        >
            {{ getSortButtonContent }}
            <img
                v-if="sortField !== ''"
                :src="
                    sort === SEARCH_FIELDS.ASCENDING_ORDER
                        ? ascending
                        : descending
                "
                alt="descending order"
            />
        </button>

        <Popup :show.sync="showSortPopup" title="Сортировка">
            <div class="sort-popup">
                <div class="filter-actions mb-4">
                    <SortBtn
                        label="Стоимость"
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.PRICE"
                        :sort="sort"
                        @click="selectSortingOption(SEARCH_FIELDS.PRICE)"
                    />
                    <SortBtn
                        label="Цена"
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.SQM_PRICE"
                        :sort="sort"
                        @click="selectSortingOption(SEARCH_FIELDS.SQM_PRICE)"
                    />
                    <SortBtn
                        label="Изменение"
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.CHANGE"
                        :sort="sort"
                        @click="selectSortingOption(SEARCH_FIELDS.CHANGE)"
                    />
                </div>
                <button
                    @click="() => (showSortPopup = false)"
                    class="button is-light is-medium is-fullwidth"
                >
                    Закрыть
                </button>
            </div>
        </Popup>

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

.sort-popup {
    padding-inline: 20px;
    margin-top: -20px;
}

.button:not(.is-medium) {
    display: flex;
    align-items: center;
    flex-shrink: 0;
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
