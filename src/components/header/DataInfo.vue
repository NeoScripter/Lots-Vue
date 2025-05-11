<script>
import clock from "/svgs/clock.svg";

export default {
    name: "DataInfo",
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
        isLoading: {
            type: Boolean,
        },
    },
    data() {
        return {
            clock,
        };
    },
};
</script>

<template>
    <div class="data-container">
        <div v-if="isLoading" class="skeleton is-size-6 mb-1"></div>
        <div v-else class="data-row data-row--highlighted">
            <span>Актуальность данных</span>
            <img :src="clock" alt="clock" />
            <span>{{ actality }}</span>
        </div>
        <div v-if="isLoading" class="skeleton is-size-6 mb-1"></div>
        <div v-else class="data-row">
            <span>Вам доступна история цен с</span>
            <span>{{ priceFrom }}</span>
        </div>
        <div v-if="isLoading" class="skeleton is-size-6 mb-1"></div>
        <div v-else class="data-row">
            <span>Лотов на сайте:</span>
            <span>{{ totalLots }},</span>
            <span>доступны к покупке:</span>
            <span>{{ availableLots || 0 }}</span>
        </div>
    </div>
</template>

<style scoped>
.data-container {
    margin-bottom: 0.75rem;
}

.data-row {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 14px;
}

@media screen and (min-width: 768px) {
    .data-container {
        display: flex;
        flex-wrap: wrap;
        column-gap: 0.75rem;
        row-gap: 0.25rem;
    }

    .data-row:not(:first-of-type)::before {
        content: "";
        aspect-ratio: 1/1;
        background-color: black;
        border-radius: 50%;
        width: 0.25rem;
        margin-right: 0.75rem;
    }
}

.data-row--highlighted img {
    width: 1rem;
    margin-top: 0.1rem;
}
</style>
