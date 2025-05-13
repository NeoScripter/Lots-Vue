<template>
    <header class="lot-explorer__header">
        <div class="lot-explorer__headline">
            <img :src="logo" alt="Пульс продаж новостроек" class="lot-explorer__logo" />
            <a class="lot-explorer__link">
                <img :src="telegram" alt="Телеграм" class="lot-explorer--link-svg" />
                Поддержка
            </a>
        </div>
        <h1 class="is-size-3 has-text-weight-bold mb-1">{{ complexName }}</h1>
    </header>
</template>

<script>
import telegram from "@/assets/images/telegram.svg";
import logo from "@/assets/images/logo.webp";

export default {
    name: "LotHeader",
    data() {
        return {
            logo,
            telegram,
        };
    },
    props: {
        complexName: String
    }
};
</script>

<style scoped>
.lot-explorer__header {
    position: sticky;
    top: 0;
    padding: 0.75rem;
    background-color: white;
    z-index: 20;
}

.lot-explorer__headline {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.lot-explorer__logo {
    width: 6.375rem;
}

.lot-explorer__link {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    color: #4398b7;
    font-size: 0.875rem;
    text-decoration: underline;
    text-underline-offset: 3px;
}
</style>
