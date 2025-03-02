<script>
import filterIcon from '/svgs/filter-icon.svg';
import search from '/svgs/search.svg';

export default {
    name: 'FilterBtns',
    data() {
        return {
            filterIcon,
            search,
        };
    },
    props: {
        fetchData: Function
    }
};
</script>

<template>
    <div class="filter-actions">
        <button class="button is-light is-small">Фильтры</button>

        <button class="button is-light is-small">
            Цена
            <img :src="filterIcon" alt="Filter" />
        </button>

        <button class="button is-light is-small">
            Стоимость
            <img :src="filterIcon" alt="Filter" />
        </button>

        <button class="button is-light is-small">
            Изменение
            <img :src="filterIcon" alt="Filter" />
        </button>

        <button @click="fetchData" class="button button--icon is-light is-small">
            <img :src="search" alt="Filter" />
        </button>
    </div>
</template>

<style scoped>
.filter-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.button {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-weight: 700;
    font-size: 0.65rem;
}

.button--icon {
    padding-inline: 10px;
}

.button--icon img {
    margin-block: 1.5px;
    width: 1rem;
}
</style>
