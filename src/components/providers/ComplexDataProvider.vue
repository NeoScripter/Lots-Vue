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
            isError: false,
            url: URLS.COMPLEX,
            lotsAvailable: 0,
            lotsOnSite: 0,
        };
    },
    methods: {
        async fetchData() {
            if (this.complexDataIsLoading) return;

            try {
                this.complexDataIsLoading = true;
                this.isError = false;

                const response = await fetch(`${this.url}${this.complexId}`);
                const data = await response.json();

                this.lotsAvailable = data.lots_available;
                this.lotsOnSite = data.lots_on_site;
                this.complexData = data;
            } catch (error) {
                console.error('API Error:', error);
                this.isError = true;
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
            return this.complexData?.buildings || [];
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
            :complexLoadingError="isError"
            :actuality="getActuality"
            :getBuildings="getBuildings"
            :getRooms="getRooms"
            :lotsAvailable="lotsAvailable"
            :lotsOnSite="lotsOnSite"
        ></slot>
    </div>
</template>
