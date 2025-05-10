<script>
import rocket from "/svgs/rocket.svg";
import chart from "/svgs/chart.svg";
import chain from "/svgs/chain.svg";
import DataItem from "./DataItem.vue";
import PriceChart from "./PriceChart.vue";
import Popup from "../Popup.vue";
import ChartDataProvider from "../providers/ChartDataProvider.vue";
import Spinner from "./Spinner.vue";

export default {
    name: "PriceCard",
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
            redirectLink: "",
        };
    },
    computed: {
        formattedPrice() {
            return new Intl.NumberFormat("ru-RU").format(this.LotData.price);
        },
    },
    methods: {
        confirmRedirect(link) {
            this.showRedirect = true;
            this.redirectLink = link;
        },
        keysValue(keys_now, keys) {
            if (keys_now) {
                return "Уже выдают";
            } else if (keys) {
                return `${keys}`;
            } else {
                return "";
            }
        },
    },
};
</script>

<template>
    <div class="card__container mb-3">
        <div class="card__header">
            <span class="card__price" :class="{ 'card__price--crossed': LotData.is_actual === false && LotData.bron === false }">{{ formattedPrice
                }} ₽</span>

            <div class="lot-props">
                <div class="attr">{{ LotData.building }} корп</div>
                <div class="attr">{{ LotData.floor }} эт.</div>
                <div class="attr">
                    {{ LotData.area }} м
                    <sup class="attr--area">2</sup>
                </div>
                <div class="attr">
                    {{ isNaN(parseInt(LotData.rooms)) ? "Студия" : `${LotData.rooms}к` }}
                </div>
            </div>
        </div>

        <Popup :show.sync="showChart" title="График" :key="`${LotData.id}ChartPopup`">
            <div class="chart-wrapper">
                <ChartDataProvider v-if="showChart" :key="`${LotData.id}ChartProvider`" :complexId="complexId"
                    :lotId="LotData.id.toString()" v-slot="{ prices, bookings, isLoading }">
                    <div class="chart-wrapper">
                        <Spinner v-if="isLoading && showChart" />

                        <PriceChart v-else-if="!isLoading && showChart" :prices="prices" :bookings="bookings" />
                    </div>
                </ChartDataProvider>
            </div>
        </Popup>

        <Popup :show.sync="showRedirect" title="Перейти на страницу этого лота на сайте застройщика?"
            :key="`${LotData.id}RedirectPopup`">
            <div v-if="showRedirect" class="redirect-popup">
                <a @click="showRedirect = false" :href="redirectLink" target="_blank" class="button is-light">
                    Перейти
                </a>
            </div>
        </Popup>

        <div class="card__data">
            <DataItem title="Изм. со ст" :value="LotData.start_change" suffix="%" />

            <DataItem title="за 30 дней" :value="LotData.month_change" suffix="%" />

            <DataItem title="за 7 дней" :value="LotData.week_change" suffix="%" />

            <DataItem title="за день" :value="LotData.start_change" suffix="%" />

            <DataItem title="на сайте" :value="LotData.days_on_site" suffix=" д" />
            <DataItem title="ключи до" :value="keysValue(LotData.keys_now, LotData.keys)" />
        </div>

        <div class="card__panel">
            <div class="card__status">
                <div v-if="LotData.is_actual === true"></div>
                <div v-else-if="LotData.is_start === true" class="card__panel-status success">
                    Старт продаж
                    <img :src="rocket" alt="Rocket" />
                </div>
                <div v-else-if="LotData.bron === true" class="card__panel-status info">
                    Забронировано
                </div>
                <div v-else-if="LotData.is_actual === false" class="card__panel-status danger">
                    Не в продаже
                </div>
            </div>
            <button @click="showChart = true" class="card__panel-btn">
                <img :src="chart" alt="Chart" />
            </button>
            <button @click="confirmRedirect(LotData.flat_url)" target="_blank" class="card__panel-article">
                <img :src="chain" alt="Link" />
                {{ LotData.article != null ? LotData.article : LotData.number }}
            </button>
        </div>
    </div>
</template>

<style scoped src="../../assets/styles/price-card.css"></style>
