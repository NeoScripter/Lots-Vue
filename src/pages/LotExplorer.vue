<script>
import logo from "/images/logo.webp";
import telegram from "@/assets/images/telegram.svg";
import FilterBtns from "../components/FilterBtns.vue";
import PriceCard from "../components/card/PriceCard.vue";
import Complex from "../components/header/Complex.vue";
import ComplexDataProvider from "../components/providers/ComplexDataProvider.vue";
import DataInfo from "../components/header/DataInfo.vue";
import LotDataProvider from "../components/providers/LotDataProvider.vue";
import CardSkeleton from "../components/card/CardSkeleton.vue";
import { COMPLEX_ID } from "../const/api-url.js";
import { SEARCH_FIELDS } from "../const/SearchFields.js";
import Popup from "../components/Popup.vue";
import FiltersPanel from "../components/FiltersPanel.vue";
import SearchDataProvider from "../components/providers/SearchDataProvider.vue";
import SearchInput from "../components/SearchInput.vue";

export default {
    data() {
        return {
            logo,
            telegram,
            complexId: COMPLEX_ID,
            defaultLotOptions: {
                status: "",
                building: "",
                rooms: "",
                sort_field: "",
                sort: "",
                page: 1,
                per_page: 20,
            },
            lotOptions: {},
            showFilters: false,
            showSearch: false,
            isWide: window.innerWidth > 768,
        };
    },
    created() {
        this.lotOptions = { ...this.defaultLotOptions };

        const newComplexId = this.getComplexIdFromUrl();

        if (newComplexId !== "") {
            this.complexId = newComplexId;
        }

        window.addEventListener("popstate", () => {
            const newComplexId = this.getComplexIdFromUrl();
            if (newComplexId !== this.complexId && newComplexId !== "") {
                this.complexId = newComplexId;
            }
        });
    },
    beforeDestroy() {
        window.removeEventListener("popstate", this.getComplexIdFromUrl);
        window.removeEventListener("resize", this.checkWidth);
    },
    mounted() {
        window.addEventListener("resize", this.checkWidth);
    },
    name: "LotExlorer",
    components: {
        Complex,
        FilterBtns,
        PriceCard,
        ComplexDataProvider,
        LotDataProvider,
        SearchDataProvider,
        DataInfo,
        CardSkeleton,
        Popup,
        FiltersPanel,
        SearchInput,
    },
    methods: {
        resetLotOptions() {
            this.lotOptions = { ...this.defaultLotOptions };
        },
        checkWidth() {
            this.isWide = window.innerWidth > 768;
        },
        selectSortingOption(field) {
            if (this.lotOptions.sort_field === field) {
                this.changeSortingOrder();
            } else {
                this.lotOptions = {
                    ...this.lotOptions,
                    sort: SEARCH_FIELDS.ASCENDING_ORDER,
                    sort_field: field,
                };
            }
        },
        changeSortingOrder() {
            if (this.lotOptions.sort === SEARCH_FIELDS.ASCENDING_ORDER) {
                this.lotOptions = {
                    ...this.lotOptions,
                    sort: SEARCH_FIELDS.DESCENDING_ORDER,
                };
            } else {
                this.lotOptions = {
                    ...this.lotOptions,
                    sort: SEARCH_FIELDS.ASCENDING_ORDER,
                };
            }
        },
        handleSearchClick() {
            this.showSearch = true;
        },
        getComplexIdFromUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get("complexId") || "";
        },
    },
    watch: {
        complexId: {
            immediate: true,
            handler() {
                this.resetLotOptions();
            },
        },
    },
};
</script>

<template>
    <ComplexDataProvider :complexId="complexId" v-slot="{
        complexData,
        complexDataIsLoading,
        complexLoadingError,
        actuality,
        getBuildings,
        getRooms,
    }">
        <LotDataProvider :complexId="complexId" :options="lotOptions" v-slot="{
            items,
            lotDataIsLoading,
            totalItems,
            lotsAvailable,
            lotLoadingError,
            fetchData,
            resetItems,
            searchLot,
            updateSearchUrl,
        }">
            <Popup :show.sync="showFilters" title="Фильтры">
                <div>
                    <portal-target name="filter-panel__mobile" />
                </div>
            </Popup>

            <portal :to="isWide ? 'filter-panel__desktop' : 'filter-panel__mobile'">
                <FiltersPanel :complexId="complexId" :lotOptions.sync="lotOptions" :getBuildings="getBuildings"
                    :getRooms="getRooms" :closePopup="() => (showFilters = false)" />
            </portal>
            <div class="lot-explorer">
                <header class="lot-explorer__header">
                    <img :src="logo" alt="Пульс продаж новостроек" class="lot-explorer__logo" />
                    <a class="lot-explorer__link">
                        <img :src="telegram" alt="Телеграм" class="lot-explorer--link-svg" />
                        Поддержка
                    </a>
                </header>
                <div class="lot-explorer__content">
                    <p v-if="complexLoadingError" class="lot-explorer__error-message">
                        Произошла ошибка, попробуйте позднее или обратитесь в поддержку
                        <a href="https://t.me/pulsprodajru_supportbot">
                            https://t.me/pulsprodajru_supportbot
                        </a>
                    </p>
                    <div v-else>
                        <Complex :complexData="complexData" :complexDataIsLoading="complexDataIsLoading" />

                        <DataInfo :actuality="actuality" priceFrom="2024-04-11" :totalLots="totalItems"
                            :availableLots="lotsAvailable" :isLoading="complexDataIsLoading" />

                        <FilterBtns :class="{ 'lot-explorer__mob-filter-btns': true }"
                            :selectSortingOption="selectSortingOption" :handleSearchClick="handleSearchClick"
                            :sortField="lotOptions.sort_field" :sort="lotOptions.sort" :rooms="lotOptions.rooms"
                            :building="lotOptions.building" :status="lotOptions.status" :showFilters.sync="showFilters"
                            :resetLotOptions="resetLotOptions" />
                    </div>
                </div>

                <Popup :show.sync="showSearch" title="Поиск по артикулу или URL">
                    <SearchInput :show="showSearch" :updateSearchUrl="updateSearchUrl" :searchLot="searchLot"
                        :closePopup="() => (showSearch = false)" :resetLotOptions="resetLotOptions" />
                </Popup>

                <div>
                    <portal-target name="filter-panel__desktop" />
                </div>
                <div class="lot-explorer__cards">
                    <p v-if="lotLoadingError" class="lot-explorer__error-message">
                        Произошла ошибка, попробуйте позднее или обратитесь в поддержку
                        <a href="https://t.me/pulsprodajru_supportbot">
                            https://t.me/pulsprodajru_supportbot
                        </a>
                    </p>
                    <p v-else-if="items.length === 0 && !lotDataIsLoading">
                        По вашему запросу ничего не найдено
                    </p>
                    <div v-for="(item, _) in items" :key="item.id">
                        <PriceCard :LotData="item" :complexId="complexId" />
                    </div>
                    <CardSkeleton v-if="lotDataIsLoading" />
                </div>
            </div>
        </LotDataProvider>
    </ComplexDataProvider>
</template>

<style scoped src="../assets/styles/lot-explorer.css"></style>
