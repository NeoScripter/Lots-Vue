<script>
import clock from '../../public/svgs/clock.svg';

export default {
    name: 'DataInfo',
    props: {
        actuality: {
            type: String,
        },
        priceFrom: {
            type: String,
        },
        totalLots: {
            type: Number,
        },
        availableLots: {
            type: Number,
        },
    },
    data() {
        return {
            clock
        }
    }
};
</script>

<template>
    <div class="mb-3">
        <div class="data-row data-row--highlighted">
            <span>Актуальность данных</span>
            <img :src="clock" alt="clock" />
            <span>{{ actuality }}</span>
        </div>
        <div class="data-row">
            <span>Вам доступна история цен с</span>
            <span>{{ priceFrom  }}</span>
        </div>
        <div class="data-row">
            <span>Лотов на сайте</span>
            <span>{{ totalLots }}</span>
            <span>, доступны к покупке</span>
            <span>{{ availableLots }}</span>
        </div>
    </div>
</template>

<style scoped>
.data-row {
    display: flex;
    align-items: center;
    gap: 0.35rem;
}

.data-row--highlighted img {
    width: 1rem;
    margin-top: 0.1rem;
}
</style>
