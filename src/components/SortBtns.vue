<script>
import filterIcon from "/svgs/filter-icon.svg";
import search from "/svgs/search.svg";
import ascending from "/svgs/asc.svg";
import descending from "/svgs/desc.svg";

import { SEARCH_FIELDS } from "../const/SearchFields";
import Popup from "./Popup.vue";
import SortBtn from "./SortBtn.vue";

export default {
    name: "SortBtns",
    data() {
        return {
            filterIcon,
            search,
            SEARCH_FIELDS,
            ascending,
            descending,
            showSortPopup: false,
            isWide: window.innerWidth > 768,
        };
    },
    components: {
        Popup,
        SortBtn,
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.checkWidth);
    },
    mounted() {
        window.addEventListener("resize", this.checkWidth);
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
            this.$emit("update:showFilters", true);
        },
        checkWidth() {
            this.isWide = window.innerWidth > 768;
        },
    },
    computed: {
        getSortButtonContent() {
            const sortLabels = {
                [SEARCH_FIELDS.ARTICLE]: "Артикул или номер",
                [SEARCH_FIELDS.BUILDING]: "Корпус",
                [SEARCH_FIELDS.FLOOR]: "Этаж",
                [SEARCH_FIELDS.ROOMS]: "Комнат",
                [SEARCH_FIELDS.AREA]: "Площадь",
                [SEARCH_FIELDS.PRICE]: "Стоимость",
                [SEARCH_FIELDS.SQM_PRICE]: "Цена метра",
                [SEARCH_FIELDS.START_CHANGE]: "Изменение со старта",
                [SEARCH_FIELDS.WEEK_CHANGE]: "Изменение за 7 дней",
                [SEARCH_FIELDS.MONTH_CHANGE]: "Изменение за 30 дней",
                [SEARCH_FIELDS.DAY_CHANGE]: "Изменение за день",
                [SEARCH_FIELDS.DAYS_ON_SITE]: "Дней на сайте",
                [SEARCH_FIELDS.KEYS_DATE]: "Дата выдачи ключей",
            };
            return sortLabels[this.sortField] || "Сортировка";
        },
        getFilterButtonContent() {
            if (!this.rooms && !this.building && !this.status) {
                return "Фильтры";
            }

            const parts = [];

            if (this.building) {
                parts.push(`${this.building} корп.`);
            }

            if (this.rooms) {
                if (this.rooms === "studio") {
                    parts.push("Студ.");
                } else {
                    parts.push(`${this.rooms} к.`);
                }
            }

            if (this.status) {
                let statusText = "";
                switch (this.status) {
                    case "active":
                        statusText = "в пр.";
                        break;
                    case "bron":
                        statusText = "забр.";
                        break;
                    case "start":
                        statusText = "ст. пр.";
                        break;
                    case "not_available":
                        statusText = "не в пр.";
                        break;
                }
                if (statusText) {
                    parts.push(statusText);
                }
            }

            return parts.join(", ");
        },
    },
};
</script>

<template>
    <div class="filter-actions">
        <button @click="openFilters" class="sort__desktop-hidden button is-light is-small">
            {{ getFilterButtonContent }}
        </button>

        <button @click="() => (showSortPopup = true)" class="sort__desktop-hidden button is-light is-small"
            :class="{ 'active-filter': sortField !== '' }">
            {{ getSortButtonContent }}
            <img v-if="sortField !== ''" :src="sort === SEARCH_FIELDS.ASCENDING_ORDER ? ascending : descending"
                alt="descending order" />
        </button>

        <div>
            <portal-target name="sort-panel__desktop" />
        </div>

        <portal :to="isWide ? 'sort-panel__desktop' : 'sort-panel__mobile'">
            <div class="sort-popup">
                <div class="filter-actions filter-actions--margin">
                    <SortBtn label="Артикул или номер" :sortField="sortField" :currentSortField="SEARCH_FIELDS.ARTICLE"
                        :sort="sort" @click="selectSortingOption(SEARCH_FIELDS.ARTICLE)" />
                    <SortBtn label="Корпус" :sortField="sortField" :currentSortField="SEARCH_FIELDS.BUILDING"
                        :sort="sort" @click="selectSortingOption(SEARCH_FIELDS.BUILDING)" />
                    <SortBtn label="Этаж" :sortField="sortField" :currentSortField="SEARCH_FIELDS.FLOOR" :sort="sort"
                        @click="selectSortingOption(SEARCH_FIELDS.FLOOR)" />
                    <SortBtn label="Комнат" :sortField="sortField" :currentSortField="SEARCH_FIELDS.ROOMS" :sort="sort"
                        @click="selectSortingOption(SEARCH_FIELDS.ROOMS)" />
                    <SortBtn label="Площадь" :sortField="sortField" :currentSortField="SEARCH_FIELDS.AREA" :sort="sort"
                        @click="selectSortingOption(SEARCH_FIELDS.AREA)" />
                    <SortBtn label="Стоимость" :sortField="sortField" :currentSortField="SEARCH_FIELDS.PRICE"
                        :sort="sort" @click="selectSortingOption(SEARCH_FIELDS.PRICE)" />
                    <SortBtn label="Цена метра" :sortField="sortField" :currentSortField="SEARCH_FIELDS.SQM_PRICE"
                        :sort="sort" @click="selectSortingOption(SEARCH_FIELDS.SQM_PRICE)" />
                    <SortBtn label="Изменение со старта" :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.START_CHANGE" :sort="sort"
                        @click="selectSortingOption(SEARCH_FIELDS.START_CHANGE)" />
                    <SortBtn label="Изменение за 7 дней" :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.WEEK_CHANGE" :sort="sort"
                        @click="selectSortingOption(SEARCH_FIELDS.WEEK_CHANGE)" />
                    <SortBtn label="Изменение за 30 дней" :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.MONTH_CHANGE" :sort="sort"
                        @click="selectSortingOption(SEARCH_FIELDS.MONTH_CHANGE)" />
                    <SortBtn label="Изменение за день" :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.DAY_CHANGE" :sort="sort"
                        @click="selectSortingOption(SEARCH_FIELDS.DAY_CHANGE)" />
                    <SortBtn label="Дней на сайте" :sortField="sortField" :currentSortField="SEARCH_FIELDS.DAYS_ON_SITE"
                        :sort="sort" @click="selectSortingOption(SEARCH_FIELDS.DAYS_ON_SITE)" />
                    <SortBtn label="Дата выдачи ключей" :sortField="sortField"
                        :currentSortField="SEARCH_FIELDS.KEYS_DATE" :sort="sort"
                        @click="selectSortingOption(SEARCH_FIELDS.KEYS_DATE)" />
                </div>

                <button @click="() => (showSortPopup = false)"
                    class="sort__desktop-hidden button is-light is-medium is-fullwidth">
                    Закрыть
                </button>
            </div>
        </portal>
        <Popup :show.sync="showSortPopup" title="Сортировка">
            <div>
                <portal-target name="sort-panel__mobile" />
            </div>
        </Popup>

        <button @click="handleSearchClick" class="button sort__desktop-hidden button--icon is-light is-small">
            <img :src="search" alt="Filter" />
        </button>

        <button @click="resetLotOptions" class="sort__desktop-hidden button button--icon is-light is-small">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g id="Group 381">
                    <rect x="11.7573" y="3.53552" width="1" height="11" transform="rotate(45 11.7573 3.53552)"
                        fill="black" />
                    <rect x="12.4644" y="11.3137" width="1" height="11" transform="rotate(135 12.4644 11.3137)"
                        fill="black" />
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
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
}

.filter-actions--margin {
    margin-bottom: 0.75rem;
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

@media screen and (min-width: 768px) {
    .sort-popup {
        margin-inline: 10px;
        border-radius: 0.5rem;
        padding: 20px;
        margin-top: 0.75rem;
        background-color: white;
    }

    .sort__desktop-hidden {
        display: none !important;
    }

    .filter-actions--margin {
        margin-bottom: 0;
    }
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
