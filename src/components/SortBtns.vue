<template>
    <div class="filter-actions">
        <button
            @click="openFilters"
            class="sort__desktop-hidden button is-light is-small"
        >
            {{ getFilterButtonContent }}
        </button>

        <button
            @click="() => (showSortPopup = true)"
            class="sort__desktop-hidden button is-light is-small"
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

        <div class="portal-wrapper">
            <portal-target name="sort-panel__desktop" />
        </div>

        <portal
            class="portal-wrapper"
            :to="isWide ? 'sort-panel__desktop' : 'sort-panel__mobile'"
        >
            <div class="sort-popup">
                <div class="filter-actions filter-actions--margin">
                    <SortBtn
                        label="Статус"
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.STATUS"
                        :sort="sort"
                        tooltipText="Текущий статус лота"
                        @click="selectSortingOption(SEARCH_FIELDS.STATUS)"
                    />

                    <SortBtn
                        label="Корп."
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.BUILDING"
                        :sort="sort"
                        tooltipText="Корпус"
                        @click="selectSortingOption(SEARCH_FIELDS.BUILDING)"
                    />
                    <SortBtn
                        label="Этаж"
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.FLOOR"
                        :sort="sort"
                        tooltipText="Количество этажей"
                        @click="selectSortingOption(SEARCH_FIELDS.FLOOR)"
                    />

                    <SortBtn
                        label="Площадь"
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.AREA"
                        :sort="sort"
                        tooltipText="Корпус"
                        @click="selectSortingOption(SEARCH_FIELDS.AREA)"
                    />

                    <SortBtn
                        label="Комнат"
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.ROOMS"
                        :sort="sort"
                        tooltipText="Количество комнат"
                        @click="selectSortingOption(SEARCH_FIELDS.ROOMS)"
                    />

                    <SortBtn
                        label="Стоимость"
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.PRICE"
                        :sort="sort"
                        tooltipText="Стомость лота"
                        @click="selectSortingOption(SEARCH_FIELDS.PRICE)"
                    />

                    <SortBtn
                        label="Цена метра"
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.SQM_PRICE"
                        :sort="sort"
                        tooltipText="Цена за квадратный метр"
                        @click="selectSortingOption(SEARCH_FIELDS.SQM_PRICE)"
                    />
                    <SortBtn
                        label="На сайте"
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.DAYS_ON_SITE"
                        :sort="sort"
                        tooltipText="Время нахождения на сайте"
                        @click="selectSortingOption(SEARCH_FIELDS.DAYS_ON_SITE)"
                    />
                    <SortBtn
                        label="Изм.со ст."
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.START_CHANGE"
                        :sort="sort"
                        tooltipText="Изменение цены со старта продажи"
                        @click="selectSortingOption(SEARCH_FIELDS.START_CHANGE)"
                    />
                    <SortBtn
                        label="за 7 дней"
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.WEEK_CHANGE"
                        :sort="sort"
                        tooltipText="Изменение цены за 7 дней"
                        @click="selectSortingOption(SEARCH_FIELDS.WEEK_CHANGE)"
                    />
                    <SortBtn
                        label="за 30 дней"
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.MONTH_CHANGE"
                        :sort="sort"
                        tooltipText="Изменение цены за 30 дней"
                        @click="selectSortingOption(SEARCH_FIELDS.MONTH_CHANGE)"
                    />
                    <SortBtn
                        label="за день"
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.DAY_CHANGE"
                        :sort="sort"
                        tooltipText="Изменение цены за день"
                        @click="selectSortingOption(SEARCH_FIELDS.DAY_CHANGE)"
                    />
                    <SortBtn
                        label="Ключи до"
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.KEYS_DATE"
                        :sort="sort"
                        tooltipText="Выдача ключей до"
                        @click="selectSortingOption(SEARCH_FIELDS.KEYS_DATE)"
                    />

                    <SortBtn
                        label="Артикул"
                        :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.ARTICLE"
                        :sort="sort"
                        tooltipText="Артикул лота"
                        @click="selectSortingOption(SEARCH_FIELDS.ARTICLE)"
                    />
                </div>

                <button
                    @click="() => (showSortPopup = false)"
                    class="sort__desktop-hidden button is-light is-medium is-fullwidth"
                >
                    Закрыть
                </button>
            </div>
        </portal>
        <Popup :show.sync="showSortPopup" title="Сортировка">
            <div>
                <portal-target name="sort-panel__mobile" />
            </div>
        </Popup>

        <button
            @click="handleSearchClick"
            class="button sort__desktop-hidden button--icon is-light is-small"
        >
            <img :src="search" alt="Filter" />
        </button>

        <button
            v-if="!this.emptyFilters"
            @click="resetLotOptions"
            class="sort__desktop-hidden button button--icon is-light is-small"
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

<style src="../assets/styles/sort-btns.css"></style>

<script>
import filterIcon from '/svgs/filter-icon.svg';
import search from '/svgs/search.svg';
import ascending from '/svgs/asc.svg';
import descending from '/svgs/desc.svg';
import { SEARCH_FIELDS } from '../const/SearchFields.js';
import Popup from './Popup.vue';
import SortBtn from './SortBtn.vue';

export default {
    name: 'SortBtns',
    data() {
        return {
            filterIcon,
            search,
            SEARCH_FIELDS,
            ascending,
            descending,
            showSortPopup: false,
            isWide: window.innerWidth >= 768,
        };
    },
    components: {
        Popup,
        SortBtn,
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkWidth);
    },
    mounted() {
        window.addEventListener('resize', this.checkWidth);
    },

    props: {
        selectSortingOption: Function,
        handleSearchClick: Function,
        resetLotOptions: Function,
        sortField: String,
        sort: String,
        building: Array,
        rooms: Array,
        status: Array,
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
        checkWidth() {
            this.isWide = window.innerWidth >= 768;
        },
    },
    computed: {
        emptyFilters() {
            return (
                this.rooms.length === 0 &&
                this.building.length === 0 &&
                this.status.length === 0
            );
        },
        getSortButtonContent() {
            const sortLabels = {
                [SEARCH_FIELDS.STATUS]: 'Статус',
                [SEARCH_FIELDS.ARTICLE]: 'Артикул или номер',
                [SEARCH_FIELDS.BUILDING]: 'Корпус',
                [SEARCH_FIELDS.FLOOR]: 'Этаж',
                [SEARCH_FIELDS.ROOMS]: 'Комнат',
                [SEARCH_FIELDS.AREA]: 'Площадь',
                [SEARCH_FIELDS.PRICE]: 'Стоимость',
                [SEARCH_FIELDS.SQM_PRICE]: 'Цена метра',
                [SEARCH_FIELDS.START_CHANGE]: 'Изменение со старта',
                [SEARCH_FIELDS.WEEK_CHANGE]: 'Изменение за 7 дней',
                [SEARCH_FIELDS.MONTH_CHANGE]: 'Изменение за 30 дней',
                [SEARCH_FIELDS.DAY_CHANGE]: 'Изменение за день',
                [SEARCH_FIELDS.DAYS_ON_SITE]: 'Дней на сайте',
                [SEARCH_FIELDS.KEYS_DATE]: 'Дата выдачи ключей',
            };
            return sortLabels[this.sortField] || 'Сортировка';
        },
        getFilterButtonContent() {
            if (this.emptyFilters) {
                return 'Фильтры';
            }

            const parts = [];

            if (this.building.length > 0) {
                parts.push(`${this.building} корп.`);
            }

            if (this.rooms.length > 0) {
                const rooms = [...this.rooms].sort();
                rooms.forEach((room) => {
                    if (room === 'studio') {
                        parts.push('Студ.');
                    } else {
                        parts.push(`${room} к.`);
                    }
                });
            }

            if (this.status.length > 0) {
                const statuses = [...this.status].sort();
                statuses.forEach((status) => {
                    let statusText = '';
                    switch (status) {
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
                });
            }

            return parts.join(', ');
        },
    },
};
</script>
