<script>
import logo from '/images/logo.webp';
import TagList from '../components/TagList.vue';
import FilterBtns from '../components/FilterBtns.vue';
import DataInfo from '../components/DataInfo.vue';
import PriceCard from '../components/card/PriceCard.vue';

export default {
    data() {
        return {
            logo,
        };
    },
    name: 'PriceList',
    components: { TagList, FilterBtns, DataInfo, PriceCard },
};
</script>

<template>
    <div class="container">
        <div class="has-background-white p-3">
            <header class="is-flex mb-1">
                <img :src="logo" alt="Пульс продаж новостроек" class="logo" />
            </header>
            <div>
                <h1 class="is-size-3 has-text-weight-bold mb-3">
                    2-й Иртышкий
                </h1>

                <TagList
                    :tags="[
                        'Москва',
                        'Восточный',
                        'https://www.pik.ru/irtyshskiy',
                    ]"
                />

                <DataInfo
                    actuality="27 мин"
                    priceFrom="2024-04-11"
                    :totalLots="462"
                    :availableLots="437"
                />

                <FilterBtns />
            </div>
        </div>

        <div class="p-3">

            <PriceCard />
        </div>
    </div>
</template>

<style scoped>

.container {
    border-inline: 1px solid rgb(198, 193, 193, 0.2);
}

.logo {
    width: 6.375rem;
}
</style>
