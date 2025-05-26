<template>
    <div class="filters__container">
        <BuildingFilter
            :complexId="complexId"
            :lotOptions="lotOptions"
            @update:lotOptions="$emit('update:lotOptions', $event)"
            :getBuildings="getBuildings"
        />

        <div class="filters__btn-group scrollbar-hidden">
            <p>Комнатность</p>
            <div class="filters__btn-wrapper">
                <button
                    @click="setRoom('')"
                    class="button is-light is-small"
                    :class="{ 'active-filter': lotOptions.rooms.length === 0 }"
                >
                    Любая
                </button>
                <button
                    class="button is-light is-small"
                    v-for="room in getRooms"
                    :key="room + complexId"
                    @click="setRoom(room)"
                    :class="{
                        'active-filter': lotOptions.rooms.includes(room),
                    }"
                >
                    {{ room === 'studio' ? 'Студия' : room }}
                </button>
            </div>
        </div>

        <div class="filters__btn-group scrollbar-hidden">
            <p>Статус</p>
            <div class="filters__btn-wrapper">
                <button
                    @click="setStatus('')"
                    class="button is-light is-small"
                    :class="{ 'active-filter': lotOptions.status.length === 0 }"
                >
                    Все
                </button>
                <button
                    @click="setStatus('active')"
                    class="button is-light is-small"
                    :class="{
                        'active-filter': lotOptions.status.includes('active'),
                    }"
                >
                    В продаже
                </button>
                <button
                    @click="setStatus('bron')"
                    class="button is-light is-small"
                    :class="{
                        'active-filter': lotOptions.status.includes('bron'),
                    }"
                >
                    Забронировано
                </button>
                <button
                    @click="setStatus('start')"
                    class="button is-light is-small"
                    :class="{
                        'active-filter': lotOptions.status.includes('start'),
                    }"
                >
                    Старт продаж
                </button>
                <button
                    @click="setStatus('not_available')"
                    class="button is-light is-small"
                    :class="{
                        'active-filter':
                            lotOptions.status.includes('not_available'),
                    }"
                >
                    Не в продаже
                </button>
            </div>
        </div>

        <button
            @click="handleSearchClick"
            class="button is-light is-medium filters__close-btn"
        >
            Закрыть
        </button>
    </div>
</template>

<style scoped>
.filters__container {
    display: grid;
    gap: 1rem;
    margin-inline: 20px;
    margin-top: -20px;
    overflow: hidden;
}

.filters__btn-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.filters__btn-group {
    max-width: 100%;
    overflow-x: auto;
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

.filter-is-start {
    display: flex !important;
    align-items: center;
    gap: 0.25rem;
}

@media screen and (min-width: 768px) {
    .filters__close-btn {
        display: none !important;
    }

    .filters__container {
        border-radius: 0.5rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        background-color: white;
        padding: 1rem;
        margin-inline: 10px;
        margin-top: 0.75rem;
    }
}
</style>

<script>
import rocket from '/svgs/rocket.svg';
import BuildingFilter from './BuildingFilter.vue';

export default {
    data() {
        return {
            rocket,
        };
    },
    components: {
        BuildingFilter,
    },
    props: {
        complexId: String,
        lotOptions: Object,
        getBuildings: Array,
        getRooms: Array,
        selectSortingOption: Function,
        closePopup: Function,
    },
    methods: {
        setRoom(room) {
            if (room === '') {
                this.$emit('update:lotOptions', {
                    ...this.lotOptions,
                    rooms: [],
                });
                return;
            }
            const rooms = this.lotOptions.rooms.includes(room)
                ? this.lotOptions.rooms.filter((r) => r !== room)
                : [...this.lotOptions.rooms, room];

            this.$emit('update:lotOptions', {
                ...this.lotOptions,
                rooms,
            });
        },
        setStatus(status) {
            if (status === '') {
                this.$emit('update:lotOptions', {
                    ...this.lotOptions,
                    status: [],
                });
                return;
            }
            const newStatus = this.lotOptions.status.includes(status)
                ? this.lotOptions.status.filter((s) => s !== status)
                : [...this.lotOptions.status, status];

            this.$emit('update:lotOptions', {
                ...this.lotOptions,
                status: newStatus,
            });
        },

        handleSearchClick() {
            this.closePopup();
        },
    },
};
</script>
