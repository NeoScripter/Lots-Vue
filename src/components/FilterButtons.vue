<template>
    <div class="filter-actions">
        <button class="button is-light is-small">
            Фильтры
            <img :src="filterIcon" alt="Filter" />
        </button>
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
        <button class="button is-light is-small button--icon">
            <img :src="searchIcon" alt="Search" />
        </button>
    </div>
</template>

<script>
export default {
    name: 'FilterButtons',
    props: {
        filterIcon: {
            type: String,
            required: true,
        },
        searchIcon: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.filter-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.button--icon img {
    width: 1rem;
}
</style>
