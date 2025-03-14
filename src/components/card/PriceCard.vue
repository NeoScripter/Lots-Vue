<script>
import rocket from '/svgs/rocket.svg';
import chart from '/svgs/chart.svg';
import chain from '/svgs/chain.svg';
import DataItem from './DataItem.vue';
import PriceChart from './PriceChart.vue';
import Popup from '../Popup.vue';
import ChartDataProvider from '../providers/ChartDataProvider.vue';
import Spinner from './Spinner.vue';

export default {
    name: 'PriceCard',
    components: { DataItem, PriceChart, Popup, ChartDataProvider, Spinner },
    props: {
        LotData: Object,
        complexId: String,
    },

    data() {
        return {
            rocket,
            chart,
            chain,
            showChart: false,
            showRedirect: false,
            redirectLink: '',
        };
    },
    computed: {
        formattedPrice() {
            return new Intl.NumberFormat('ru-RU').format(this.LotData.price);
        },
    },
    methods: {
        confirmRedirect(link) {
            this.showRedirect = true;
            this.redirectLink = link;
        },
        keysValue(keys_now, keys) {
            if (keys_now) {
                return 'Уже выдают';
            } else if (keys) {
                return `${keys}`;
            } else {
                return '';
            }
        },
    },
};
</script>

<template>
    <div class="card__container mb-3">
        <div class="card__header">
            <span class="card__price">{{ formattedPrice }} ₽</span>

            <div class="lot-props">
                <div class="attr">{{ LotData.building }} корп</div>
                <div class="attr">{{ LotData.floor }} эт.</div>
                <div class="attr">
                    {{ LotData.area }} м
                    <sup class="attr--area">2</sup>
                </div>
                <div class="attr">
                    {{
                        isNaN(parseInt(LotData.rooms))
                            ? 'Студия'
                            : `${LotData.rooms}к`
                    }}
                </div>
            </div>
        </div>

        <Popup
            :show.sync="showChart"
            title="График"
            :key="`${LotData.id}ChartPopup`"
        >
            <div class="chart-wrapper">
                <ChartDataProvider
                    v-if="showChart"
                    :key="`${LotData.id}ChartProvider`"
                    :complexId="complexId"
                    :lotId="LotData.id.toString()"
                    v-slot="{ prices, bookings, isLoading }"
                >
                    <div class="chart-wrapper">
                        <Spinner v-if="isLoading && showChart" />

                        <PriceChart
                            v-else-if="!isLoading && showChart"
                            :prices="prices"
                            :bookings="bookings"
                        />
                    </div>
                </ChartDataProvider>
            </div>
        </Popup>

        <Popup
            :show.sync="showRedirect"
            title="Перейти на страницу этого лота на сайте застройщика?"
            :key="`${LotData.id}RedirectPopup`"
        >
            <div v-if="showRedirect" class="redirect-popup">
                <a @click="showRedirect = false" :href="redirectLink" target="_blank" class="button is-light">
                    Перейти
                </a>
            </div>
        </Popup>

        <div class="card__data">
            <DataItem
                title="Изм. со ст"
                :value="LotData.start_change"
                suffix="%"
            />

            <DataItem
                title="за 30 дней"
                :value="LotData.month_change"
                suffix="%"
            />

            <DataItem
                title="за день"
                :value="LotData.start_change"
                suffix="%"
            />

            <DataItem
                title="за 7 дней"
                :value="LotData.week_change"
                suffix="%"
            />

            <DataItem
                title="на сайте"
                :value="LotData.days_on_site"
                suffix=" д"
            />
            <DataItem
                title="ключи до"
                :value="keysValue(LotData.keys_now, LotData.keys)"
            />
        </div>

        <div class="card__panel">
            <div class="card__status">
                <div v-if="LotData.is_actual === true"></div>
                <div
                    v-else-if="LotData.is_start === true"
                    class="card__panel-status success"
                >
                    Старт продаж
                    <img :src="rocket" alt="Rocket" />
                </div>
                <div
                    v-else-if="LotData.bron === true"
                    class="card__panel-status info"
                >
                    Забронировано
                </div>
                <div
                    v-else-if="LotData.is_actual === false"
                    class="card__panel-status danger"
                >
                    Не в продаже
                </div>
            </div>
            <button @click="showChart = true" class="card__panel-btn">
                <img :src="chart" alt="Chart" />
            </button>
            <button
                @click="confirmRedirect(LotData.flat_url)"
                target="_blank"
                class="card__panel-article"
            >
                <img :src="chain" alt="Link" />
                {{ LotData.article != null ? LotData.article : LotData.number }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.redirect-popup {
    padding-inline: 1rem;
}

.redirect-popup a {
    display: block;
    width: max-content;
    margin-inline: auto;
}
.chart-wrapper {
    height: 400px;
}
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
    font-size: 12px;
}

.card__data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3px;
}

.card__panel {
    display: flex;
    align-items: start;
    gap: 10px;
    justify-content: space-between;
}

.card__status {
    flex-basis: 110px;
}

.card__panel-status {
    color: #8b8b8b;
    font-size: 10px;
    font-weight: 400;
    border-radius: 5px;
    padding: 6px 10px;
    display: flex;
    align-items: center;
    gap: 4px;
    width: max-content;
}

.card__panel-status.success {
    background-color: #e2ffda;
}

.card__panel-status.info {
    background-color: #e1f4ff;
}

.card__panel-status.danger {
    background-color: #ffeaea;
}

.card__panel-btn {
    border-radius: 5px;
    padding: 6px 10px;
    background-color: #f5f5f5;
    height: 26px;
    margin-right: auto;
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

.lot-props {
    display: flex;
    align-items: center;
}

.attr {
    color: #514f62;
    font-size: 10px;
    font-weight: 400;
    padding-inline: 8px;
    position: relative;
}

.attr:not(:first-of-type)::after {
    content: '';
    position: absolute;
    background-color: #514f62;
    left: 0;
    width: 1px;
    height: 10px;
    transform: translateY(50%);
    top: 0;
}

.attr--area {
    font-size: 8px;
}

@media screen and (min-width: 380px) {
    .card__price {
        font-size: 14px;
    }
    .attr {
        font-size: 12px;
    }
}
</style>
