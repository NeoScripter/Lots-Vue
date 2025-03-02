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

export default {
    data() {
        return {
            logo,
            complexId: COMPLEX_ID,
        };
    },
    name: 'PriceList',
    components: {
        Complex,
        FilterBtns,
        PriceCard,
        ComplexDataProvider,
        LotDataProvider,
        DataInfo,
        CardSkeleton
    },
};
</script>

<template>
    <ComplexDataProvider
        :complexId="complexId"
        v-slot="{ complexData, complexDataIsLoading, actuality }"
    >
        <LotDataProvider :complexId="complexId">
            <template v-slot="{ items, lotDataIsLoading, totalPages, totalItems }">
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
                                :isLoading="complexDataIsLoading || lotDataIsLoading"
                            />

                            <FilterBtns />
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
