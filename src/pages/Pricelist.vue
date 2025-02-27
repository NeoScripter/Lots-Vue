<template>
    <div class="price-list-container">
        <header class="header block">
            <img :src="logo" alt="" />
        </header>

        <div>
            <h1 class="title block">2-й Иртышкий</h1>

            <div class="field is-grouped">
                <div class="tag">Москва</div>
                <div class="tag">Москва</div>
                <div class="tag">Москва</div>
            </div>

            <div class="block">
                <div class="data-row data-row--highlighted">
                    <span>Актуальность данных</span>
                    <img :src="clock" alt="clock" class="" />
                    <span>27 мин</span>
                </div>
                <div class="data-row">
                    <span>Вам доступна история цен с</span>
                    <span>2024-04-11</span>
                </div>
                <div class="data-row">
                    <span>Лотов на сайте</span>
                    <span>462</span>
                    <span>, доступны к покупке</span>
                    <span>437</span>
                </div>
            </div>

            <div class="flexbox">
                <button class="button is-light is-small">
                    Фильтры
                    <img :src="filterIcon" alt="" />
                </button>
                <button class="button is-light is-small">
                    Цена
                    <img :src="filterIcon" alt="" />
                </button>
                <button class="button is-light is-small">
                    Стоимость
                    <img :src="filterIcon" alt="" />
                </button>
                <button class="button is-light is-small">
                    Изменение
                    <img :src="filterIcon" alt="" />
                </button>
                <button class="button is-light is-small search-icon">
                    <img :src="search" alt="search" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import logo from '../../public/images/logo.webp';
import clock from '../../public/svgs/clock.svg';
import filterIcon from '../../public/svgs/filter-icon.svg';
import search from '../../public/svgs/search.svg';

export default {
    data() {
        return {
            logo,
            clock,
            filterIcon,
            search,
        };
    },
    name: 'price-list-container',
};
</script>

<style scoped>
.price-list-container {
    padding: 0.65rem;
}

.header {
    display: flex;
}

.block {
    margin-bottom: 0.75rem !important;
}

.header img {
    width: 6.375rem;
}

.title {
    font-weight: 700;
    font-size: 1.875rem;
}

.tag {
    background-color: #e7e7e7;

    &:hover {
        background-color: #a9a6a6;
    }
}

.data-row {
    display: flex;
    align-items: center;
    gap: 0.35rem;
}

.data-row--highlighted img {
    width: 1rem;
    margin-top: 0.1rem;
}

.button {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-weight: 700;
    font-size: 0.65rem;
}

.flexbox {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.search-icon img {
    margin-block: 0.1rem;
}
</style>
