<template>
    <ComplexDataProvider
        :complexId="complexId"
        v-slot="{
            complexData,
            complexDataIsLoading,
            complexLoadingError,
            actuality,
            getBuildings,
            getRooms,
            lotsAvailable,
            lotsOnSite,
        }"
    >
        <LotDataProvider
            :complexId="complexId"
            :options="lotOptions"
            v-slot="{
                items,
                lotDataIsLoading,
                lotLoadingError,
                searchLot,
                updateSearchUrl,
                searchUrl,
            }"
        >
            <Popup :show.sync="showFilters" title="Фильтры">
                <div>
                    <portal-target name="filter-panel__mobile" />
                </div>
            </Popup>

            <ResponsivePortal
                :isWide="isWide"
                mobile="filter-panel__mobile"
                desktop="filter-panel__desktop"
            >
                <FiltersPanel
                    :complexId="complexId"
                    :lotOptions.sync="lotOptions"
                    :getBuildings="getBuildings"
                    :getRooms="getRooms"
                    :closePopup="() => (showFilters = false)"
                    :selectMultiple="selectMultiple"
                    :setMultiple="setMultiple"
                />
            </ResponsivePortal>

            <ResponsivePortal
                :isWide="isWide"
                mobile="sort-btns__mobile"
                desktop="sort-btns__desktop"
            >
                <SortBtns
                    :selectSortingOption="selectSortingOption"
                    :handleSearchClick="handleSearchClick"
                    :sortField="lotOptions.sort_field"
                    :sort="lotOptions.sort"
                    :rooms="lotOptions.rooms"
                    :building="lotOptions.building"
                    :status="lotOptions.status"
                    :showFilters.sync="showFilters"
                    :resetLotOptions="resetLotOptions"
                />
            </ResponsivePortal>

            <ResponsivePortal
                :isWide="isWide"
                mobile="search-panel__mobile"
                desktop="search-panel__desktop"
            >
                <SearchInput
                    :show="showSearch"
                    :updateSearchUrl="updateSearchUrl"
                    :searchLot="searchLot"
                    :closePopup="() => (showSearch = false)"
                    :resetLotOptions="resetLotOptions"
                    :lotOptions="lotOptions"
                />
            </ResponsivePortal>

            <div class="lot-explorer">
                <LotHeader :complexName="complexData.name" />
                <div class="lot-explorer__content">
                    <p
                        v-if="complexLoadingError"
                        class="lot-explorer__error-message"
                    >
                        Произошла ошибка, попробуйте позднее или обратитесь в
                        поддержку
                        <a href="https://t.me/pulsprodajru_supportbot">
                            https://t.me/pulsprodajru_supportbot
                        </a>
                    </p>
                    <div v-else>
                        <Complex
                            :complexData="complexData"
                            :complexDataIsLoading="complexDataIsLoading"
                        />

                        <DataInfo
                            :actuality="actuality"
                            priceFrom="2024-04-11"
                            :totalLots="lotsOnSite"
                            :availableLots="lotsAvailable"
                            :isLoading="complexDataIsLoading"
                        />

                        <BuildingFilter
                            v-if="!isWide"
                            :complexId="complexId"
                            :lotOptions.sync="lotOptions"
                            :getBuildings="getBuildings"
                            :inHeader="true"
                        />

                        <div><portal-target name="sort-btns__mobile" /></div>
                    </div>
                </div>

                <Popup
                    :show.sync="showSearch"
                    title="Поиск по артикулу или URL"
                >
                    <div><portal-target name="search-panel__mobile" /></div>
                </Popup>

                <div><portal-target name="filter-panel__desktop" /></div>
                <div><portal-target name="search-panel__desktop" /></div>
                <div class="sticky-sort-btns"><portal-target name="sort-btns__desktop" /></div>

                <LotCardList
                    :items="items"
                    :isLoading="lotDataIsLoading"
                    :error="lotLoadingError"
                    :complexId="complexId"
                />
            </div>
        </LotDataProvider>
    </ComplexDataProvider>
</template>

<script>
import logo from '@/assets/images/logo.webp';
import telegram from '@/assets/images/telegram.svg';
import SortBtns from '../components/SortBtns.vue';
import PriceCard from '../components/card/PriceCard.vue';
import LotCardList from '../components/card/LotCardList.vue';
import Complex from '../components/header/Complex.vue';
import ComplexDataProvider from '../components/providers/ComplexDataProvider.vue';
import DataInfo from '../components/header/DataInfo.vue';
import LotDataProvider from '../components/providers/LotDataProvider.vue';
import CardSkeleton from '../components/card/CardSkeleton.vue';
import { COMPLEX_ID } from '../const/api-url.js';
import { SEARCH_FIELDS } from '../const/SearchFields.js';
import Popup from '../components/Popup.vue';
import FiltersPanel from '../components/FiltersPanel.vue';
import SearchDataProvider from '../components/providers/SearchDataProvider.vue';
import SearchInput from '../components/SearchInput.vue';
import ResponsivePortal from '@/components/utils/ResponsivePortal.vue';
import LotHeader from '@/components/header/LotHeader.vue';
import BuildingFilter from '@/components/BuildingFilter.vue';

export default {
    data() {
        return {
            logo,
            telegram,
            complexId: COMPLEX_ID,
            defaultLotOptions: {
                status: [],
                building: [],
                rooms: [],
                sort_field: '',
                sort: '',
                page: 1,
                per_page: 20,
            },
            lotOptions: {},
            showFilters: false,
            showSearch: false,
            isWide: window.innerWidth >= 768,
            selectMultiple: localStorage.getItem('selectMultiple') === 'true',
        };
    },
    created() {
        this.lotOptions = { ...this.defaultLotOptions };

        const newComplexId = this.getComplexIdFromUrl();

        if (newComplexId !== '') {
            this.complexId = newComplexId;
        }

        window.addEventListener('popstate', () => {
            const newComplexId = this.getComplexIdFromUrl();
            if (newComplexId !== this.complexId && newComplexId !== '') {
                this.complexId = newComplexId;
            }
        });
    },
    beforeDestroy() {
        window.removeEventListener('popstate', this.getComplexIdFromUrl);
        window.removeEventListener('resize', this.checkWidth);
    },
    mounted() {
        window.addEventListener('resize', this.checkWidth);
    },
    name: 'LotExlorer',
    components: {
        Complex,
        SortBtns,
        PriceCard,
        ComplexDataProvider,
        LotDataProvider,
        SearchDataProvider,
        DataInfo,
        CardSkeleton,
        Popup,
        FiltersPanel,
        SearchInput,
        ResponsivePortal,
        LotHeader,
        LotCardList,
        BuildingFilter,
    },
    methods: {
        setMultiple(val) {
            this.selectMultiple = val;
            localStorage.setItem('selectMultiple', val ? 'true' : 'false');
            if (val === false) {
                this.enforceSingleSelection(this.lotOptions);
            }
        },
        enforceSingleSelection(newOptions) {
            const updated = { ...newOptions };

            ['rooms', 'building', 'status'].forEach((key) => {
                const value = newOptions[key];
                if (Array.isArray(value) && value.length > 1) {
                    updated[key] = [value[value.length - 1]];
                }
            });

            this.lotOptions = updated;
        },
        resetLotOptions() {
            this.lotOptions = { ...this.defaultLotOptions };
        },
        checkWidth() {
            this.isWide = window.innerWidth >= 768;
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
            return urlParams.get('complexId') || '';
        },
    },
    watch: {
        complexId: {
            immediate: true,
            handler() {
                this.resetLotOptions();
            },
        },
        lotOptions: {
            deep: true,
            handler(newVal) {
                if (
                    !this.selectMultiple &&
                    (newVal.rooms.length > 1 ||
                        newVal.status.length > 1 ||
                        newVal.building.length > 1)
                ) {
                    this.enforceSingleSelection(newVal);
                }
            },
        },
    },
};
</script>

<style scoped src="../assets/styles/lot-explorer.css"></style>
