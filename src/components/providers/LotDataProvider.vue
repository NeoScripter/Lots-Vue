<script>
import { URLS } from '../../const/api-url.js';

export default {
    props: {
        complexId: String,
        options: {
            type: Object,
        },
    },
    data() {
        return {
            items: [],
            totalPages: 1,
            totalItems: 0,
            page: 1,
            lotDataIsLoading: false,
            isError: false,
            url: URLS.LOT,
        };
    },
    methods: {
        async fetchData() {
            if (this.lotDataIsLoading) return;

            try {
                this.lotDataIsLoading = true;
                this.isError = false;

                const requestOptions = { ...this.options, page: this.page }; 

                const response = await fetch(`${this.url}${this.complexId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestOptions),
                });

                const data = await response.json();

                this.items = [...this.items, ...data.items];

                this.page++;
                this.totalPages = data.pages;
                this.totalItems = data.total;
            } catch (error) {
                console.error('API Error:', error);
                this.isError = true;
            } finally {
                this.lotDataIsLoading = false;
            }
        },

        async handleScroll() {
            const nearBottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 1200;

            if (nearBottom && !this.isLoading && this.page < this.totalPages) {
                await this.fetchData();
            }
        },
        resetItems() {
            this.items.length = 0;
        },
    },
    async created() {
        await this.fetchData();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
};
</script>

<template>
    <div>
        <slot
            :items="items"
            :lotDataIsLoading="lotDataIsLoading"
            :lotLoadingError="isError"
            :totalItems="totalItems"
            :fetchData="fetchData"
            :resetItems="resetItems"
        ></slot>
    </div>
</template>
