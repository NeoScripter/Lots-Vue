<script>
import { calculateActuality } from '@/utils/getTimeLabel';
import { URLS } from '../../const/api-url.js';

export default {
    props: {
        complexId: String,
    },
    data() {
        return {
            complexData: {},
            complexDataIsLoading: false,
            url: URLS.COMPLEX,
        };
    },
    methods: {
        async fetchData() {
            if (this.complexDataIsLoading) return;

            try {
                this.complexDataIsLoading = true;
                const response = await fetch(`${this.url}${this.complexId}`);
                const data = await response.json();

                this.complexData = data;
            } catch (error) {
                console.error('API Error:', error);
            } finally {
                this.complexDataIsLoading = false;
            }
        },
    },
    computed: {
        getActuality() {
            return calculateActuality(
                this.complexData.days_actual,
                this.complexData.hours_actual,
                this.complexData.minutes_actual
            );
        },
        getBuildings() {
            return (this.complexData?.buildings || []).map(
                (building) => building.num
            );
        },
        getRooms() {
            return this.complexData.rooms;
        },
    },
    async created() {
        await this.fetchData();
    },
};
</script>

<template>
    <div>
        <slot
            :complexData="complexData"
            :complexDataIsLoading="complexDataIsLoading"
            :actuality="getActuality"
            :getBuildings="getBuildings"
            :getRooms="getRooms"
        ></slot>
    </div>
</template>
