<script>
import DataItem from './DataItem.vue';
import LotProps from './LotProps.vue';
import rocket from '/svgs/rocket.svg';
import chart from '/svgs/chart.svg';
import chain from '/svgs/chain.svg';


export default {
    name: 'PriceCard',
    components: { LotProps, DataItem },
    data() {
        return {
            HEADERS: [
                'Изм. со ст',
                'за 30 дней',
                'за день',
                'за 7 дней',
                'на сайте',
                'ключи до',
            ],
            BODY_TEXT: [
                '-22,1%',
                '-6,8%',
                '0,0%',
                '-7,0%',
                '786 д',
                '2027-06-01',
            ],
            rocket,
            chart,
            chain
        };
    },
};
</script>

<template>
    <div class="card__container">
        <div class="card__header">
            <span class="card__price">21 608 445 ₽</span>

            <LotProps />
        </div>

        <div class="card__data">
            <div v-for="(item, index) in HEADERS" :key="index">
                <DataItem :header="item" :body="BODY_TEXT[index]" />
            </div>
        </div>

        <div class="card__panel">
            <div class="card__panel-status">Старт продаж
                <img :src="rocket" alt="Rocket">
            </div>
            <button class="card__panel-btn">
                <img :src="chart" alt="Chart">
            </button>
            <a class="card__panel-article">
                <img :src="chain" alt="Link">
                961369
            </a>
        </div>
    </div>
</template>

<style scoped>
.card__container {
    background-color: white;
    border-radius: 5px;
    padding: 14px;
    display: grid;
    gap: 12px;
}

.card__header {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.card__price {
    font-weight: 600;
    color: #1a1345;
    font-size: 14px;
}

.card__data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.card__panel {
    display: flex;
    align-items: start;
    gap: 10px;
    justify-content: space-between;
}

.card__panel-status {
    color: #8b8b8b;
    font-size: 10px;
    font-weight: 400;
    background-color: #E2FFDA;
    border-radius: 5px;
    padding: 6px 10px;
    display: flex;
    align-items: center;
    gap: 4px;
}

.card__panel-btn {
    border-radius: 5px;
    padding: 6px 10px;
    background-color: #F5F5F5;
    margin-right: auto;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card__panel-article {
    color: #4398b7;
    font-size: 12px;
    text-decoration: underline;
    text-underline-offset: 0.2em;
    display: flex;
    align-items: center;
    gap: 4px;
}

.card__panel-article img {
    margin-top: 0.2em;
    display: block;
}
</style>
