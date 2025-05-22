<template>
    <div class="lot-explorer__cards">
        <p v-if="error" class="lot-explorer__error-message">
            Произошла ошибка, попробуйте позднее или обратитесь в поддержку
            <a href="https://t.me/pulsprodajru_supportbot">
                https://t.me/pulsprodajru_supportbot
            </a>
        </p>
        <p
            v-else-if="items.length === 0 && !isLoading"
            class="lot-explorer__empty"
        >
            По вашему запросу ничего не найдено
        </p>
        <div v-for="(item, index) in items" :key="item.id">
            <PriceCard
                :LotData="item"
                :complexId="complexId"
                :class="{ 'card__container--odd': index % 2 === 0 }"
            />
        </div>
        <CardSkeleton v-if="isLoading" />
    </div>
</template>

<script>
import PriceCard from '@/components/card/PriceCard.vue';
import CardSkeleton from '@/components/card/CardSkeleton.vue';
export default {
    name: 'LotCardList',
    components: { PriceCard, CardSkeleton },
    props: {
        items: { type: Array, default: () => [] },
        isLoading: { type: Boolean, default: false },
        error: { type: Boolean, default: false },
        complexId: { type: [String, Number], required: true },
    },
};
</script>
<style scoped>
.lot-explorer__error-message {
    font-size: 0.75rem;
}

.lot-explorer__cards {
    padding: 0.75rem;
}
@media screen and (min-width: 1024px) {
    .lot-explorer__cards {
        padding-top: 0;
    }
    .lot-explorer__empty {
        margin-top: 1rem;
        margin-inline: 0.25rem;
    }
}
</style>
