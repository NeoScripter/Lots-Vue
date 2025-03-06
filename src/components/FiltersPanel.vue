
<script>
export default {
    props: {
        complexId: String,
        lotOptions: Object, 
        getBuildings: Array,
        getRooms: Array,
        selectSortingOption: Function,
        closePopup: Function
    },
    methods: {
        setBuilding(building) {
            this.$emit("update:lotOptions", { ...this.lotOptions, building });
        },
        setRoom(room) {
            this.$emit("update:lotOptions", { ...this.lotOptions, rooms: room });
        },
        setStatus(status) {
            this.$emit("update:lotOptions", { ...this.lotOptions, status: status });
        },
        handleSearchClick() {
            this.closePopup();
        },
    }
};
</script>

<template>
    <div class="filters-container">

        <div class="filters__btn-group">
            <p>Выбор корпуса</p>
            <div class="filters__btn-wrapper">
                <button
                    @click="setBuilding('')"
                    class="button is-light is-small"
                    :class="{ 'active-filter': lotOptions.building === '' }"
                >
                    Все
                </button>
                <button
                    class="button is-light is-small"
                    v-for="building in getBuildings"
                    :key="building + complexId"
                    @click="setBuilding(building)"
                    :class="{ 'active-filter': building === lotOptions.building }"
                >
                    {{ building }}
                </button>
            </div>
        </div>

        <div class="filters__btn-group">
            <p>Комнатность</p>
            <div class="filters__btn-wrapper">
                <button
                    @click="setRoom('')"
                    class="button is-light is-small"
                    :class="{ 'active-filter': lotOptions.rooms === '' }"
                >
                    Любая
                </button>
                <button
                    class="button is-light is-small"
                    v-for="room in getRooms"
                    :key="room + complexId"
                    @click="setRoom(room)"
                    :class="{ 'active-filter': room === lotOptions.rooms }"
                >
                    {{ room === 'studio' ? 'Студия' : room }}
                </button>
            </div>
        </div>

        <div class="filters__btn-group">
            <p>Статус</p>
            <div class="filters__btn-wrapper">
                <button
                    @click="setStatus('active')"
                    class="button is-light is-small"
                    :class="{ 'active-filter': lotOptions.status === 'active' }"
                >
                    Все
                </button>
                <button
                    @click="setStatus('bron')"
                    class="button is-light is-small"
                    :class="{ 'active-filter': lotOptions.status === 'bron' }"
                >
                    Забронировано
                </button>
                <button
                    @click="setStatus('start')"
                    class="button is-light is-small"
                    :class="{ 'active-filter': lotOptions.status === 'start' }"
                >
                    Старт продаж
                </button>
                <button
                    @click="setStatus('not_available')"
                    class="button is-light is-small"
                    :class="{ 'active-filter': lotOptions.status === 'not_available' }"
                >
                    Не в продаже
                </button>
                
            </div>
        </div>

        <button @click="handleSearchClick" class="button is-light is-medium">
            Закрыть
        </button>
    </div>
</template>


<style scoped>

.filters-container {
    display: grid;
    gap: 1rem;
    margin-inline: 20px;
    margin-top: -20px;
}

.filters__btn-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.filters__btn-group > p {
    color: #1a1345;
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 0.2rem;
}

.active-filter {
    background-color: rgb(24, 156, 204, 0.25);
}
</style>
