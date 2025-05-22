<template>
    <div class="card__container">
        <div class="card__header card__header--mobile">
            <span class="card__price" :class="{
                'card__price--crossed':
                    LotData.is_actual === false && LotData.bron === false,
            }">{{ formattedPrice }} ₽</span>

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

        <ResponsivePortal v-if="isWide ? showChartBelow : showChart" :isWide="isWide" :mobile="LotData.id + 'chart-popup--mobile'" 
             :desktop="LotData.id + 'chart-popup--desktop'">
            <div class="chart-wrapper">
                <ChartDataProvider :key="LotData.id + 'ChartProvider'" :complexId="complexId"
                    :lotId="LotData.id.toString()" v-slot="{ prices, bookings, isLoading }">
                    <div class="chart-wrapper">
                        <Spinner v-if="isLoading && (showChart | showChartBelow)" />

                        <PriceChart v-else-if="!isLoading && (showChart | showChartBelow)" :prices="prices" :bookings="bookings" />
                    </div>
                </ChartDataProvider>
            </div>
        </ResponsivePortal>

        <Popup :show.sync="showChart" :class="{ 'chart-popup--desktop': true }" title="График"
            :key="`${LotData.id}ChartPopup`">
            <div>
                <portal-target :name="LotData.id + 'chart-popup--mobile'" />
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

        <div class="card__data card__data--mobile">
            <DataItem title="Изм. со ст" :value="LotData.start_change" suffix="%" />

            <DataItem title="за 30 дней" :value="LotData.month_change" suffix="%" />

            <DataItem title="за 7 дней" :value="LotData.week_change" suffix="%" />

            <DataItem title="за день" :value="LotData.start_change" suffix="%" />

            <DataItem title="на сайте" :value="LotData.days_on_site" suffix=" д" />
            <DataItem title="ключи до" :value="keysValue(LotData.keys_now, LotData.keys)" />
        </div>

        <div class="card__panel">
            <div class="card__status">
                <div v-if="LotData.status === 'active'" class="card__panel-status success">
                    В продаже
                </div>
                <div v-else-if="LotData.status === 'start'" class="card__panel-status success">
                    Старт продаж
                    <img :src="rocket" alt="Rocket" />
                </div>
                <div v-else-if="LotData.status === 'bron'" class="card__panel-status info">
                    Забронировано
                </div>
                <div v-else-if="LotData.status === 'not_available'" class="card__panel-status danger">
                    Не в продаже
                </div>
            </div>
            <button @click="isWide ? showChartBelow = !showChartBelow : showChart = true" class="card__panel-btn">
                <img :src="chart" alt="Chart" />
            </button>
            <span class="card__price card__price--desktop" :class="{
                'card__price--crossed':
                    LotData.is_actual === false && LotData.bron === false,
            }">{{ formattedPrice }} ₽</span>

            <button @click="confirmRedirect(LotData.flat_url)" target="_blank" class="card__panel-article">
                <img :src="chain" alt="Link" />
                {{ LotData.article != null ? LotData.article : LotData.number }}
            </button>
        </div>

        <div class="card__data card__data--desktop">
            <div class="card__status--desktop">
                <div class="card__status">
                    <div v-if="LotData.status === 'active'" class="card__panel-status success">
                        В продаже
                    </div>
                    <div v-else-if="LotData.status === 'start'" class="card__panel-status success">
                        Старт продаж
                        <img :src="rocket" alt="Rocket" />
                    </div>
                    <div v-else-if="LotData.status === 'bron'" class="card__panel-status info">
                        Забронировано
                    </div>
                    <div v-else-if="LotData.status === 'not_available'" class="card__panel-status danger">
                        Не в продаже
                    </div>
                </div>
                <button :key="`${LotData.id}close-desktop-chart-btn`" @click="showChartBelow=!showChartBelow"
                    class="card__panel-btn">
                    <img :src="chart" alt="Chart" />
                </button>
                <span class="card__price card__price--desktop" :class="{
                    'card__price--crossed':
                        LotData.is_actual === false && LotData.bron === false,
                }">{{ formattedPrice }} ₽</span>
            </div>

            <DataItem title="Цена метра" :value="sqMeterPrice" suffix=" ₽" :class="{ 'card__sq-meter-price': true }" />
            <DataItem title="Изм. со ст" :value="LotData.start_change" suffix="%" />

            <DataItem title="за 30 дней" :value="LotData.month_change" suffix="%" />

            <DataItem title="за 7 дней" :value="LotData.week_change" suffix="%" />

            <DataItem title="за день" :value="LotData.start_change" suffix="%" />

            <DataItem title="на сайте" :value="LotData.days_on_site" suffix=" д" />

            <DataItem title="ключи до" :value="keysValue(LotData.keys_now, LotData.keys)" />

            <DataItem title="корпус" :value="LotData.building" />
            <DataItem title="Этаж" :value="LotData.floor" />
            <DataItem title="Площадь" :value="LotData.area" />
            <DataItem title="Комнат" :value="getRooms" />

            <button @click="confirmRedirect(LotData.flat_url)" target="_blank"
                class="card__panel-article card__panel-article--desktop">
                <img :src="chain" alt="Link" />
                {{ LotData.article != null ? LotData.article : LotData.number }}
            </button>
        </div>
        <div>
            <portal-target :name="LotData.id + 'chart-popup--desktop'" />
        </div>
    </div>
</template>

<script>
import rocket from "/svgs/rocket.svg";
import chart from "/svgs/chart.svg";
import chain from "/svgs/chain.svg";
import DataItem from "./DataItem.vue";
import PriceChart from "./PriceChart.vue";
import Popup from "../Popup.vue";
import ChartDataProvider from "../providers/ChartDataProvider.vue";
import Spinner from "./Spinner.vue";
import ResponsivePortal from "@/components/utils/ResponsivePortal.vue";

export default {
    name: "PriceCard",
    components: {
        DataItem,
        PriceChart,
        Popup,
        ChartDataProvider,
        Spinner,
        ResponsivePortal,
    },
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
            isWide: window.innerWidth >= 768,
            showChartBelow: false,
        };
    },
    computed: {
        formattedPrice() {
            return new Intl.NumberFormat("ru-RU").format(this.LotData.price);
        },
        getRooms() {
            return isNaN(parseInt(this.LotData.rooms))
                ? "Студия"
                : `${this.LotData.rooms}к`;
        },
        sqMeterPrice() {
            return Math.floor(this.LotData.price / this.LotData.area);
        },
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.checkWidth);
    },
    mounted() {
        window.addEventListener("resize", this.checkWidth);
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
        checkWidth() {
            this.isWide = window.innerWidth >= 768;
        },
    },
};
</script>

<style scoped src="../../assets/styles/price-card.css"></style>
