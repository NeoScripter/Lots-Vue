<template>
    <div class="filters__btn-group scrollbar-hidden">
        <p :class="{ 'in-header': inHeader }" v-text="inHeader ? 'Корпуса за 30 дней' : 'Выбор корпуса'"></p>
        <div :class="{ 'in-header': inHeader }" class="filters__btn-wrapper">
            <button
                v-if="!inHeader"
                @click="setBuilding('')"
                class="button is-light is-small"
                :class="{ 'active-filter': lotOptions.building.length === 0 }"
            >
                Все
            </button>
            <button
                class="button is-light is-small"
                v-for="building in getBuildings"
                :key="building.num + complexId"
                @click="setBuilding(building.num)"
                :class="{
                    'active-filter': lotOptions.building.includes(building.num),
                    'filter-is-start': building.is_new,
                }"
            >
                {{ building.num }}
                <img v-if="building.is_new" :src="rocket" alt="Rocket" />
            </button>
        </div>
    </div>
</template>

<script>
import rocket from '/svgs/rocket.svg';

export default {
    name: 'BuildingFilter',
    props: {
        complexId: {
            type: String,
            required: true,
        },
        lotOptions: {
            type: Object,
            required: true,
        },
        getBuildings: {
            type: Array,
            required: true,
        },
        inHeader: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            rocket,
        };
    },
    methods: {
        setBuilding(building) {
            if (building === '') {
                this.$emit('update:lotOptions', {
                    ...this.lotOptions,
                    building: [],
                });
                return;
            }
            const newBuilding = this.lotOptions.building.includes(building)
                ? this.lotOptions.building.filter((b) => b !== building)
                : [...this.lotOptions.building, building];

            this.$emit('update:lotOptions', {
                ...this.lotOptions,
                building: newBuilding,
            });
        },
    },
};
</script>

<style scoped>
.filters__btn-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.filters__btn-group {
    max-width: 100%;
    overflow-x: auto;
}

.filters__btn-group > p:not(.in-header) {
    color: #1a1345;
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 0.2rem;
}

p.in-header {
    font-size: 0.85rem;
    margin-bottom: 0.3rem;
}
.filters__btn-wrapper.in-header {
    margin-bottom: 1rem;
}
.active-filter {
    background-color: rgba(24, 156, 204, 0.25);
}

.filter-is-start {
    display: flex !important;
    align-items: center;
    gap: 0.25rem;
}
</style>
