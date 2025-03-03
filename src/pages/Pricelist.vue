<script>
import logo from '/images/logo.webp';
import FilterBtns from '../components/FilterBtns.vue';
import PriceCard from '../components/card/PriceCard.vue';
import Complex from '../components/header/Complex.vue';
import ComplexDataProvider from '../components/providers/ComplexDataProvider.vue';
import DataInfo from '../components/header/DataInfo.vue';
import LotDataProvider from '../components/providers/LotDataProvider.vue';
import CardSkeleton from '../components/card/CardSkeleton.vue';
import { COMPLEX_ID } from '../const/api-url.js';
import { SEARCH_FIELDS } from '../const/SearchFields.js';

export default {
    data() {
        return {
            logo,
            complexId: COMPLEX_ID,
            defaultLotOptions: {
                building: '',
                rooms: '',
                sort_field: '',
                sort: SEARCH_FIELDS.ASCENDING_ORDER,
                page: 1,
                per_page: 20,
            },
            lotOptions: {},
        };
    },
    created() {
        this.lotOptions = { ...this.defaultLotOptions };
    },
    name: 'PriceList',
    components: {
        Complex,
        FilterBtns,
        PriceCard,
        ComplexDataProvider,
        LotDataProvider,
        DataInfo,
        CardSkeleton,
    },
    methods: {
        resetLotOptions() {
            this.lotOptions = { ...this.defaultLotOptions };
            console.log("from reset", this.lotOptions.sort);
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
            console.log('start', this.lotOptions.sort);
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
            console.log('end', this.lotOptions.sort);
        },
    },
};
</script>

<template>
    <ComplexDataProvider
        :complexId="complexId"
        v-slot="{ complexData, complexDataIsLoading, actuality }"
    >
        <LotDataProvider :complexId="complexId" :options="lotOptions">
            <template
                v-slot="{
                    items,
                    lotDataIsLoading,
                    totalItems,
                    fetchData,
                    resetItems,
                }"
            >
                <div class="container">
                    <div class="has-background-white p-3">
                        <header class="is-flex mb-1">
                            <img
                                :src="logo"
                                alt="Пульс продаж новостроек"
                                class="logo"
                            />
                        </header>
                        <div>
                            <Complex
                                :complexData="complexData"
                                :complexDataIsLoading="complexDataIsLoading"
                            />

                            <DataInfo
                                :actuality="actuality"
                                priceFrom="2024-04-11"
                                :totalLots="totalItems"
                                :availableLots="437"
                                :isLoading="complexDataIsLoading"
                            />

                            <FilterBtns
                                :fetchData="fetchData"
                                :resetLotOptions="resetLotOptions"
                                :selectSortingOption="selectSortingOption"
                                :resetItems="resetItems"
                                :sortField="lotOptions.sort_field"
                                :sort="lotOptions.sort"
                            />
                        </div>
                    </div>

                    <div class="p-3">
                        <div v-for="(item, _) in items" :key="item.id">
                            <PriceCard :LotData="item" :complexId="complexId" />
                        </div>
                        <CardSkeleton v-if="lotDataIsLoading" />
                    </div>
                </div>
            </template>
        </LotDataProvider>
    </ComplexDataProvider>
</template>

<style scoped>
.container {
    border-inline: 1px solid rgb(198, 193, 193, 0.2);
}

.logo {
    width: 6.375rem;
}
</style>
