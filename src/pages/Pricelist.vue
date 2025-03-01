<script>
import logo from '/images/logo.webp';
import FilterBtns from '../components/FilterBtns.vue';
import PriceCard from '../components/card/PriceCard.vue';
import DataProvider from '../components/api/DataProvider.vue';
import Complex from '../components/header/Complex.vue';
import ComplexDataProvider from '../components/api/ComplexDataProvider.vue';
import DataInfo from '../components/header/DataInfo.vue';

export default {
    data() {
        return {
            logo,
            complexId: '5578',
        };
    },
    name: 'PriceList',
    components: {
        Complex,
        FilterBtns,
        PriceCard,
        DataProvider,
        ComplexDataProvider,
        DataInfo,
    },
};
</script>

<template>
    <ComplexDataProvider
        :complexId="complexId"
        v-slot="{ complexData, complexDataIsLoading, actuality }"
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
                        :totalLots="462"
                        :availableLots="437"
                        :isLoading="complexDataIsLoading"
                    />

                    <FilterBtns />
                </div>
            </div>

            <div class="p-3">
                <PriceCard />
            </div>

            <DataProvider
                apiUrl="https://api.escuelajs.co/api/v1/products?offset=0"
            >
                <template v-slot="{ items, isLoading }">
                    <ul>
                        <li v-for="item in items" :key="item.id">
                            {{ item.title }}
                        </li>
                    </ul>

                    <div v-if="isLoading" class="loading">Loading...</div>
                </template>
            </DataProvider>
        </div>
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
